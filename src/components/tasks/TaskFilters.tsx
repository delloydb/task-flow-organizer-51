import { TaskFilters, TaskPriority, TaskStatus, TaskSortOption } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  FilterIcon, 
  SearchIcon, 
  SortAscIcon, 
  SortDescIcon,
  XIcon
} from 'lucide-react';
import { useState } from 'react';

interface TaskFiltersProps {
  filters: TaskFilters;
  sortOption: TaskSortOption;
  onFiltersChange: (filters: TaskFilters) => void;
  onSortChange: (sort: TaskSortOption) => void;
  onClearFilters: () => void;
}

export function TaskFiltersComponent({ 
  filters, 
  sortOption, 
  onFiltersChange, 
  onSortChange, 
  onClearFilters 
}: TaskFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        <Select
          value={`${sortOption.field}-${sortOption.order}`}
          onValueChange={(value) => {
            const [field, order] = value.split('-') as [TaskSortOption['field'], TaskSortOption['order']];
            onSortChange({ field, order });
          }}
        >
          <SelectTrigger className="w-48">
            <div className="flex items-center">
              {sortOption.order === 'asc' ? (
                <SortAscIcon className="h-4 w-4 mr-2" />
              ) : (
                <SortDescIcon className="h-4 w-4 mr-2" />
              )}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline-asc">Deadline (Earliest)</SelectItem>
            <SelectItem value="deadline-desc">Deadline (Latest)</SelectItem>
            <SelectItem value="createdAt-desc">Created (Newest)</SelectItem>
            <SelectItem value="createdAt-asc">Created (Oldest)</SelectItem>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            <SelectItem value="priority-desc">Priority (High-Low)</SelectItem>
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="border rounded-lg p-4 bg-accent/30 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select
                value={filters.priority || 'all'}
                onValueChange={(value) => 
                  onFiltersChange({ 
                    ...filters, 
                    priority: value === 'all' ? undefined : value as TaskPriority 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => 
                  onFiltersChange({ 
                    ...filters, 
                    status: value === 'all' ? undefined : value as TaskStatus 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}