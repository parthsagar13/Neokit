'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

type FormData = z.infer<typeof schema>;

const fieldClass =
  'h-11 rounded-xl border-border bg-background focus-visible:ring-primary';

export const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error('Invalid reset link');
      return;
    }
    try {
      setLoading(true);
      await authApi.resetPassword(token, data.password);
      toast.success('Password reset successful');
      router.push('/login');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Reset password" subtitle="Choose a new password for your NeoKit account">
      {!token ? (
        <p className="text-center text-sm text-red-500">
          Invalid or missing reset token.{' '}
          <Link href="/forgot-password" className="font-semibold text-primary hover:text-primary-hover">
            Request a new link
          </Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-text">
              New Password
            </Label>
            <Input id="password" type="password" className={fieldClass} {...register('password')} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-text">
              Confirm Password
            </Label>
            <Input id="confirm" type="password" className={fieldClass} {...register('confirm')} />
            {errors.confirm && <p className="text-sm text-red-500">{errors.confirm.message}</p>}
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-primary text-white shadow-[0_10px_24px_-10px_rgba(20,184,166,0.7)] hover:bg-primary-hover"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Reset Password'}
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
