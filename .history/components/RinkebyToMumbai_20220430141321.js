import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import CustomContainer from "./CustomContainer";

export default function RinkebyToMumbai() {


    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold"> Transfer SICKLE token from Rinkeby to Mumbai (Get SICKLE from faucet tab)</Text>
            <FormControl mt="4">
                <FormLabel htmlFor="amount">
                    Amount to Bridge
                </FormLabel>
            </FormControl>
        </CustomContainer>
    )
}