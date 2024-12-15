import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionForm } from "./TransactionForm";
import { useToast } from "@/components/ui/use-toast";
import { TransactionGroup } from "./TransactionGroup";
import { DeleteConfirmDialog } from "./common/DeleteConfirmDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/api/transactions";
import { fetchCategories } from "@/lib/api/categories";
import { Transaction, TransactionFormData } from "@/types";
import dayjs from "dayjs";
import { useAuth } from "@/hooks/useAuth";

export const TransactionList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState<
    number | null
  >(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format("YYYY-MM")
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const monthOptions = Array.from({ length: 3 }, (_, i) => {
    const date = dayjs().subtract(i, "month");
    return {
      value: date.format("YYYY-MM"),
      label: date.format("MMMM YYYY"),
    };
  });

  // Fetch transactions
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useQuery({
      queryKey: ["transactions", selectedMonth],
      queryFn: () =>
        fetchTransactions(
          {
            startTrackedTime: dayjs(selectedMonth)
              .startOf("month")
              .toISOString(),
            endTrackedTime: dayjs(selectedMonth).endOf("month").toISOString(),
          },
          user?.accessToken
        ),
      enabled: !!user?.accessToken,
    });

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(user?.accessToken),
    enabled: !!user?.accessToken,
  });

  const addMutation = useMutation({
    mutationFn: (data: TransactionFormData) =>
      createTransaction(
        {
          categoryId: data.categoryId,
          amount: data.amount,
          description: data.description,
          trackedTime: dayjs(data.trackedTime).toISOString(),
        },
        user?.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Transaction added successfully",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TransactionFormData }) =>
      updateTransaction(
        id,
        {
          categoryId: data.categoryId,
          amount: data.amount,
          description: data.description,
          trackedTime: dayjs(data.trackedTime).toISOString(),
        },
        user?.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setIsEditDialogOpen(false);
      setSelectedTransaction(null);
      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTransaction(id, user?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });
    },
  });

  const handleAdd = (data: TransactionFormData) => {
    addMutation.mutate(data);
  };

  const handleEdit = (data: TransactionFormData) => {
    if (!selectedTransaction) return;
    updateMutation.mutate({
      id: selectedTransaction.id,
      data,
    });
  };

  const handleDelete = (id: number) => {
    setDeletingTransactionId(id);
  };

  const confirmDelete = () => {
    if (deletingTransactionId) {
      deleteMutation.mutate(deletingTransactionId);
      setDeletingTransactionId(null);
    }
  };

  const openEditDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  if (isLoadingTransactions || isLoadingCategories) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups: Record<string, Transaction[]>, transaction) => {
      const date = dayjs(transaction.trackedTime)
        .startOf("day")
        .format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Transactions</h2>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              categories={categories}
              onSubmit={handleAdd}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <TransactionForm
              categories={categories}
              defaultValues={{
                categoryId: selectedTransaction.categoryId,
                description: selectedTransaction.description || "",
                amount: selectedTransaction.amount.toString(),
                trackedTime: new Date(selectedTransaction.trackedTime),
              }}
              onSubmit={handleEdit}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <TransactionGroup
          key={date}
          date={date}
          transactions={transactions}
          onEdit={openEditDialog}
          onDelete={handleDelete}
        />
      ))}

      <DeleteConfirmDialog
        isOpen={!!deletingTransactionId}
        onOpenChange={(open) => !open && setDeletingTransactionId(null)}
        onConfirm={confirmDelete}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </div>
  );
};
