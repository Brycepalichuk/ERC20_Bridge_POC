import { Button } from "@chakra-ui/button"
import { Box, Flex, Text } from "@chakra-ui/layout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import Head from "next/head"
import { useMoralis } from "react-moralis"
import Faucet from "../components/Faucet"
import Header from "../components/Header"
import MumbaiToRinkeby from "../components/MumbaiToRinkeby"
import Profile from "../components/Profile"
import RinkebyToMumbai from "../components/RinkebyToMumbai"

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
        bgGradient="linear(to-br, teal.400, green.200)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            ERC20 Bridge POC
          </Text>
          <Button
          colorScheme="teal"
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
        <Box flex="1" bgGradient="linear(to-br, teal.400, green.200)" px="44" py="20">
          <Tabs size="lg" colorScheme="teal" align="center" variant="enclosed">
            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">SICKLE Token Faucet</Tab>
              <Tab fontWeight="bold">Send SICKLE from Rinkeby &nbsp;➡️&nbsp; Mumbai</Tab>
              <Tab fontWeight="bold">Send SICKLE from Mumbai &nbsp;➡️&nbsp; Rinkeby</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              <TabPanel>
                <Faucet />
              </TabPanel>
              <TabPanel>
                <RinkebyToMumbai />
              </TabPanel>
              <TabPanel>
                <MumbaiToRinkeby />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
