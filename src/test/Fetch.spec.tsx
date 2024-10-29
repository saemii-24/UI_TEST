import { describe, expect, it } from "vitest";
import { mockImageData } from "./mockdata";

describe("ImageCard 테스트", () => {
  it("fetch된 데이터를 가지고 ImageCard가 적절히 렌더링 된다.", async () => {
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    const expected = mockImageData;
    expect(data).toEqual(expected);
  });

  it("유저 정보가 있을 때 'Photo by. [user]' 텍스트를 렌더링한다.", async () => {});

  it("이미지 URL이 없을 때 컴포넌트가 렌더링되지 않는다.", () => {});

  it("이미지의 src와 alt 속성이 전달된 데이터에 맞게 설정된다.", () => {});

  it("user와 userImageURL이 없을 경우 사용자 정보가 렌더링되지 않는다.", () => {});

  it("이미지 컨테이너에 마우스를 올렸을 때 스타일이 변경된다.", () => {});

  it("접근성을 위해 alt 텍스트가 이미지 ID와 사용자 정보를 포함한다.", () => {});
});
