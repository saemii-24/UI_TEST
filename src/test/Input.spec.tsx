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

    //screen.debug(); //DOM 상태 확인

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
    //screen.debug();
  });

  it("입력이 비어있을 때 에러 메시지가 표시된다", async () => {
    const onSubmit = vi.fn();
    render(<SigninForm onSubmit={onSubmit} />);

    const submitButton = screen.getByTestId("signin");

    // 제출 시도
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // 에러 메시지 확인
    await waitFor(() => {
      expect(screen.getByText("아이디는 필수 입니다.")).toBeInTheDocument();
      expect(screen.getByText("비밀번호는 필수 입니다.")).toBeInTheDocument();
    });
  });

  it("유효성 검사가 통과되지 않을 경우 에러 메세지가 표시된다", async () => {
    const onSubmit = vi.fn();
    render(<SigninForm onSubmit={onSubmit} />);

    const id = screen.getByPlaceholderText("아이디를 입력해주세요");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const submitButton = screen.getByTestId("signin");

    // 올바르지 않은 입력값
    await act(async () => {
      fireEvent.change(id, { target: { value: "id" } });
      fireEvent.change(password, { target: { value: "password" } });
    });

    // 제출 시도
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // 에러 메시지 확인
    await waitFor(() => {
      expect(
        screen.getByText("아이디는 올바른 이메일 형식으로 입력해야 합니다."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("비밀번호는 8~20자의 특수문자와 영문자를 포함해야 합니다."),
      ).toBeInTheDocument();
    });
  });

  it("resetField 호출 시 입력값이 초기화된다", async () => {
    const onSubmit = vi.fn();
    render(<SigninForm onSubmit={onSubmit} />);

    const id = screen.getByPlaceholderText("아이디를 입력해주세요") as HTMLInputElement;
    const idResetButton = screen.getByTestId("reset-id");

    // id input에 글자를 입력한다.
    await act(async () => {
      fireEvent.change(id, { target: { value: "id@test.com" } });
    });
    //reset button을 클릭한다.
    await act(async () => {
      fireEvent.click(idResetButton);
    });
    //값이 사라졌는지 확인한다.
    await act(async () => {
      expect(id.value).toBe("");
    });
  });
});
