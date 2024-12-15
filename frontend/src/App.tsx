import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthRoute } from "@/components/AuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import EmailConfirmation from "@/pages/EmailConfirmation";
import { TransactionList } from "@/components/TransactionList";
import { BudgetPlanner } from "@/components/BudgetPlanner";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirm-email" element={<EmailConfirmation />} />
            <Route
              path="/"
              element={
                <AuthRoute>
                  <Index />
                </AuthRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <AuthRoute>
                  <TransactionList />
                </AuthRoute>
              }
            />
            <Route
              path="/budgets"
              element={
                <AuthRoute>
                  <BudgetPlanner />
                </AuthRoute>
              }
            />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;