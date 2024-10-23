import BottomTabs from "@/components/BottomTabs";
import { Container } from "@mantine/core";
import Jumbotron from "./components/Jumbotron";
import TabsHome from "./components/Tabs";

const HomepageUser = () => {
  return (
    <>
      <Jumbotron />
      <Container>
        <TabsHome />
      </Container>
      <BottomTabs />
    </>
  );
};

export default HomepageUser;
