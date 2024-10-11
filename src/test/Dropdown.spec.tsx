import "@testing-library/jest-dom";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Dropdown 컴포넌트 테스트", () => {
  it("사용자가 input을 한 글자이상 작성하면 Dropdown이 표시되어야 한다.", () => {
    const mockRegister = vi.fn();
    const mockSetValue = vi.fn();
    const mockOnRemove = vi.fn();
    const localSearchKeyword = ["apple", "banana", "kiwi"];

    render(
      <>
        <Input name='search' register={mockRegister} />
        <Dropdown
          localSearchKeyword={localSearchKeyword}
          setValue={mockSetValue}
          onRemove={mockOnRemove}
        />
      </>,
    );

    const inputComp = screen.getByPlaceholderText("검색어를 입력하세요");

    //사용자가 A라는 한 글자 입력함
    fireEvent.change(inputComp, { target: { value: "A" } });

    localSearchKeyword.forEach((keyword) => {
      expect(screen.getByText(keyword)).toBeInTheDocument();
    });
  });
  // it("Dropdown의 close 아이콘을 선택한 경우 Dropdown에서 사라지며, localStorage에서도 사라져야 한다.", () => {});
});
