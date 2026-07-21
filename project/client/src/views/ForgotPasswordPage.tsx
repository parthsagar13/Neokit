'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { AuthShell } from '@/components/auth/AuthShell';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

const fieldClass =
  'h-11 rounded-xl border-border bg-background focus-visible:ring-primary';

export const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await authApi.forgotPassword(data.email);
      setSent(true);
      toast.success('Check your email for reset instructions');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Forgot password" subtitle="We'll email you a secure reset link">
      {sent ? (
        <p className="text-center text-sm leading-relaxed text-body">
          If an account exists with that email, a reset link has been sent. Check your inbox (and
          spam) for next steps.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-text">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={fieldClass}
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-primary text-white shadow-[0_10px_24px_-10px_rgba(20,184,166,0.7)] hover:bg-primary-hover"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-body">
        <Link href="/login" className="font-semibold text-primary transition hover:text-primary-hover">
          ← Back to login
        </Link>
      </p>
    </AuthShell>
  );
};
