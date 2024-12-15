import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";

interface CategorySelectProps {
  value?: number;
  onValueChange: (value: number) => void;
  categories: Category[];
}

export function CategorySelect({ value, onValueChange, categories = [] }: CategorySelectProps) {
  const selectedCategory = categories.find(category => category.id === value);

  return (
    <Select value={value?.toString()} onValueChange={(val) => onValueChange(Number(val))}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select category">
          {selectedCategory && (
            <span className={cn(
              selectedCategory.type === "income" ? "text-green-600" : "text-orange-600"
            )}>
              {selectedCategory.name}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem 
            key={category.id} 
            value={category.id.toString()}
            className={cn(
              category.type === "income" ? "text-green-600" : "text-orange-600"
            )}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}