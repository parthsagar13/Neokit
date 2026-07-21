'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { paymentApi } from '@/services/api';
import { useUserAuth } from '@/context/UserAuthContext';
import { loadRazorpayScript } from '@/lib/razorpay';
import { BRAND_NAME } from '@/lib/brand';

type ApiError = Error & {
  status?: number;
  data?: {
    alreadyOwned?: boolean;
  };
};

export function useNeoKitPurchase() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserAuth();
  const [processing, setProcessing] = useState(false);

  const goToSuccess = useCallback(() => {
    router.push('/success');
  }, [router]);

  const buy = useCallback(async () => {
    if (!isAuthenticated || !user) {
      const redirect = pathname === '/' ? '/?buy=1' : `${pathname}?buy=1`;
      router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      return;
    }

    if (processing) return;

    try {
      setProcessing(true);
      const orderData = await paymentApi.createNeoKitOrder();

      if (orderData.free) {
        toast.success('NeoKit unlocked!');
        goToSuccess();
        return;
      }

      if (!orderData.keyId || !orderData.orderId || !orderData.dbOrderId) {
        throw new Error('Failed to create payment order');
      }

      await loadRazorpayScript();

      const options = {
        key: orderData.keyId,
        amount: Math.round((orderData.amount || 0) * 100),
        currency: orderData.currency || 'INR',
        name: BRAND_NAME,
        description: orderData.title || 'NeoKit Starter Kit',
        order_id: orderData.orderId,
        prefill: { name: user.name, email: user.email },
        theme: { color: '#14B8A6' },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI',
                instruments: [{ method: 'upi' }],
              },
            },
            sequence: ['block.upi'],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await paymentApi.verify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              dbOrderId: orderData.dbOrderId!,
            });
            toast.success('Payment successful!');
            goToSuccess();
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Payment verification failed');
            router.push('/payment-failed');
          } finally {
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        toast.error('Payment failed');
        setProcessing(false);
        router.push('/payment-failed');
      });
      rzp.open();
    } catch (err) {
      const apiErr = err as ApiError;
      if (apiErr.status === 409 || apiErr.data?.alreadyOwned) {
        toast.success('You already own NeoKit');
        goToSuccess();
        setProcessing(false);
        return;
      }
      toast.error(apiErr.message || 'Unable to start payment');
      setProcessing(false);
    }
  }, [goToSuccess, isAuthenticated, pathname, processing, router, user]);

  return { buy, processing };
}
