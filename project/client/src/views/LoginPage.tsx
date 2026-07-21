'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { AuthDivider } from '@/components/auth/AuthDivider';
import { AuthShell } from '@/components/auth/AuthShell';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { authApi } from '@/services/api';
import { useUserAuth } from '@/context/UserAuthContext';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isGoogleAuthEnabled } from '@/lib/googleAuth';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const fieldClass =
  'h-11 rounded-xl border-border bg-background focus-visible:ring-primary';

export const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUserAuth();
  const { handleGoogleSuccess } = useGoogleAuth();
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const registerHref =
    redirectTo === '/dashboard' ? '/register' : `/register?redirect=${encodeURIComponent(redirectTo)}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const response = await authApi.login(data.email, data.password);
      if (!response.user) {
        toast.error('Please use admin login for admin accounts');
        return;
      }
      login(response.token, response.user);
      toast.success('Welcome back!');
      router.push(redirectTo);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to access NeoKit purchases and downloads">
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-text">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary transition hover:text-primary-hover"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className={fieldClass}
            {...register('password')}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-primary text-white shadow-[0_10px_24px_-10px_rgba(20,184,166,0.7)] hover:bg-primary-hover"
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
        </Button>
      </form>

      {isGoogleAuthEnabled && (
        <>
          <AuthDivider />
          <GoogleSignInButton
            onSuccess={handleGoogleSuccess}
            disabled={loading}
            className={cn(
              'h-11 w-full gap-3 rounded-xl border-border bg-white text-text hover:bg-primary-bg/50'
            )}
          />
        </>
      )}

      <p className="mt-6 text-center text-sm text-body">
        Don&apos;t have an account?{' '}
        <Link href={registerHref} className="font-semibold text-primary transition hover:text-primary-hover">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
};
