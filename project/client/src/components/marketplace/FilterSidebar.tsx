import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { TemplateFilters } from '@/hooks/useFilteredTemplates';

interface FilterSidebarProps {
  filters: TemplateFilters;
  frameworks: string[];
  categories: string[];
  onChange: (filters: TemplateFilters) => void;
  onReset: () => void;
}

export const FilterSidebar = ({
  filters,
  frameworks,
  categories,
  onChange,
  onReset,
}: FilterSidebarProps) => {
  const toggleFramework = (fw: string) => {
    const next = filters.frameworks.includes(fw)
      ? filters.frameworks.filter((f) => f !== fw)
      : [...filters.frameworks, fw];
    onChange({ ...filters, frameworks: next });
  };

  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Keywords
          </Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="e.g. Dashboard"
              value={filters.query}
              onChange={(e) => onChange({ ...filters, query: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Framework
          </Label>
          <div className="mt-3 space-y-2">
            {frameworks.map((fw) => (
              <label key={fw} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <Checkbox
                  checked={filters.frameworks.includes(fw)}
                  onCheckedChange={() => toggleFramework(fw)}
                />
                {fw}
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Category
          </Label>
          <Select
            value={filters.category}
            onValueChange={(v) => onChange({ ...filters, category: v })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Price
            </Label>
            <span className="text-sm text-gray-500">$0 – ${filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min={0}
            max={250}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="mt-3 w-full accent-gray-900"
          />
        </div>

        <Button
          className="w-full bg-gray-900 hover:bg-gray-800"
          onClick={() => onChange({ ...filters })}
        >
          Apply Filters
        </Button>
        <button
          type="button"
          onClick={onReset}
          className="w-full text-center text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          Reset All
        </button>
      </div>
    </aside>
  );
};
