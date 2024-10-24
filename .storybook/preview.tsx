import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { useEffect } from "react";
import React from "react";
import { Noto } from "../src/app/font";

const preview = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add(Noto.variable);
      }, []);

      return <Story />;
    },
  ],
} satisfies Preview;

export default preview;
