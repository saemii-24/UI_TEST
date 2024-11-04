import { describe, expect, it } from "vitest";
import { mockImageData } from "./mockdata";
import ImageCard from "@/components/ImageCard";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers } from "@/mock/handlers";

afterEach(() => {
  cleanup();
});

// MSW 서버 설정
const server = setupServer(...handlers);

beforeAll(() => server.listen()); // MSW 서버 시작
afterEach(() => server.resetHandlers()); // 핸들러 리셋
afterAll(() => server.close()); // MSW 서버 종료

describe("Fetch가 성공했을 때의 ImageCard 테스트", () => {
  it("fetch된 데이터를 가지고 ImageCard가 적절히 렌더링 된다.", async () => {
    //msw로 mocking 된 데이터
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    //불러오고자 하는 mock data와 동일한 data가 불러와진다.
    const expected = mockImageData;
    expect(data).toEqual(expected);
  });

  it("유저 정보가 있을 때 'Photo by. [user]' 텍스트를 렌더링한다.", async () => {
    //msw로 mocking 된 데이터
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    const validImageData = data[0];
    const { user } = validImageData;

    const { getByText } = render(<ImageCard imageList={validImageData} />);
    expect(getByText(`Photo by. ${user}`)).toBeInTheDocument();
  });
  it("이미지 URL이 없다면 렌더링 되지 않는다.", async () => {
    // msw로 mocking 된 데이터
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    // webformatURL을 null로 설정
    const invalidImageData = { ...data[0], webformatURL: null };

    //container =  테스트 중 컴포넌트가 실제로 렌더링된 DOM
    const { container, debug } = render(<ImageCard imageList={invalidImageData} />);
    debug();
    expect(container.firstChild).toBeNull();
  });

  it("이미지의 alt 속성이 전달된 데이터에 맞게 설정된다.", async () => {
    // msw로 mocking 된 데이터
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    const validImageData = data[0];
    const { id, user } = validImageData;

    //렌더링
    const { debug, getByAltText } = render(<ImageCard imageList={validImageData} />);

    // screen.debug()는 render 후에 호출
    debug();

    // alt는 다음과 같은 형식으로 지정됨: imageList.id + "image-thumbnail" + imageList.user
    const srcItem = getByAltText(id + "image-thumbnail" + user);

    // srcItem이 존재해야 하므로 expect를 다음과 같이 수정
    expect(srcItem).toBeInTheDocument(); // srcItem이 실제로 존재하는지 확인
  });

  it("user와 userImageURL이 없을 경우 사용자 정보가 렌더링되지 않는다.", async () => {
    // msw로 mocking 된 데이터
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    // user와 userImageURL을 null로 설정
    const invalidImageData = { ...data[0], user: null, userImageUrl: null };
    const { id, user } = invalidImageData;

    //렌더링
    const { getByAltText, getByText } = render(
      <ImageCard imageList={invalidImageData} />,
    );

    expect(getByAltText(id + "image-user" + user)).toBeNull(); //alt 속성이 없다 (image가 없다.)
    //Photo by. {user}가 없다.
    expect(getByText("Photo by. " + user)).not.toBeInTheDocument();
  });

  it("이미지 컨테이너에 마우스를 올렸을 때 스타일이 변경된다.", async () => {
    //msw로 mocking 된 데이터
    const response = await fetch("https://example.com/user");
    const data = await response.json();

    const validImageData = data[0];
    const { getByTestId } = render(<ImageCard imageList={validImageData} />); // mock 데이터 사용

    const imageContainer = getByTestId("image-card").firstChild as HTMLElement;

    if (imageContainer) {
      await userEvent.hover(imageContainer);

      expect(imageContainer.className).toMatch(/before:bg-black/); // 정규식으로 특정 클래스를 포함하는지 확인
    }
  });
});
