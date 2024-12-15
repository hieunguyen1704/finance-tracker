import { TableCell, TableRow } from "@/components/ui/table";
import { TransactionActions } from "./TransactionActions";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types";
import dayjs from "dayjs";

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
  isMobile: boolean;
}

export const TransactionRow = ({ transaction, onEdit, onDelete, isMobile }: TransactionRowProps) => {
  const amountColor = transaction.category.type === 'income' ? 'text-green-600' : 'text-red-600';

  return (
    <TableRow className="border-b border-gray-200">
      <TableCell className={`${isMobile ? 'w-[50%]' : 'w-[30%]'} text-left border-r border-gray-200 px-4`}>
        {transaction.description || '-'}
        {isMobile && (
          <div className="text-sm text-gray-500 mt-1">
            {transaction.category.name}
          </div>
        )}
      </TableCell>
      <TableCell className={`${isMobile ? 'hidden' : 'w-[20%] text-left border-r border-gray-200 px-4'}`}>
        {transaction.category.name}
      </TableCell>
      <TableCell className={`${isMobile ? 'hidden' : 'w-[20%] text-left border-r border-gray-200 px-4'}`}>
        {dayjs(transaction.trackedTime).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell className={`${isMobile ? 'w-[35%]' : 'w-[15%]'} text-right font-medium border-r border-gray-200 px-4 ${amountColor}`}>
        {formatCurrency(Math.abs(transaction.amount))}
      </TableCell>
      <TableCell className={`${isMobile ? 'w-[15%]' : 'w-[15%]'}`}>
        <TransactionActions
          onEdit={() => onEdit(transaction)}
          onDelete={() => onDelete(transaction.id)}
        />
      </TableCell>
    </TableRow>
  );
};