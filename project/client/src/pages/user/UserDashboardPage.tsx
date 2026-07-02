import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Download, Package, User } from 'lucide-react';
import { MarketplaceNavbar } from '@/components/marketplace/MarketplaceNavbar';
import { MarketplaceFooter } from '@/components/marketplace/MarketplaceFooter';
import { TemplateMarketCard } from '@/components/marketplace/TemplateMarketCard';
import { TemplateGridSkeleton } from '@/components/marketplace/TemplateSkeleton';
import { useTemplates } from '@/hooks/useTemplates';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: Package },
  { label: 'Downloads', href: '/dashboard/downloads', icon: Download },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export const UserDashboardLayout = ({
  children,
  title,
  active,
}: {
  children: ReactNode;
  title: string;
  active: string;
}) => (
  <div className="min-h-screen bg-gray-50">
    <MarketplaceNavbar showSearch={false} />
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <nav className="space-y-1">
            {sidebarLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active === href ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>
          <h1 className="mb-6 text-2xl font-bold text-gray-900">{title}</h1>
          {children}
        </div>
      </div>
    </div>
    <MarketplaceFooter />
  </div>
);

export const UserDashboardPage = () => {
  const { templates, loading } = useTemplates();
  const recent = templates.slice(0, 3);

  return (
    <UserDashboardLayout title="Dashboard" active="/dashboard">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Available Templates', value: templates.length },
          { label: 'Downloads', value: templates.reduce((s, t) => s + t.downloads, 0) },
          { label: 'Saved', value: 0 },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <h2 className="mb-4 mt-10 text-lg font-semibold">Browse Templates</h2>
      {loading ? (
        <TemplateGridSkeleton count={3} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((t) => (
            <TemplateMarketCard key={t._id} template={t} />
          ))}
        </div>
      )}
    </UserDashboardLayout>
  );
};

export const DownloadsPage = () => {
  const { templates, loading } = useTemplates();
  const free = templates.filter((t) => t.isFree);

  return (
    <UserDashboardLayout title="My Downloads" active="/dashboard/downloads">
      <p className="mb-6 text-gray-500">
        Download any template directly. Purchase history is a UI placeholder.
      </p>
      {loading ? (
        <TemplateGridSkeleton />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {free.map((t) => (
            <TemplateMarketCard key={t._id} template={t} />
          ))}
        </div>
      )}
    </UserDashboardLayout>
  );
};

export const ProfilePage = () => (
  <UserDashboardLayout title="Profile" active="/dashboard/profile">
    <div className="max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-gray-500">
        User profile is a UI placeholder. Admin accounts use{' '}
        <Link to="/admin/login" className="text-blue-600 hover:underline">
          admin login
        </Link>
        .
      </p>
    </div>
  </UserDashboardLayout>
);
