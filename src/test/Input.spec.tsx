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
import { searchProps } from "@/app/page";
import { vi } from "vitest";

describe("Input 컴포넌트 테스트", () => {
  beforeEach(() => {
    const onSubmit = vi.fn(); // onSubmit을 각 테스트 전에 초기화합니다.

    // renderHook을 사용하여 useForm 훅을 렌더링합니다.
    const { result } = renderHook(() => useForm<searchProps>({}));

    const {
      register,
      handleSubmit,
      formState: { errors },
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
          icon={true}
        />
      </form>,
    );
  });

  it("Enter 키로 폼 제출 시 올바른 데이터가 수집된다", async () => {
    const onSubmit = vi.fn((data) => {
      const currentKeywords = localStorage.getItem("searchKeywords");
      const savedKeywords = currentKeywords ? JSON.parse(currentKeywords) : [];
      const updatedKeywords = [...savedKeywords, data.searchKeyword];
      localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));
    });

    // spyOn으로 onSubmit을 감시합니다.
    const spyOnSubmit = vi.spyOn({ submit: onSubmit }, "submit");

    const input = screen.getByPlaceholderText("아이디를 입력해주세요");

    fireEvent.change(input, { target: { value: "testid1!" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13 });

    await waitFor(() => {
      expect(spyOnSubmit).toHaveBeenCalledWith({ searchKeyword: "testid1!" });
    });
  });

  // it("입력이 비어있을 때 에러 메시지가 표시된다", async () => {});

  // it("입력값에 대한 유효성 검사가 작동한다", async () => {});

  // it("resetField 호출 시 입력값이 초기화된다", async () => {});

  // it("input 필드가 초기값으로 렌더링된다", async () => {});
});
