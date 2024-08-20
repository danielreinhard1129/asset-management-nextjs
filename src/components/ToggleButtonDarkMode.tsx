"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  ActionIconProps,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { FC } from "react";

interface ToggleButtonDarkModeProps extends ActionIconProps {}

const ToggleButtonDarkMode: FC<ToggleButtonDarkModeProps> = (props) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      {...props}
    >
      {colorScheme === "light" ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
};

export default ToggleButtonDarkMode;
