import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import CustomContainer from "./CustomContainer";
import Moralis from "moralis";

export default function RinkebyToMumbai() {

    const mainTokenAddress = "0xc6Ca96a4bfB6814c9D07000b14b323B0Cc8D3374";
    const mainBridgeAddress = "0x115259AE4F24B79C51C84035e9eb3b553d9D2E8C";
    const [amount, setAmount] = useState(0)
    const handleChange = (value) => setAmount(value)

    async function bridgeTokens() {
        await Moralis.enableWeb3()

        console.log(amount)
    }

    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold"> Transfer SICKLE token from Rinkeby to Mumbai Testnets (Get SICKLE from faucet tab first)</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
                bridgeTokens({
                    onSuccess: () => {
                        toast({
                            title: 'SICKLE successfully sent to Mumbai Testnet!',
                            description: 'SICKLE are being transferred to Mumbai Testnet',
                            status: 'success',
                            duration: 9000,
                            isClosable: true
                        })
                        setAmount('')
                    },
                    onError: (error) => {
                        toast({
                            title: 'Error',
                            description: error,
                            status: 'error',
                            duration: 9000,
                            isClosable: true
                        })
                    }
                })
            }}>
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