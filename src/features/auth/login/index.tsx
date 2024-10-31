import { Box, Grid, GridCol, Title } from "@mantine/core";
import Image from "next/image";
import thumbnail from "../../../../public/login.svg";
import FormLogin from "./components/FormLogin";

const LoginPage = () => {
  return (
    <Grid style={{ overflow: "hidden" }}>
      <GridCol pos="relative" display={{ base: "none", sm: "block" }} span={6}>
        <Title pos="absolute" top={16} left={32} style={{ zIndex: 1 }}>
          Logo
        </Title>
        <Box pos="relative" w="100%" h="100vh">
          <Image
            src={thumbnail}
            alt="thumbnail"
            fill
            objectFit="cover"
            priority
          />
        </Box>
      </GridCol>
      <GridCol span={{ base: 12, sm: 6 }}>
        <FormLogin />
      </GridCol>
    </Grid>
  );
};

export default LoginPage;
