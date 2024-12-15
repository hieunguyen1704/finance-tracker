import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Budget } from "@/types";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";

interface UpcomingBudgetsProps {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: number) => void;
}

export function UpcomingBudgets({
  budgets,
  onEdit,
  onDelete,
}: UpcomingBudgetsProps) {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Upcoming Budgets</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell>{budget.category.name}</TableCell>
                <TableCell>{formatCurrency(budget.amount)}</TableCell>
                <TableCell>
                  {dayjs(budget.startDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(budget.endDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(budget)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(budget.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
