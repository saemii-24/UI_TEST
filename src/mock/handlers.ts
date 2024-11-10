//https://mswjs.io/docs/basics/mocking-responses/
import { mockImageData } from "@/test/mockdata";
import { http, HttpResponse } from "msw";

// 성공
const successHandler = http.get("https://example.com/user", () => {
  return HttpResponse.json(mockImageData);
});

// 에러
const errorHandler = http.get("https://pixabay.com/api", ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  // key나 query가 특정 값일 경우 에러를 반환
  if (query === "error") {
    return new HttpResponse(null, {
      status: 404,
      statusText: "에러",
    });
  }
});
// mockData
const mockHandler = http.get("https://pixabay.com/api", ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  // key나 query가 특정 값일 경우 에러를 반환
  if (query === "mock") {
    return HttpResponse.json(mockImageData);
  }
});

// 빈 값
const emptyHandler = http.get("https://pixabay.com/api", ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  // key나 query가 특정 값일 경우 에러를 반환
  if (query === "empty") {
    return HttpResponse.json({ totalHits: 0, hits: Array(0), total: 0 });
  }
});

export const handlers = [successHandler, errorHandler, emptyHandler, mockHandler];
