import { describe, expect, it } from "vitest";
import { mockImageData } from "./mockdata";

describe("ImageCard 테스트", () => {
  it("fetch된 데이터를 가지고 ImageCard가 적절히 렌더링 된다.", async () => {
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    const expected = mockImageData;
    expect(data).toEqual(expected);
  });
});
