import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { fetchBudgets } from "@/lib/api/budget";
import { Budget } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";

export const BudgetOverview = () => {
  const { user } = useAuth();

  const { data: budgets = [], isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => fetchBudgets(user?.accessToken),
    enabled: !!user?.accessToken,
  });

  if (isLoading) {
    return <div className="space-y-4">Loading...</div>;
  }

  // Filter current budgets based on date
  const now = dayjs();
  const currentBudgets = budgets.filter((budget) => {
    const startDate = dayjs(budget.startDate);
    const endDate = dayjs(budget.endDate);
    return startDate.isSameOrBefore(now) && endDate.isSameOrAfter(now);
  });

  return (
    <div className="space-y-4">
      {currentBudgets.map((budget) => (
        <div key={budget.id} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              {budget.category.name} (
              <span className="text-muted-foreground ">
                {dayjs(budget.startDate).format("DD/MM/YYYY")} -{" "}
                {dayjs(budget.endDate).format("DD/MM/YYYY")}
              </span>
              )
            </span>
            <span>
              {formatCurrency(budget.totalUsage)} /{" "}
              {formatCurrency(budget.amount)}
            </span>
          </div>
          <Progress
            value={(budget.totalUsage / budget.amount) * 100}
            className="h-2"
          />
        </div>
      ))}
    </div>
  );
};
