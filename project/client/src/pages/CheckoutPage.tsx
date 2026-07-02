import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Lock, CreditCard, ArrowLeft } from 'lucide-react';
import { MarketplaceFooter } from '@/components/marketplace/MarketplaceFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { templateApi } from '@/services/api';
import { formatPrice } from '@/lib/format';
import type { Template } from '@/types';

export const CheckoutPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (!slug) return;
    templateApi.getBySlug(slug).then(setTemplate).catch(() => setTemplate(null));
  }, [slug]);

  const handleComplete = () => {
    navigate(`/success${slug ? `?slug=${slug}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-lg font-bold">Code Market AI</span>
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link to="/templates" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Return to Marketplace
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {['Card', 'Pay', 'GitHub'].map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      className={`rounded-xl border-2 p-4 text-center text-sm font-medium ${
                        i === 0 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      {m === 'Card' && <CreditCard className="mx-auto mb-2 h-5 w-5" />}
                      {m}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM / YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Alex Sterling" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="alex@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit lg:sticky lg:top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {template && (
                <div className="flex gap-4 border-b border-gray-100 pb-4">
                  <img
                    src={template.thumbnailUrl}
                    alt={template.title}
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{template.title}</p>
                    <p className="text-sm text-gray-500">{template.framework} Template</p>
                    <p className="mt-1 text-sm text-amber-500">★ 4.9 (120 reviews)</p>
                  </div>
                </div>
              )}
              <div className="space-y-2 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{template ? formatPrice(template.price, template.isFree) : '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (VAT 0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span>{template ? formatPrice(template.price, template.isFree) : '—'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="FORGE20" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
              <Button
                className="mt-4 h-12 w-full bg-gray-900 hover:bg-gray-800"
                onClick={handleComplete}
              >
                <Lock className="mr-2 h-4 w-4" />
                Complete Purchase
              </Button>
              <p className="mt-3 text-center text-xs text-gray-400">
                By completing your purchase, you agree to our Terms of Service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <MarketplaceFooter />
    </div>
  );
};
