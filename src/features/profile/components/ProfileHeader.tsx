import { auth } from "@/lib/auth";
import { Avatar, Box, Container, Flex, Stack, Text } from "@mantine/core";

const ProfileHeader = async () => {
  const session = await auth();

  return (
    <Box style={{ backgroundColor: "#FF474C" }}>
      <Container>
        <Stack py="64px">
          <Flex align="center" gap="lg">
            <Avatar size="xl" variant="default" color="" />
            <Stack gap="0" align="center">
              <Text fz="h2" c="white">
                {session?.user.firstName} {session?.user.lastName}
              </Text>
              <Text fz="sm" c="white">
                {session?.user.departmentName} -{" "}
                {session?.user.departmentAddress}
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfileHeader;
