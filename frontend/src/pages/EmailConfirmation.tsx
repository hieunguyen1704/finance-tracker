/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { confirmEmail } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  const token = searchParams.get("token");

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["emailConfirmation", token],
    queryFn: () => confirmEmail(token || ""),
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Your email has been verified successfully!",
      });
      setIsVerifying(false);
      register(data);
      navigate("/");
    }
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to verify email",
        variant: "destructive",
      });
      setIsVerifying(false);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!token) {
      toast({
        title: "Error",
        description: "Invalid verification link",
        variant: "destructive",
      });
      setIsVerifying(false);
    }
  }, [token, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {isLoading || isVerifying ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Email Verification Complete</h2>
            <p className="text-gray-600">You can now log in to your account.</p>
            <Button className="w-full" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
