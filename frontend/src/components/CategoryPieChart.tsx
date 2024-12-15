import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/lib/api/transactions";
import { Transaction } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface CategoryPieChartProps {
  startDate: string;
  endDate: string;
}

export const CategoryPieChart = ({
  startDate,
  endDate,
}: CategoryPieChartProps) => {
  const { user } = useAuth();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", startDate, endDate],
    queryFn: () =>
      fetchTransactions({
        startTrackedTime: startDate,
        endTrackedTime: endDate,
        categoryType: "expense",
      }, user?.accessToken),
    enabled: !!(startDate && endDate && user?.accessToken),
  });

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Process transactions to get total amount by category, excluding Income
  const categoryTotals = transactions
    .filter((transaction) => transaction.category.type === "expense")
    .reduce((acc: Record<string, number>, transaction: Transaction) => {
      const categoryName = transaction.category.name;
      const absAmount = Math.abs(transaction.amount);
      acc[categoryName] = (acc[categoryName] || 0) + absAmount;
      return acc;
    }, {});

  // Convert to array format for Recharts
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
