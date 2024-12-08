# 📷Pixabay API를 이용한 UI Test 프로젝트

이 프로젝트는 **UI 테스트**를 연습하기 위한 프로젝트입니다. **Jest**와 **Storybook**, **MSW** 를 활용하여 UI 컴포넌트 테스트를 진행하고, **Next.js**와 **Tailwind CSS**로 웹 애플리케이션을 개발했습니다.

사용자는 **Pixabay API**를 통해 키워드 기반으로 이미지를 검색하고, 검색된 이미지를 무한 스크롤 방식으로 탐색할 수 있습니다. **React Hook Form**을 활용한 폼 관리를 통해 효율적인 사용자 입력 처리를 구현했으며, **Tanstack Query**를 사용하여 API 호출 및 데이터 관리의 효율성을 높였습니다.

🔗[배포 된 웹사이트 바로가기](https://ui-test-virid.vercel.app/)

## 프로젝트 목적

- **UI 컴포넌트 테스트**: Jest와 Storybook을 활용한 UI 컴포넌트 단위 테스트와 시각적 검토
- **Mocking**: MSW(Mock Service Worker)를 활용하여 API 요청을 모킹하고 테스트 환경을 구축
- **상태 관리 연습**: React Query와 React Hook Form을 활용한 상태 관리 및 폼 처리 실습
- **무한 스크롤 구현**: 페이지 네비게이션 없이, 스크롤을 내리며 데이터를 불러오는 무한 스크롤 기능 구현
- **API 통합 연습**: Pixabay API를 사용하여 외부 데이터를 활용한 이미지 검색 기능 구현

## 사용 기술

- **프론트엔드**
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white">

- **상태 관리**
  <img src="https://img.shields.io/badge/Zustand-0070F3?style=for-the-badge&logo=Zustand&logoColor=white">

- **데이터 Fetching**
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

- **API**
  <img src="https://img.shields.io/badge/Pixabay-FFCC00?style=for-the-badge&logo=Pixabay&logoColor=white">

- **폼 관리**
  <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=React%20Hook%20Form&logoColor=white">

- **테스트**
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white"> <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white"> <img src="https://img.shields.io/badge/MSW-47A2FF?style=for-the-badge&logo=MSW&logoColor=white">

## 주요 기능

### 1. **Pixabay API로 이미지 검색**

- 사용자는 검색어를 입력하여 **Pixabay API**의 이미지를 검색할 수 있습니다.
- API로부터 반환된 이미지를 grid를 통해 반응형에 대응하여 화면에 표시합니다.

### 2. **무한 스크롤**

- **Tanstack Query**를 활용한 **무한 스크롤** 방식으로 스크롤을 내리면 새로운 데이터가 자동으로 fetching되어 새로운 이미지 카드를 탐색할 수 있습니다.

## 설치 및 실행 방법

1. **레포지토리 클론**

```bash
git clone https://github.com/saemii-24/UI_TEST.git
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**
   프로젝트 루트 디렉토리에 .env 파일을 추가하고, Pixabay API 키를 설정합니다.

```env
NEXT_PUBLIC_API_KEY = (발급받은 API KEY를 설정합니다.)
```

4. **개발 서버 실행**

```bash
npm run dev
```

## Storybook

Chromatic을 통해 배포된 컴포넌트 시각화와 테스트를 위한 Storybook을 아래 링크에서 확인할 수 있습니다.

🔗[Storybook](https://6728c81a31a148aa35ef7e13-exrexqzpjh.chromatic.com/?path=/docs/configure-your-project--docs)
