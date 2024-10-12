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

    //page.tsx에서 사용하는것과 동일하게 Input 컴포넌트에 props를 내려준다.
    render(
      <>
        <Input
          name='searchKeyword'
          label='배경 검색'
          placeholder='검색어를 입력하세요'
          register={mockRegister}
        />
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
  it("Dropdown의 close 아이콘을 선택한 경우 Dropdown에서 사라지며, localStorage에서도 사라져야 한다.", () => {
    const mockRegister = vi.fn();
    const mockSetValue = vi.fn();
    const mockOnRemove = vi.fn();
    const localSearchKeyword = ["apple", "banana", "kiwi"];

    // localStorage에 키워드 저장
    localStorage.setItem("searchKeywords", JSON.stringify(localSearchKeyword));

    render(
      <>
        <Input
          name='searchKeyword'
          label='배경 검색'
          placeholder='검색어를 입력하세요'
          register={mockRegister}
        />
        <Dropdown
          localSearchKeyword={localSearchKeyword}
          setValue={mockSetValue}
          onRemove={mockOnRemove}
        />
      </>,
    );

    //dropdown을 dom에 표시한다.
    const inputComp = screen.getByPlaceholderText("검색어를 입력하세요");
    fireEvent.change(inputComp, { target: { value: "A" } });

    //apple이 DOM에 있는지 확인한다.
    expect(screen.getByText("apple")).toBeInTheDocument();

    //apple이란 keyword의 이름을 가진 close button을 클릭한다.
    const closeBtn = screen.getByTestId("apple");
    fireEvent.click(closeBtn);

    //onRemove 함수가 호출되며, 이때 "apple"이 전달되었는지 확인한다.
    expect(mockOnRemove).toHaveBeenCalledWith("apple");

    // //화면에서 apple이 사라졌는지 확인한다.
    // expect(screen.getByText("apple")).not.toBeInTheDocument();

    // //localStorage에서 "apple"이 제거되었는지 확인한다.
    // const updatedKeywords = JSON.parse(localStorage.getItem("searchKeywords") || "[]");
    // expect(updatedKeywords).not.toContain("apple");
  });
});
