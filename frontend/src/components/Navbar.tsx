import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
      >
        Dashboard
      </Link>
      <Link
        to="/transactions"
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        Transactions
      </Link>
      <Link
        to="/budgets"
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        Budget Planning
      </Link>
    </>
  );

  const AuthButtons = () => (
    <>
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserCircle className="h-6 w-6" />
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center px-2 text-primary font-semibold text-lg"
            >
              Finance Tracker
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLinks />
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Finance Tracker</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <NavLinks />
                  <div className="pt-4 border-t">
                    <AuthButtons />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};