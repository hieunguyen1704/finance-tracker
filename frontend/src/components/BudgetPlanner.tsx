import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} from "@/lib/api/budget";
import { fetchCategories } from "@/lib/api/categories";
import { BudgetForm } from "./BudgetForm";
import { CurrentBudgets } from "./budget/CurrentBudgets";
import { UpcomingBudgets } from "./budget/UpcomingBudgets";
import { AddBudgetDialog } from "./budget/AddBudgetDialog";
import { DeleteConfirmDialog } from "./common/DeleteConfirmDialog";
import { Budget, BudgetFormData } from "@/types";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const BudgetPlanner = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [deletingBudgetId, setDeletingBudgetId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: budgets = [], isLoading: isLoadingBudgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => fetchBudgets(user?.accessToken),
    enabled: !!user?.accessToken,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(user?.accessToken),
    enabled: !!user?.accessToken,
  });

  const addMutation = useMutation({
    mutationFn: (data: BudgetFormData) => {
      return addBudget({
        categoryId: data.categoryId,
        amount: data.amount,
        startDate: dayjs(data.startDate).toISOString(),
        endDate: dayjs(data.endDate).toISOString(),
      }, user?.accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Budget added successfully",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; formData: BudgetFormData }) => {
      return updateBudget(data.id, {
        categoryId: data.formData.categoryId,
        amount: data.formData.amount,
        startDate: dayjs(data.formData.startDate).toISOString(),
        endDate: dayjs(data.formData.endDate).toISOString(),
      }, user?.accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setEditingBudget(null);
      toast({
        title: "Success",
        description: "Budget updated successfully",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBudget(id, user?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast({
        title: "Success",
        description: "Budget deleted successfully",
      });
    },
  });

  const handleAddBudget = (data: BudgetFormData) => {
    addMutation.mutate(data);
  };

  const handleUpdateBudget = (data: BudgetFormData) => {
    if (!editingBudget) return;
    updateMutation.mutate({
      id: editingBudget.id,
      formData: data,
    });
  };

  const handleDeleteBudget = (id: number) => {
    setDeletingBudgetId(id);
  };

  const confirmDelete = () => {
    if (deletingBudgetId) {
      deleteMutation.mutate(deletingBudgetId);
      setDeletingBudgetId(null);
    }
  };

  if (isLoadingBudgets || isLoadingCategories) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Filter current and upcoming budgets based on date
  const now = dayjs();
  const currentBudgets = budgets.filter((budget) => {
    const startDate = dayjs(budget.startDate);
    const endDate = dayjs(budget.endDate);
    return startDate.isSameOrBefore(now) && endDate.isSameOrAfter(now);
  });

  const upcomingBudgets = budgets.filter((budget) => {
    const startDate = dayjs(budget.startDate);
    return startDate.isAfter(now);
  });

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Budget Planning</h2>
        <AddBudgetDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddBudget}
          categories={categories.filter(
            (category) => category.type === "expense"
          )}
        />
      </div>

      <div className="space-y-6">
        <CurrentBudgets budgets={currentBudgets} />
        <UpcomingBudgets
          budgets={upcomingBudgets}
          onEdit={setEditingBudget}
          onDelete={handleDeleteBudget}
        />
      </div>

      <Dialog
        open={!!editingBudget}
        onOpenChange={(open) => !open && setEditingBudget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
          </DialogHeader>
          {editingBudget && (
            <BudgetForm
              categories={categories.filter(
                (category) => category.type === "expense"
              )}
              defaultValues={{
                categoryId: String(editingBudget.categoryId),
                amount: String(editingBudget.amount),
                startDate: new Date(editingBudget.startDate),
                endDate: new Date(editingBudget.endDate),
                repeat: false,
              }}
              onSubmit={handleUpdateBudget}
              onCancel={() => setEditingBudget(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        isOpen={!!deletingBudgetId}
        onOpenChange={(open) => !open && setDeletingBudgetId(null)}
        onConfirm={confirmDelete}
        title="Delete Budget"
        description="Are you sure you want to delete this budget? This action cannot be undone."
      />
    </div>
  );
};
