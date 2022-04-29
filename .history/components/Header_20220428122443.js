import { Button } from "@chakra-ui/button";
import { Center, Flex, Text } from "@chakra-ui/layout";

export default function Header({user, logout, isLoggingout}) {
    return(
        <header>
            <Flex
            px="10"
            py="6" 
            justifyContent="space-between"
            bg="teal.600"
            color="white"
            >
                <Center>
                    <Text
                    fontSize="xl"
                    fontWeight="bold"
                    > 
                        ERC20 Bridge
                    </Text>
                </Center>
                <Center>
                    <Text>{user.getUsername()}</Text>
                    <Button 
                    ml="4"
                    colorScheme="red"
                    onClick={logout}
                    disabled={isLoggingout}
                    >
                        Logout
                    </Button>
                </Center>
            </Flex>
        </header>
    )
}