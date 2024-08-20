import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-sm)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar name={name} color="initials" radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
);

export default function MenuAvatar({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <Menu>
      <Menu.Target>
        <UserButton name={name} email={email} />
      </Menu.Target>
    </Menu>
  );
}
