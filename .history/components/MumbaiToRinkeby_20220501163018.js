import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Center, Text } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import CustomContainer from "./CustomContainer";
import Moralis from "moralis";

export default function MumbaiToRinkeby() {

    const sideTokenAddress = "0xC59ce03F8dD191cA34ff04778014cb3808F5C89A";
    const sideBridgeAddress = "0x81071Ea1de5Ea57F3CC37Cd03845dfD77500bBf1";
    const [amount, setAmount] = useState(1)
    const handleChange = (value) => setAmount(value)

    async function bridgeTokens() {

        await Moralis.enableWeb3()
        const amountToBridge = amount;
        const options = {
            type: "erc20", 
            amount: Moralis.Units.Token(amountToBridge, "18"), 
            receiver: sideBridgeAddress,
            contractAddress: sideTokenAddress
        }
        let result = await Moralis.transfer(options)
        console.log(result)

    }

    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Transfer SICKLE token from Mumbai to Rinkeby Testnets (Bridge SICKLE to Mumbai first)</Text>
            <Text fontSize="xl" fontWeight="bold">MAKE SURE MUMBAI TESTNET IS SELECTED IN METAMASK BEFORE PROCEEDING</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
                bridgeTokens({
                    onSuccess: () => {
                        toast({
                            title: 'SICKLE successfully sent to Rinkeby Testnet!',
                            description: 'SICKLE are being transferred to Rinkeby Testnet',
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
                    <Center>
                        <FormLabel htmlFor="amount">
                            Amount to Bridge
                        </FormLabel>
                    </Center>
                    <Center>
                        <NumberInput width="auto" step={0.1} onChange={handleChange} defaultValue={1} min={0.1}>
                            <NumberInputField id="amount"  value={amount} />
                        </NumberInput>
                    </Center>
                </FormControl>
                <Center>
                    <Button mt="4" type="submit" colorScheme="teal" >⬇️&nbsp; Bridge SICKLE to Rinkeby</Button>
                </Center>
            </form>
        </CustomContainer>
    )
}