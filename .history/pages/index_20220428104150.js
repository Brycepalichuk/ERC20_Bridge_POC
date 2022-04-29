import { Button } from "@chakra-ui/button"
import { Flex, Text } from "@chakra-ui/layout"
import Head from "next/head"
import { useMoralis } from "react-moralis"

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
        
      </Flex>
    </>
  )
}
