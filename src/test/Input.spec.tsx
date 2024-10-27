import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
  act,
} from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import { vi } from "vitest";

interface SigninProps {
  id: string;
}

describe("Input 컴포넌트 테스트", () => {
  const onSubmit = vi.fn();
  const reset = vi.fn();

  beforeEach(() => {
    const { result } = renderHook(() => useForm<SigninProps>({}));

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset: formReset, // useForm의 reset 함수 가져오기
    } = result.current;

    render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='id'
          label='아이디'
          placeholder='아이디를 입력해주세요'
          register={register("id", {
            required: "아이디는 필수 입니다.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,20}$/,
              message: "아이디는 8~20자의 특수문자와 영문자를 포함해야 합니다.",
            },
          })}
          error={errors.id?.message}
          reset={() => {
            formReset(); // 내부 useForm의 reset 함수 호출
            reset(); // 모의 reset 호출
          }}
          icon={true}
        />
      </form>,
    );
  });

  it("Enter 키로 폼 제출 시 올바른 데이터가 수집된다", async () => {
    const input = screen.getByPlaceholderText("아이디를 입력해주세요");

    fireEvent.change(input, { target: { value: "testid1!" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("입력이 비어있을 때 에러 메시지가 표시된다", async () => {
    const input = screen.getByPlaceholderText("아이디를 입력해주세요");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("아이디는 필수 입니다.")).toBeInTheDocument();
    });
  });

  it("입력값에 대한 유효성 검사가 작동한다", async () => {
    const input = screen.getByPlaceholderText(
      "아이디를 입력해주세요",
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(
        screen.getByText("아이디는 8~20자의 특수문자와 영문자를 포함해야 합니다."),
      ).toBeInTheDocument();
    });
  });

  it("reset 호출 시 입력값이 초기화된다", async () => {
    const input = screen.getByPlaceholderText(
      "아이디를 입력해주세요",
    ) as HTMLInputElement;
    const resetBtn = screen.getByTestId("reset-button");

    fireEvent.change(input, { target: { value: "testid1!" } });
    fireEvent.click(resetBtn);

    // reset 호출 여부 확인
    await waitFor(() => {
      expect(reset).toHaveBeenCalled();
    });

    // submit으로 제출 시 입력값이 비어있어야 함
    fireEvent.submit(input.closest("form")!);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    expect(screen.getByText("아이디는 필수 입니다.")).toBeInTheDocument(); // 입력값이 비어있어야 함
  });
});
