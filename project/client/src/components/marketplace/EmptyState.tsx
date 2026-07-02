import { PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title = 'No templates found',
  description = 'Try adjusting your filters or check back later.',
  actionLabel,
  onAction,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-20 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
      <PackageOpen className="h-7 w-7 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
    {actionLabel && onAction && (
      <Button className="mt-6 bg-gray-900 hover:bg-gray-800" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);
