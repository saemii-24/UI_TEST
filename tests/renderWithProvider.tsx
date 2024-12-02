import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import Toast from "@/components/Toast";

// QueryClient 생성
const queryClient = new QueryClient();
// 유틸 함수
const renderWithProvider = (children: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
};

export default renderWithProvider;
