import { auth } from "@/lib/auth";
import { Avatar, Flex, Stack, Text } from "@mantine/core";

const Jumbotron = async () => {
  const session = await auth();

  return (
    <Stack py="xl" style={{ backgroundColor: "#FF474C" }}>
      <Flex direction="column" align="center" gap="lg">
        <Avatar size="xl" variant="default" color="" />
        <Stack gap="0" align="center">
          <Text fz="h2" c='white'>
            {session?.user.firstName} {session?.user.lastName}
          </Text>
          <Text fz="sm" c='white'>
            {session?.user.departmentName} - {session?.user.departmentAddress}
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Jumbotron;
