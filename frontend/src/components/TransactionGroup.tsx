import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionRow } from "./TransactionRow";
import { Transaction } from "@/types";
import dayjs from "dayjs";
import { useIsMobile } from "@/hooks/use-mobile";

interface TransactionGroupProps {
  date: string;
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export const TransactionGroup = ({ date, transactions, onEdit, onDelete }: TransactionGroupProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        {dayjs(date).format('dddd, MMMM D, YYYY')}
      </h3>
      <div className="overflow-x-auto">
        <Table className="border border-gray-200 rounded-lg min-w-[600px]">
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className={`${isMobile ? 'w-[50%]' : 'w-[30%]'} border-r border-gray-200 px-4`}>Description</TableHead>
              <TableHead className={`${isMobile ? 'hidden' : 'w-[20%] border-r border-gray-200 px-4'}`}>Category</TableHead>
              <TableHead className={`${isMobile ? 'hidden' : 'w-[20%] border-r border-gray-200 px-4'}`}>Date</TableHead>
              <TableHead className={`${isMobile ? 'w-[35%]' : 'w-[15%]'} text-right border-r border-gray-200 px-4`}>Amount</TableHead>
              <TableHead className={`${isMobile ? 'w-[15%]' : 'w-[15%]'} px-4`}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
                isMobile={isMobile}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};