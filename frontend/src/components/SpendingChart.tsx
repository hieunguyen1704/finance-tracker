import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchSpendingTrends } from "@/lib/api/transactions";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface SpendingChartProps {
  selectedRange: string;
}

export const SpendingChart = ({ selectedRange }: SpendingChartProps) => {
  const { user } = useAuth();
  
  // Calculate start and end dates based on selected range
  const getDateRange = () => {
    const endDate = dayjs().endOf("month");
    let startDate;

    switch (selectedRange) {
      case "ytd":
        startDate = dayjs().startOf("year");
        break;
      case "1y":
        startDate = dayjs().subtract(1, "year").startOf("month");
        break;
      case "6m":
      default:
        startDate = dayjs().subtract(6, "month").startOf("month");
        break;
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  };

  const { startDate, endDate } = getDateRange();

  const { data: spendingTrends, isLoading } = useQuery({
    queryKey: ["spendingTrends", startDate, endDate],
    queryFn: () => fetchSpendingTrends(startDate, endDate, user?.accessToken),
    enabled: !!(startDate && endDate && user?.accessToken),
    retry: false,
  });

  if (isLoading || !spendingTrends) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const formattedData = spendingTrends.map((item) => ({
    name: dayjs(item.month).format("MMM"),
    amount: item.totalSpending,
  }));

  const formatYAxis = (value: number) => {
    return `${Math.round(value / 1000)}K`;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxis} width={60} />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#1E40AF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
