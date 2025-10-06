import { type PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";
import { TooltipProvider } from "./components/ui/tooltip";
import { CartProvider } from "./cart/store/cartContext";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />

          {/* Custom Provider */}
          <CheckAuthProvider>
            <RouterProvider router={appRouter} />
          </CheckAuthProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
