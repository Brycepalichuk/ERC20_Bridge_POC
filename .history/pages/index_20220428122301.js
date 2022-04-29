import { Button } from "@chakra-ui/button"
import { Box, Flex, Text } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import Head from "next/head"
import { useMoralis } from "react-moralis"
import Header from "../components/Header"
import Profile from "../components/Profile"

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } = useMoralis()

  if(!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | ERC20_Bridge</title>
        </Head>
        <Flex
        direction="column" 
        justifyContent="center" 
        alignItems="center"
        width="100vw"
        height="100vh"
        bgGradient="linear(to-br, teal.400, purple.300)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            ERC20 Bridge POC
          </Text>
          <Button
          colorScheme="red"
          size="lg"
          mt="6"
          onClick={() => authenticate({
            signingMessage: "Sign to login to ERC20 Bridge POC"
          })}
          >
            Login with MetaMask
          </Button>
        </Flex>
      </>
    )
  }

  return(
    <>
      <Head>
        <title> ERC20 Bridge POC</title>
      </Head>
      <Flex
      direction="column"
      width="100vw"
      height="100vw"
      >
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut}/>
        <Box flex="1" bg="yellow.300" px="44" py="20">
          <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Send Token from Rinkeby &nbsp;➡️&nbsp; Mumbai</Tab>
              <Tab fontWeight="bold">Send Token from Mumbai &nbsp;➡️&nbsp; Rinkeby</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              <TabPanel>Rinkeby➡️Mumbai</TabPanel>
              <TabPanel>Mumbai➡️Rinkeby</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
