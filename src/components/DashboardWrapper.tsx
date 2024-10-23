import { Anchor, Box, Breadcrumbs, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface DashboardWrapperProps extends PropsWithChildren {
  title: string;
  links: { title: string; href: string }[];
}

const DashboardWrapper: FC<DashboardWrapperProps> = ({
  title,
  links,
  children,
}) => {
  return (
    <Flex
      style={{ backgroundColor: "white", borderRadius: "8px" }}
      direction="column"
      p="xl"
    >
      <Stack gap="sm">
        <Title size="h3">{title}</Title>
        <Breadcrumbs>
          {links.map((item, index) => (
            <Anchor
              key={index}
              component={Link}
              href={item.href}
              c="gray"
              fz="sm"
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      </Stack>

      <Box mt="xl">{children}</Box>
    </Flex>
  );
};

export default DashboardWrapper;
