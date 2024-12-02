import Signin from "@/app/signin/page";
import SigninForm from "@/components/SigninForm";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import renderWithProvider from "./renderWithProvider";
import { SubmitHandler } from "react-hook-form";

//next/navigation mock 처리함
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

describe("Signin", () => {
  //router 함수가 제대로 호출되는 가? 로 검사함.
  it("로그인이 완료되면 '/' 페이지로 이동한다.", async () => {
    // push 함수 mock 설정
    const { push } = require("next/navigation").useRouter();

    // Signin 컴포넌트에서 정의한 onSubmit을 mock으로 처리
    const onSubmit: SubmitHandler<{ id: string; password: string }> = jest.fn((data) => {
      push("/");
    });

    render(<SigninForm onSubmit={onSubmit} />);

    const id = screen.getByPlaceholderText("아이디를 입력해주세요");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const submitButton = screen.getByTestId("signin");

    fireEvent.change(id, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "test123!" } });

    // 폼 제출
    fireEvent.click(submitButton);

    // '/'로 이동했는지 확인
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
    });
  });
  //실제 url 변경으로 검사함
  it("로그인이 완료되면 '/' 페이지로 이동한다.", async () => {
    renderWithProvider(<Signin />);

    const id = screen.getByPlaceholderText("아이디를 입력해주세요");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const submitButton = screen.getByTestId("signin");

    fireEvent.change(id, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "test123!" } });

    // 폼 제출
    fireEvent.click(submitButton);

    // URL이 변경되었는지 확인
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("로그인이 완료되면 Toast가 나타난다.", async () => {
    renderWithProvider(<Signin />);

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
