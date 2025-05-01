import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: "work" | "personal" | "shopping" | "other" | "friends";
  priority: "low" | "medium" | "high";
  dueDate?: Date | null;
  dueTime?: string;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Complete project proposal",
      completed: false,
      category: "work",
      priority: "high",
      dueDate: new Date(2023, 11, 25),
      dueTime: "14:00",
    },
    {
      id: "2",
      text: "Buy groceries",
      completed: false,
      category: "shopping",
      priority: "medium",
      dueDate: new Date(2023, 11, 24),
      dueTime: "10:00",
    },
    {
      id: "3",
      text: "Go for a run",
      completed: false,
      category: "personal",
      priority: "low",
      dueDate: new Date(2023, 11, 23),
      dueTime: "07:30",
    },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState<
    "work" | "personal" | "shopping" | "other"
  >("other");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">(
    "medium",
  );
  const [newDueDate, setNewDueDate] = useState<Date | null>(null);
  const [newDueTime, setNewDueTime] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate,
      dueTime: newDueTime,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setNewCategory("other");
    setNewPriority("medium");
    setNewDueDate(null);
    setNewDueTime("");
  };

  const handleCompleteTask = (id: string, completed: boolean) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

      <div className="space-y-4 mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            className="flex-1"
          />
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select
            value={newCategory}
            onValueChange={(value) => setNewCategory(value as any)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={newPriority}
            onValueChange={(value) => setNewPriority(value as any)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !newDueDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newDueDate ? format(newDueDate, "PPP") : <span>Due date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={newDueDate || undefined}
                onSelect={setNewDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Input
            type="time"
            value={newDueTime}
            onChange={(e) => setNewDueTime(e.target.value)}
            className="w-[140px]"
            placeholder="Due time"
          />
        </div>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks yet. Add one above!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              category={task.category}
              priority={task.priority}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
