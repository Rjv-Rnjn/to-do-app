import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  category?: "work" | "personal" | "shopping" | "other" | "friends";
  priority?: "low" | "medium" | "high";
  dueDate?: Date | null;
  dueTime?: string;
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({
  id = "",
  text = "Sample task",
  completed = false,
  category = "other",
  priority = "medium",
  dueDate = null,
  dueTime = "",
  onComplete = () => {},
  onDelete = () => {},
}: TaskItemProps) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    high: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  const categoryColors = {
    work: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    personal: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    shopping: "bg-teal-100 text-teal-800 hover:bg-teal-200",
    other: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-md mb-2 bg-white shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox
          id={`task-${id}`}
          checked={completed}
          onCheckedChange={(checked) => onComplete(id, checked as boolean)}
        />
        <label
          htmlFor={`task-${id}`}
          className={`text-sm flex-1 ${completed ? "line-through text-gray-500" : ""}`}
        >
          {text}
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Badge className={categoryColors[category]} variant="outline">
          {category}
        </Badge>
        <Badge className={priorityColors[priority]} variant="outline">
          {priority}
        </Badge>

        {dueDate && (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-800 flex items-center gap-1"
          >
            <Calendar className="h-3 w-3" />
            {format(dueDate, "MMM d")}
          </Badge>
        )}

        {dueTime && (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-800 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            {dueTime}
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="text-gray-500 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
