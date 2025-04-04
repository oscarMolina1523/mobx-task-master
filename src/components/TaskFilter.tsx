
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TaskFilter as FilterType } from "@/stores/TaskStore";

const TaskFilter: React.FC = observer(() => {
  const { taskStore } = useStore();
  const { filter, totalCount, activeCount, completedCount } = taskStore;

  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: "All", value: "all", count: totalCount },
    { label: "Active", value: "active", count: activeCount },
    { label: "Completed", value: "completed", count: completedCount }
  ];

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {filters.map(({ label, value, count }) => (
        <Button
          key={value}
          variant="outline"
          size="sm"
          onClick={() => taskStore.setFilter(value)}
          className={cn(
            "text-sm font-medium",
            filter === value
              ? "bg-purple-100 text-purple-700 border-purple-300"
              : "text-gray-600"
          )}
        >
          {label} {count > 0 && <span className="ml-1">({count})</span>}
        </Button>
      ))}
    </div>
  );
});

export default TaskFilter;
