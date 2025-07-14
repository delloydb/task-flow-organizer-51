import { Task, TaskPriority, TaskStatus } from '@/types/task';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, EditIcon, TrashIcon, RepeatIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  high: 'bg-priority-high text-white',
  medium: 'bg-priority-medium text-white',
  low: 'bg-priority-low text-white'
};

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-status-todo text-foreground',
  'in-progress': 'bg-status-progress text-foreground',
  done: 'bg-status-done text-foreground'
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isOverdue = task.deadline < new Date() && task.status !== 'done';
  
  return (
    <Card className={cn(
      "group transition-all duration-200 hover:shadow-lg border-l-4",
      task.priority === 'high' && "border-l-priority-high",
      task.priority === 'medium' && "border-l-priority-medium", 
      task.priority === 'low' && "border-l-priority-low",
      isOverdue && "bg-destructive/5 border-destructive/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold leading-tight mb-1",
              task.status === 'done' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(task)}
            >
              <EditIcon className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <TrashIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
            <span className={cn(
              "text-xs",
              isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
            )}>
              {task.deadline.toLocaleDateString()}
            </span>
            {task.isRecurring && (
              <RepeatIcon className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={priorityColors[task.priority]} variant="secondary">
              {task.priority.toUpperCase()}
            </Badge>
            <Badge 
              className={cn(statusColors[task.status], "cursor-pointer")}
              onClick={() => {
                const statuses: TaskStatus[] = ['todo', 'in-progress', 'done'];
                const currentIndex = statuses.indexOf(task.status);
                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                onStatusChange(task.id, nextStatus);
              }}
            >
              {task.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs px-2 py-0 bg-accent/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}