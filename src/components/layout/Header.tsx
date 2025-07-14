import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, PlusIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNewTask: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export function Header({ onNewTask, onToggleTheme, isDarkMode }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">TASKMAN</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            onClick={onNewTask}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Task
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleTheme}
          >
            {isDarkMode ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>
          
          <Button variant="outline" size="icon">
            <UserIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}