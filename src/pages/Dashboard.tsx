import { useState, useMemo } from 'react';
import { Task, TaskFilters, TaskSortOption, TaskStatus } from '@/types/task';
import { mockTasks } from '@/lib/mock-data';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskFiltersComponent } from '@/components/tasks/TaskFilters';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanIcon, ListIcon, CalendarIcon } from 'lucide-react';

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortOption, setSortOption] = useState<TaskSortOption>({
    field: 'deadline',
    order: 'asc'
  });
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply filters
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortOption.field];
      let bValue: any = b[sortOption.field];

      if (sortOption.field === 'deadline' || sortOption.field === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortOption.field === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
      }

      if (sortOption.order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [tasks, filters, sortOption]);

  // Group tasks by status for kanban view
  const tasksByStatus = useMemo(() => {
    const groups = {
      todo: [] as Task[],
      'in-progress': [] as Task[],
      done: [] as Task[]
    };

    filteredAndSortedTasks.forEach(task => {
      groups[task.status].push(task);
    });

    return groups;
  }, [filteredAndSortedTasks]);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    
    const updatedTask: Task = {
      ...taskData,
      id: editingTask.id,
      createdAt: editingTask.createdAt,
      updatedAt: new Date(),
    };
    
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id ? updatedTask : task
    ));
    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status, updatedAt: new Date() }
        : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const openNewTaskForm = () => {
    setEditingTask(undefined);
    setIsTaskFormOpen(true);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    pending: tasks.filter(t => t.status !== 'done').length,
    overdue: tasks.filter(t => t.deadline < new Date() && t.status !== 'done').length,
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Tasks</div>
        </div>
        <div className="bg-card rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-priority-low">{stats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-card rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-priority-medium">{stats.pending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-card rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-priority-high">{stats.overdue}</div>
          <div className="text-sm text-muted-foreground">Overdue</div>
        </div>
      </div>

      {/* Filters */}
      <TaskFiltersComponent
        filters={filters}
        sortOption={sortOption}
        onFiltersChange={setFilters}
        onSortChange={setSortOption}
        onClearFilters={clearFilters}
      />

      {/* View Mode Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <ListIcon className="h-4 w-4" />
              <span>List</span>
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center space-x-2">
              <KanbanIcon className="h-4 w-4" />
              <span>Board</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
          </TabsList>

          <Button onClick={openNewTaskForm} className="bg-primary hover:bg-primary-hover">
            New Task
          </Button>
        </div>

        <TabsContent value="list" className="space-y-4">
          {filteredAndSortedTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tasks found. Create your first task to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'todo' ? 'bg-status-todo border-2 border-muted-foreground' :
                      status === 'in-progress' ? 'bg-status-progress border-2 border-muted-foreground' :
                      'bg-status-done border-2 border-muted-foreground'
                    }`} />
                    <span>{status.replace('-', ' ')}</span>
                  </h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    {statusTasks.length}
                  </span>
                </div>
                <div className="space-y-3 min-h-[400px] bg-accent/20 rounded-lg p-3">
                  {statusTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="bg-card rounded-lg border p-6 text-center">
            <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
            <p className="text-muted-foreground">
              Calendar integration will be available when connected to Supabase backend.
              This will show tasks organized by their deadlines in a monthly calendar view.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
}