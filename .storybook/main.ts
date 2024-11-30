import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  staticDirs: ["../public/"], // Storybook에서 public 디렉토리를 참조하도록 설정
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  features: {
    viewportStoryGlobals: true,
  },
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      cssLoaderOptions: {
        importLoaders: 1,
      },
      postcssLoaderOptions: {
        implementation: require("postcss"),
      },
    },
  },
};
export default config;
