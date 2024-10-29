// /test/api.test.ts
import { describe, expect, it } from "vitest";

describe("API test", () => {
  it("should fetch posts", async () => {
    // Arrange
    const response = await fetch("https://example.com/user");
    // Act
    const data = await response.json();
    // Assert
    const expected = [
      {
        userId: 1,
        id: 1,
        title: "first post title",
        body: "first post body",
      },
    ];
    //Test
    expect(data).toEqual(expected);
  });
});
