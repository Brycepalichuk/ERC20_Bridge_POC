import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import CustomContainer from "./CustomContainer";

export default function RinkebyToMumbai() {

    const [amount, setAmount] = useState(0)
    const handleChange = (value) => setAmount(value)

    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold"> Transfer SICKLE token from Rinkeby to Mumbai Testnets (Get SICKLE from faucet tab first)</Text>
            <form>
            <FormControl mt="4">
                <FormLabel htmlFor="amount">
                    Amount to Bridge
                </FormLabel>
                <NumberInput step={0.1} onChange={handleChange} defaultValue={1} min={0.1}>
                    <NumberInputField id="amount"  value={amount} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <Button mt="4" type="submit" colorScheme="teal" >⬇️&nbsp; Bridge SICKLE to Mumbai</Button>
            </form>
        </CustomContainer>
    )
}