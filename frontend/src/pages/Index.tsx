import { Card } from "@/components/ui/card";
import { SpendingChart } from "@/components/SpendingChart";
import { BudgetOverview } from "@/components/BudgetOverview";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactionMetrics } from "@/lib/api/transactions";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useState("6m");
  const { user } = useAuth();

  const monthOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i < 3; i++) {
      const date = dayjs().subtract(i, "month").toDate();
      options.push(date);
    }
    return options;
  }, []);

  // Calculate start and end dates based on selected month
  const startDate = dayjs(selectedMonth).startOf("month").toISOString();
  const endDate = dayjs(selectedMonth).endOf("month").toISOString();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["transactionMetrics", startDate, endDate],
    queryFn: () =>
      fetchTransactionMetrics(startDate, endDate, user.accessToken),
    retry: false,
    enabled: !!(startDate && endDate && user?.accessToken),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Financial Dashboard
          </h1>
          <Select
            value={selectedMonth.toISOString()}
            onValueChange={(value) => setSelectedMonth(new Date(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((date) => (
                <SelectItem key={date.toISOString()} value={date.toISOString()}>
                  {dayjs(date).format("MMMM YYYY")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-base md:text-lg mb-2">
              Total Balance
            </h3>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {formatCurrency(metrics?.totalBalance || 0)}
              </p>
            )}
          </Card>
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-base md:text-lg mb-2">
              Monthly Spending
            </h3>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-warning">
                {formatCurrency(metrics?.monthlySpending || 0)}
              </p>
            )}
          </Card>
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-base md:text-lg mb-2">
              Monthly Savings
            </h3>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-secondary">
                {formatCurrency(metrics?.monthlySavings || 0)}
              </p>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="font-semibold text-base md:text-lg">
                Spending Trends
              </h3>
              <Select value={selectedRange} onValueChange={setSelectedRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SpendingChart selectedRange={selectedRange} />
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-base md:text-lg mb-4">
              Budget Overview
            </h3>
            <BudgetOverview />
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-base md:text-lg mb-4">
              Spending by Category ({dayjs(selectedMonth).format("MMMM YYYY")})
            </h3>
            <CategoryPieChart startDate={startDate} endDate={endDate} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
