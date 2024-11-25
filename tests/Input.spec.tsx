import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import SigninForm from "@/components/SigninForm";
import "@testing-library/jest-dom";

describe("SigninForm 테스트", () => {
  it("폼 제출 시 올바른 데이터를 수집한다", async () => {
    const onSubmit = jest.fn();
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

  it("입력이 비어있을 때 submit을 시도하면 에러 메시지가 표시된다", async () => {
    const onSubmit = jest.fn();
    const { container } = render(<SigninForm onSubmit={onSubmit} />);

    const submitButton = screen.getByTestId("signin");

    // 제출 시도
    //reset button을 클릭한다.
    await act(async () => {
      fireEvent.click(submitButton);
    });

    screen.debug();
    // 에러 메시지가 나타날 때까지 대기
    const errorMessages = container.querySelectorAll(".text-red-500");

    await waitFor(() => {
      expect(errorMessages[0].textContent).toBe("아이디는 필수 입니다.");
      expect(errorMessages[1].textContent).toBe("비밀번호는 필수 입니다.");
    });
  });

  it("유효성 검사가 통과되지 않을 경우 에러 메세지가 표시된다", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SigninForm onSubmit={onSubmit} />,
    );

    const id = getByPlaceholderText("아이디를 입력해주세요");
    const password = getByPlaceholderText("비밀번호를 입력해주세요");
    const submitBtn = getByTestId("signin");

    // 올바르지 않은 입력값
    // This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
    fireEvent.change(id, { target: { value: "id" } }); //유효성 검사에 통과되지 않을 잘못된 값을 입력한다.
    fireEvent.click(submitBtn);
    // 에러 메시지 확인
    await waitFor(() => {
      expect(
        screen.getByText(/아이디는 올바른 이메일 형식으로 입력해야 합니다./),
      ).toBeInTheDocument();
    });

    fireEvent.change(password, { target: { value: "password" } }); //유효성 검사에 통과되지 않을 잘못된 값을 입력한다.
    fireEvent.click(submitBtn);
    // 에러 메시지 확인
    await waitFor(() => {
      expect(
        screen.getByText(/비밀번호는 8~20자의 특수문자와 영문자를 포함해야 합니다./),
      ).toBeInTheDocument();
    });
  });

  it("resetField 호출 시 입력값이 초기화된다", async () => {
    const onSubmit = jest.fn();
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
