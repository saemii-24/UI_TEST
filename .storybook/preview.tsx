import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import React from "react";
import { Noto } from "../src/font";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={Noto.variable + " font"}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
