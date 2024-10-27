import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
  act,
  getByText,
} from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import { searchProps } from "@/app/page";
import { vi } from "vitest";

describe("Input 컴포넌트 테스트", () => {
  const onSubmit = vi.fn();
  beforeEach(() => {
    // renderHook을 사용하여 useForm 훅을 렌더링합니다.
    const { result } = renderHook(() => useForm<searchProps>({}));

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = result.current;

    render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='searchKeyword'
          label='아이디'
          placeholder='아이디를 입력해주세요'
          register={register("searchKeyword", {
            required: "아이디는 필수 입니다.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,20}$/,
              message: "아이디는 8~20자의 특수문자와 영문자를 포함해야 합니다.",
            },
          })}
          error={errors.searchKeyword?.message}
          reset={reset}
          icon={true}
        />
      </form>,
    );
  });

  it("Enter 키로 폼 제출 시 올바른 데이터가 수집된다", async () => {
    const input = screen.getByPlaceholderText("아이디를 입력해주세요");

    // 값 변경 후 form 제출 트리거
    fireEvent.change(input, { target: { value: "testid1!" } });
    fireEvent.submit(input.closest("form")!); //input과 가장 가까운 form 태그를 찾아 submit

    // await waitFor(() => {
    //   expect(onSubmit).toHaveBeenCalledWith(
    //     expect.objectContaining({ searchKeyword: "testid1!" }), // 첫 번째 인자로 폼 데이터 객체 확인
    //     expect.any(Object), // 두 번째 인자는 어떤 값이든 가능
    //   );
    // });
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  // it("입력이 비어있을 때 에러 메시지가 표시된다", async () => {
  //   const input = screen.getByPlaceholderText("아이디를 입력해주세요");

  //   fireEvent.change(input, { target: { value: "" } });
  //   fireEvent.submit(input.closest("form")!); // form 태그가 null이 아님을 명시한다.

  //   // 에러 메시지가 나타나는지 확인합니다.
  //   await waitFor(() => {
  //     expect(screen.getByText("아이디는 필수 입니다.")).toBeInTheDocument();
  //   });
  // });

  it("입력값에 대한 유효성 검사가 작동한다", async () => {
    const input = screen.getByPlaceholderText(
      "아이디를 입력해주세요",
    ) as HTMLInputElement;
  });

  it("resetField 호출 시 입력값이 초기화된다", async () => {
    const input = screen.getByPlaceholderText(
      "아이디를 입력해주세요",
    ) as HTMLInputElement;
    const resetBtn = screen.getByTestId("reset-button");

    // 값 변경
    fireEvent.change(input, { target: { value: "testid1!" } });

    //reset btn클릭
    await act(async () => {
      fireEvent.click(resetBtn);
    });
    // reset 버튼 클릭 후, input의 value가 빈 문자열인지 확인
    await waitFor(() => {
      expect(input.value).toEqual("");
    });
  });
});
