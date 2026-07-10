import { NeokitLogo } from '@/components/brand/NeokitLogo';
import { BRAND_NAME } from '@/lib/brand';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <NeokitLogo size="sm" useWordmarkImage />
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. Premium developer templates.
        </p>
      </div>
    </footer>
  );
};
