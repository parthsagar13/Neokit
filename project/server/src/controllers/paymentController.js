import { Template } from '../models/Template.js';
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import {
  createRazorpayOrder,
  generateReceipt,
  verifyPaymentSignature,
  verifyWebhookSignature,
  getRazorpayKeyId,
} from '../services/razorpayService.js';
import {
  completePurchase,
  completeFreeClaim,
  hasPurchaseAccess,
  generateInvoiceNumber,
} from '../services/purchaseService.js';
import {
  NEOKIT_PRODUCT_KEY,
  NEOKIT_PRODUCT_TITLE,
  completeNeoKitFreeClaim,
  completeNeoKitPurchase,
  getNeoKitCurrency,
  getNeoKitPrice,
  hasNeoKitAccess,
  neoKitZipExists,
} from '../services/neokitProduct.js';

export const createOrder = async (req, res, next) => {
  try {
    const { templateId } = req.body;
    if (!templateId) {
      return res.status(400).json({ message: 'Template ID is required' });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    return createOrderForTemplate(req, res, template);
  } catch (err) {
    next(err);
  }
};

/** NeoKit Buy Now — fixed product from server/product/neokit.zip (no template slug) */
export const createNeoKitOrder = async (req, res, next) => {
  try {
    if (!neoKitZipExists()) {
      return res.status(503).json({
        message:
          'NeoKit ZIP is missing. Place neokit.zip in project/server/product/ on the server.',
      });
    }

    const alreadyOwned = await hasNeoKitAccess(req.user._id);
    if (alreadyOwned) {
      return res.status(409).json({
        message: 'You have already purchased NeoKit',
        alreadyOwned: true,
        productKey: NEOKIT_PRODUCT_KEY,
      });
    }

    const price = getNeoKitPrice();
    const currency = getNeoKitCurrency();

    if (price === 0) {
      const order = await completeNeoKitFreeClaim({ user: req.user });
      return res.json({
        free: true,
        order: {
          id: order._id,
          invoiceNumber: order.invoiceNumber,
          status: order.status,
        },
        productKey: NEOKIT_PRODUCT_KEY,
        message: 'NeoKit unlocked successfully',
      });
    }

    const existingPending = await Order.findOne({
      user: req.user._id,
      productKey: NEOKIT_PRODUCT_KEY,
      status: 'pending',
    });

    if (existingPending?.razorpayOrderId) {
      return res.json({
        keyId: getRazorpayKeyId(),
        orderId: existingPending.razorpayOrderId,
        amount: existingPending.amount,
        currency: existingPending.currency,
        dbOrderId: existingPending._id,
        productKey: NEOKIT_PRODUCT_KEY,
        title: NEOKIT_PRODUCT_TITLE,
      });
    }

    const receipt = generateReceipt(NEOKIT_PRODUCT_KEY);
    const razorpayOrder = await createRazorpayOrder({
      amount: price,
      currency,
      receipt,
      notes: {
        productKey: NEOKIT_PRODUCT_KEY,
        userId: String(req.user._id),
      },
    });

    const order = await Order.create({
      user: req.user._id,
      productKey: NEOKIT_PRODUCT_KEY,
      amount: price,
      currency: razorpayOrder.currency,
      status: 'pending',
      razorpayOrderId: razorpayOrder.id,
      invoiceNumber: generateInvoiceNumber(),
    });

    await Payment.create({
      user: req.user._id,
      order: order._id,
      productKey: NEOKIT_PRODUCT_KEY,
      gateway: 'razorpay',
      gatewayOrderId: razorpayOrder.id,
      amount: price,
      status: 'pending',
    });

    return res.json({
      keyId: getRazorpayKeyId(),
      orderId: razorpayOrder.id,
      amount: price,
      currency: razorpayOrder.currency,
      dbOrderId: order._id,
      productKey: NEOKIT_PRODUCT_KEY,
      title: NEOKIT_PRODUCT_TITLE,
    });
  } catch (err) {
    next(err);
  }
};

const createOrderForTemplate = async (req, res, template) => {
  const alreadyOwned = await hasPurchaseAccess(req.user._id, template._id);
  if (alreadyOwned) {
    return res.status(409).json({
      message: 'You have already purchased this template',
      alreadyOwned: true,
      template: {
        id: template._id,
        title: template.title,
        slug: template.slug,
      },
    });
  }

  if (template.isFree || template.price === 0) {
    const order = await completeFreeClaim({ user: req.user, template });
    return res.json({
      free: true,
      order: {
        id: order._id,
        invoiceNumber: order.invoiceNumber,
        status: order.status,
      },
      template: {
        id: template._id,
        title: template.title,
        slug: template.slug,
      },
      message: 'Free template claimed successfully',
    });
  }

  const existingPending = await Order.findOne({
    user: req.user._id,
    template: template._id,
    status: 'pending',
  });

  if (existingPending?.razorpayOrderId) {
    return res.json({
      keyId: getRazorpayKeyId(),
      orderId: existingPending.razorpayOrderId,
      amount: existingPending.amount,
      currency: existingPending.currency,
      dbOrderId: existingPending._id,
      template: {
        id: template._id,
        title: template.title,
        slug: template.slug,
      },
    });
  }

  const receipt = generateReceipt(template._id);
  const razorpayOrder = await createRazorpayOrder({
    amount: template.price,
    currency: template.currency || 'INR',
    receipt,
    notes: {
      templateId: String(template._id),
      userId: String(req.user._id),
    },
  });

  const order = await Order.create({
    user: req.user._id,
    template: template._id,
    amount: template.price,
    currency: razorpayOrder.currency,
    status: 'pending',
    razorpayOrderId: razorpayOrder.id,
    invoiceNumber: generateInvoiceNumber(),
  });

  await Payment.create({
    user: req.user._id,
    order: order._id,
    template: template._id,
    gateway: 'razorpay',
    gatewayOrderId: razorpayOrder.id,
    amount: template.price,
    status: 'pending',
  });

  return res.json({
    keyId: getRazorpayKeyId(),
    orderId: razorpayOrder.id,
    amount: template.price,
    currency: razorpayOrder.currency,
    dbOrderId: order._id,
    template: {
      id: template._id,
      title: template.title,
      slug: template.slug,
    },
  });
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, dbOrderId } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification data is required' });
    }

    const valid = verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature });
    if (!valid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const order = await Order.findOne({
      _id: dbOrderId,
      user: req.user._id,
      razorpayOrderId,
    }).populate('template');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.productKey === NEOKIT_PRODUCT_KEY) {
      if (order.status === 'paid') {
        return res.json({
          success: true,
          message: 'Payment already verified',
          order: {
            id: order._id,
            invoiceNumber: order.invoiceNumber,
            status: order.status,
          },
          productKey: NEOKIT_PRODUCT_KEY,
        });
      }

      const { order: updatedOrder } = await completeNeoKitPurchase({
        user: req.user,
        order,
        razorpayPaymentId,
        razorpaySignature,
        paymentMethod: 'razorpay',
        gatewayResponse: req.body,
      });

      return res.json({
        success: true,
        message: 'Payment verified successfully',
        order: {
          id: updatedOrder._id,
          invoiceNumber: updatedOrder.invoiceNumber,
          status: updatedOrder.status,
        },
        productKey: NEOKIT_PRODUCT_KEY,
      });
    }

    if (order.status === 'paid') {
      return res.json({
        success: true,
        message: 'Payment already verified',
        order: {
          id: order._id,
          invoiceNumber: order.invoiceNumber,
          status: order.status,
        },
        template: {
          slug: order.template?.slug,
        },
      });
    }

    if (!order.template) {
      return res.status(400).json({ message: 'Order is missing template' });
    }

    const { order: updatedOrder } = await completePurchase({
      user: req.user,
      template: order.template,
      order,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod: 'razorpay',
      gatewayResponse: req.body,
    });

    res.json({
      success: true,
      message: 'Payment verified successfully',
      order: {
        id: updatedOrder._id,
        invoiceNumber: updatedOrder.invoiceNumber,
        status: updatedOrder.status,
      },
      template: {
        slug: order.template.slug,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const handleWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.rawBody;

    if (!verifyWebhookSignature(rawBody, signature)) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const event = req.body;
    const eventType = event.event;

    if (eventType === 'payment.captured') {
      const paymentEntity = event.payload?.payment?.entity;
      if (!paymentEntity) return res.status(200).json({ received: true });

      const order = await Order.findOne({ razorpayOrderId: paymentEntity.order_id }).populate(
        'template'
      );
      if (order && order.status !== 'paid') {
        const user = { _id: order.user };
        if (order.productKey === NEOKIT_PRODUCT_KEY) {
          await completeNeoKitPurchase({
            user,
            order,
            razorpayPaymentId: paymentEntity.id,
            razorpaySignature: signature,
            paymentMethod: paymentEntity.method,
            gatewayResponse: event,
          });
        } else if (order.template) {
          await completePurchase({
            user,
            template: order.template,
            order,
            razorpayPaymentId: paymentEntity.id,
            razorpaySignature: signature,
            paymentMethod: paymentEntity.method,
            gatewayResponse: event,
          });
        }
      }
    }

    if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      if (paymentEntity) {
        const order = await Order.findOne({ razorpayOrderId: paymentEntity.order_id });
        if (order) {
          order.status = 'failed';
          await order.save();
          await Payment.findOneAndUpdate(
            { order: order._id },
            { status: 'failed', response: event }
          );
        }
      }
    }

    if (eventType === 'refund.processed') {
      const refundEntity = event.payload?.refund?.entity;
      const paymentEntity = event.payload?.payment?.entity;
      const paymentId = refundEntity?.payment_id || paymentEntity?.id;

      if (paymentId) {
        const order = await Order.findOne({ razorpayPaymentId: paymentId });
        if (order) {
          order.status = 'refunded';
          await order.save();
          await Payment.findOneAndUpdate(
            { gatewayPaymentId: paymentId },
            { status: 'refunded', response: event }
          );
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    next(err);
  }
};
