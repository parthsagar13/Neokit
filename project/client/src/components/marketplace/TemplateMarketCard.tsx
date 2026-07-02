import { Link } from 'react-router-dom';
import { Code2, Download, Heart, Star } from 'lucide-react';
import type { Template } from '@/types';
import { formatDownloads, formatPrice } from '@/lib/format';
import { useTemplateDownload } from '@/hooks/useTemplateDownload';
import { cn } from '@/lib/utils';

interface TemplateMarketCardProps {
  template: Template;
  variant?: 'grid' | 'compact';
  className?: string;
}

export const TemplateMarketCard = ({
  template,
  variant = 'grid',
  className,
}: TemplateMarketCardProps) => {
  const { download, isDownloading } = useTemplateDownload();

  if (variant === 'compact') {
    return (
      <Link
        to={`/templates/${template.slug}`}
        className={cn(
          'flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
          className
        )}
      >
        <img
          src={template.thumbnailUrl}
          alt={template.title}
          className="h-16 w-24 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-gray-900">{template.title}</p>
          <p className="text-sm text-gray-500">{template.framework}</p>
        </div>
        <span className="font-bold text-blue-600">{formatPrice(template.price, template.isFree)}</span>
      </Link>
    );
  }

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      <Link
        to={`/templates/${template.slug}`}
        className="relative block aspect-video overflow-hidden bg-gray-100"
      >
        <img
          src={template.thumbnailUrl}
          alt={template.title}
          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span
          className={cn(
            'absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold',
            template.isFree ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white'
          )}
        >
          {template.isFree ? 'FREE' : formatPrice(template.price, false)}
        </span>
        <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-700 backdrop-blur">
          {template.framework}
        </span>
      </Link>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
          {template.category}
        </p>
        <Link to={`/templates/${template.slug}`}>
          <h3 className="mt-1 line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {template.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          Professional {template.framework} template for {template.category.toLowerCase()} projects.
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Code2 className="h-3.5 w-3.5" />
            {template.framework}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            4.9
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {formatDownloads(template.downloads)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
              CM
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-400">Author</p>
              <p className="text-sm font-medium text-gray-700">CodeMarket</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => download(template._id, template.slug)}
              disabled={isDownloading(template._id)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
