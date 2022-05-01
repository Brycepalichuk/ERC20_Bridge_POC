import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { NumberInput } from "@chakra-ui/react";
import CustomContainer from "./CustomContainer";

export default function RinkebyToMumbai() {

    const [amount, setAmount] = useState(0)
    const handleChange = (value) => setAmount(value)

    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold"> Transfer SICKLE token from Rinkeby to Mumbai (Get SICKLE from faucet tab)</Text>
            <FormControl mt="4">
                <FormLabel htmlFor="amount">
                    Amount to Bridge
                </FormLabel>
                <NumberInput step={0.1} onChange={handleChange}>
                    <NumberInputField id="amount"  value={amount} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </CustomContainer>
    )
}