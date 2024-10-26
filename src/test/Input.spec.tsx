import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import { searchProps } from "@/app/page";
import { vi } from "vitest";

describe("Input 컴포넌트 폼 제출 테스트", () => {
  beforeEach(() => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<searchProps>({});

    const onSubmit = vi.fn();

    // 공통된 render 로직
    render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='searchKeyword'
          placeholder='원하는 이미지를 검색해보세요!'
          register={register({
            required: "입력값이 필요합니다.",
            minLength: {
              value: 6,
              message: "최소 6자 이상 입력해주세요.",
            },
            maxLength: {
              value: 12,
              message: "최대 12자까지 입력 가능합니다.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])/,
              message: "특수문자와 영문자를 포함한 형식이 아닙니다.",
            },
          })}
          error={errors.searchKeyword?.message} // 에러 메시지를 Input에 전달
          icon={true} // 아이콘 사용 여부
        />
      </form>,
    );
  });

  it("Enter 키로 폼 제출 시 올바른 데이터가 수집된다", async () => {});

  it("입력이 비어있을 때 에러 메시지가 표시된다", async () => {});

  it("입력값에 대한 유효성 검사가 작동한다", async () => {});

  it("resetField 호출 시 입력값이 초기화된다", async () => {});

  it("input 필드가 초기값으로 렌더링된다", async () => {});
});
