//https://mswjs.io/docs/basics/mocking-responses/
import { mockImageData } from "@/test/mockdata";
import { http, HttpResponse } from "msw";

// 성공
const successHandler = http.get("https://example.com/user", () => {
  return HttpResponse.json(mockImageData);
});

// 에러
//https://github.com/mswjs/msw/discussions/2059
// const errorHandler = http.get("https://pixabay.com/api", ({ request }) => {
//   const url = new URL(request.url);
//   const apiKey = url.searchParams.get("key");
//   const query = url.searchParams.get("q");

//   // key나 query가 특정 값일 경우 에러를 반환
//   if (apiKey === "undefined" && query === "test-error") {
//     throw new Error("API 요청 중 오류가 발생했습니다!");
//   }

//   return HttpResponse.json({}); // 기본 응답, 필요에 따라 수정
// });
const errorHandler = http.get("https://pixabay.com/api", ({ request }) => {
  const url = new URL(request.url);
  const apiKey = url.searchParams.get("key");
  const query = url.searchParams.get("q");

  // key나 query가 특정 값일 경우 에러를 반환
  if (apiKey === "undefined" && query === "test-error") {
    return new HttpResponse(null, {
      status: 404,
      statusText: "에러",
    });
  }
});

export const handlers = [successHandler, errorHandler];
