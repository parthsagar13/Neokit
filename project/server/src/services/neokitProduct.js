import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import {
  generateInvoiceNumber,
} from './purchaseService.js';
import { sendInvoiceEmail, sendPurchaseConfirmationEmail } from './emailService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Fixed product key — no Mongo template / slug required */
export const NEOKIT_PRODUCT_KEY = 'neokit';
export const NEOKIT_PRODUCT_TITLE = 'NeoKit Starter Kit';
export const NEOKIT_ZIP_FILENAME = 'neokit.zip';

/** Absolute path: server/product/neokit.zip */
export const getNeoKitZipPath = () =>
  path.resolve(__dirname, '../../product', NEOKIT_ZIP_FILENAME);

export const getNeoKitPrice = () => {
  const raw = process.env.NEOKIT_PRICE;
  const price = raw === undefined || raw === '' ? 0 : Number(raw);
  if (Number.isNaN(price) || price < 0) {
    throw new Error('NEOKIT_PRICE must be a valid number');
  }
  return price;
};

export const getNeoKitCurrency = () => process.env.NEOKIT_CURRENCY || 'INR';

export const neoKitZipExists = () => fs.existsSync(getNeoKitZipPath());

export const hasNeoKitAccess = async (userId) => {
  const order = await Order.findOne({
    user: userId,
    productKey: NEOKIT_PRODUCT_KEY,
    status: 'paid',
  });
  return !!order;
};

export const completeNeoKitPurchase = async ({
  user,
  order,
  razorpayPaymentId,
  razorpaySignature,
  paymentMethod,
  gatewayResponse,
}) => {
  order.status = 'paid';
  order.razorpayPaymentId = razorpayPaymentId;
  order.razorpaySignature = razorpaySignature;
  order.paymentMethod = paymentMethod || 'razorpay';
  if (!order.invoiceNumber) {
    order.invoiceNumber = generateInvoiceNumber();
  }
  await order.save();

  const payment = await Payment.findOneAndUpdate(
    { order: order._id },
    {
      user: user._id,
      order: order._id,
      productKey: NEOKIT_PRODUCT_KEY,
      gateway: 'razorpay',
      gatewayPaymentId: razorpayPaymentId,
      gatewayOrderId: order.razorpayOrderId,
      amount: order.amount,
      status: 'paid',
      response: gatewayResponse,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const fakeTemplate = { title: NEOKIT_PRODUCT_TITLE };
  await sendPurchaseConfirmationEmail({ user, template: fakeTemplate, order });
  await sendInvoiceEmail({ user, order, template: fakeTemplate });

  return { order, payment };
};

export const completeNeoKitFreeClaim = async ({ user }) => {
  let order = await Order.findOne({
    user: user._id,
    productKey: NEOKIT_PRODUCT_KEY,
    status: 'paid',
    amount: 0,
  });

  if (!order) {
    order = await Order.create({
      user: user._id,
      productKey: NEOKIT_PRODUCT_KEY,
      amount: 0,
      currency: getNeoKitCurrency(),
      status: 'paid',
      invoiceNumber: generateInvoiceNumber(),
      paymentMethod: 'free',
    });

    await Payment.create({
      user: user._id,
      order: order._id,
      productKey: NEOKIT_PRODUCT_KEY,
      gateway: 'free',
      amount: 0,
      status: 'paid',
      response: { type: 'neokit_free_claim' },
    });
  }

  return order;
};
