import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/types";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";

interface CurrentBudgetsProps {
  budgets: Budget[];
}

export function CurrentBudgets({ budgets }: CurrentBudgetsProps) {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Current Budgets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <Card key={budget.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{budget.category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(budget.amount)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress
                  value={(budget.totalUsage / budget.amount) * 100}
                  className="h-2"
                />
                <div className="text-sm text-muted-foreground">
                  Used: {formatCurrency(budget.totalUsage)} of{" "}
                  {formatCurrency(budget.amount)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {dayjs(budget.startDate).format("DD/MM/YYYY")} -{" "}
                  {dayjs(budget.endDate).format("DD/MM/YYYY")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
