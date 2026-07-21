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

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
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

export const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUserAuth();
  const { handleGoogleSuccess } = useGoogleAuth();
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const loginHref =
    redirectTo === '/dashboard' ? '/login' : `/login?redirect=${encodeURIComponent(redirectTo)}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await authApi.register(data.name, data.email, data.password);
      if (!response.user) throw new Error('Registration failed');
      login(response.token, response.user);
      toast.success('Account created!');
      router.push(redirectTo);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Join NeoKit and start building premium dashboards">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-text">
            Full Name
          </Label>
          <Input id="name" placeholder="Alex Morgan" className={fieldClass} {...register('name')} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

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
          <Label htmlFor="password" className="text-text">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            className={fieldClass}
            {...register('password')}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-text">
            Confirm Password
          </Label>
          <Input
            id="confirm"
            type="password"
            placeholder="••••••••"
            className={fieldClass}
            {...register('confirm')}
          />
          {errors.confirm && <p className="text-sm text-red-500">{errors.confirm.message}</p>}
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-primary text-white shadow-[0_10px_24px_-10px_rgba(20,184,166,0.7)] hover:bg-primary-hover"
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
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
        Already have an account?{' '}
        <Link href={loginHref} className="font-semibold text-primary transition hover:text-primary-hover">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
};
