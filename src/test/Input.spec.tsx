import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import SigninForm from "@/components/SigninForm";

describe("SigninForm 테스트", () => {
  it("폼 제출 시 올바른 데이터를 수집한다", async () => {
    const onSubmit = vi.fn();

    render(<SigninForm onSubmit={onSubmit} />);

    const id = screen.getByPlaceholderText("아이디를 입력해주세요");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const submitButton = screen.getByTestId("signin");

    screen.debug(); // 여기서 현재 DOM 상태를 확인할 수 있습니다.

    // 입력값 변경
    await act(async () => {
      fireEvent.change(id, { target: { value: "id@test.com" } });
      fireEvent.change(password, { target: { value: "password1!" } });
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    //on Submit이 제대로 작동한지 확인
    await waitFor(() => {
      // 첫 번째 인자를 가져와서 확인
      const firstCallArgs = onSubmit.mock.calls[0][0];
      expect(firstCallArgs).toEqual({
        id: "id@test.com",
        password: "password1!",
      });
    });
    screen.debug();
  });

  // it("입력이 비어있을 때 에러 메시지가 표시된다", async () => {
  //   const onSubmit = vi.fn();

  //   render(<SigninForm onSubmit={onSubmit} />);

  //   const submitButton = screen.getByTestId("signin");

  //   // 제출 시도
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   // 에러 메시지 확인
  //   await waitFor(() => {
  //     expect(screen.getByText("아이디는 필수 입니다.")).toBeInTheDocument();
  //     expect(screen.getByText("비밀번호는 필수 입니다.")).toBeInTheDocument();
  //   });
  // });
});
