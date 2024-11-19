module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react", // JSX와 관련된 설정을 위한 프리셋 추가
    "next/babel",
  ],
  plugins: [
    "@babel/plugin-transform-react-jsx", // React 17 이상에서는 이 플러그인 추가
  ],
};
