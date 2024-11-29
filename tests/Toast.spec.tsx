import Signin from "@/app/signin/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

// useRouter 모킹
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Signin", () => {
  it("로그인이 완료되면 '/' 페이지로 이동한다.", async () => {
    const routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue({ push: routerMock });

    render(<Signin />);

    // ID와 Password 입력
    const idInput = screen.getByPlaceholderText(/아이디를 입력해주세요/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력해주세요/i);
    const submitButton = screen.getByRole("button", { name: /로그인/i });

    fireEvent.change(idInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123!" } });

    // 폼 제출
    fireEvent.click(submitButton);

    // '/'로 이동했는지 확인
    expect(routerMock).toHaveBeenCalledWith("/");
  });
  it("로그인이 완료되면 Toast가 나타난다.", async () => {
    render(<Signin />);

    // ID와 Password 입력
    const idInput = screen.getByPlaceholderText(/아이디를 입력해주세요/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력해주세요/i);
    const submitButton = screen.getByRole("button", { name: /로그인/i });

    fireEvent.change(idInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123!" } });

    // 폼 제출
    fireEvent.click(submitButton);

    // Toast 메시지가 나타나는지 확인
    await waitFor(() => {
      const toast = screen.getByText(/로그인 성공!/i);
      expect(toast).toBeInTheDocument();
    });
  });
});
