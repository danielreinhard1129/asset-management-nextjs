import { Box, Divider, Flex, Indicator, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { Notification } from "../types";

interface NotificationCardProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  onClick,
}) => {
  const { id, title, description, readAt } = notification;

  return (
    <Box mb="md" onClick={onClick} style={{ cursor: "pointer" }}>
      <Indicator size={!readAt ? 12 : 0} offset={7} position="middle-end">
        <Box pr="md">
          <Text fw="bold" lineClamp={1}>
            {title}
          </Text>
          <Text lineClamp={2}>{description}</Text>
        </Box>
      </Indicator>

      <Divider mt="md" />
    </Box>
  );
};

export default NotificationCard;
