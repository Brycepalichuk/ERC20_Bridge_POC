import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import CustomContainer from "./CustomContainer";
import { Button } from "@chakra-ui/button";
import Moralis from "moralis";
import { useToast } from "@chakra-ui/toast";
import { Text } from "@chakra-ui/layout";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import tokenContractABI from "../contracts/abis/tokenContractABI.json"

export default function Faucet() {
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState(0)
    const handleChange = (value) => setAmount(value)
    const toast = useToast()

    async function requestTokens (receiver, amount) {
        await Moralis.enableWeb3()

        const Options = {
            contractAddress: "0xc6Ca96a4bfB6814c9D07000b14b323B0Cc8D3374",
            functionName: "requestTokens",
            abi: tokenContractABI,
            params: {
                requestor: receiver,
                amount: Moralis.Units.FromWei(amount)
            }
        };

        const transaction = await Moralis.executeFunction(Options);
        console.log(transaction) 
    }


    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Recieve SICKLE (0xc6Ca96a4bfB6814c9D07000b14b323B0Cc8D3374, Rinkeby)</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                // await Moralis.enableWeb3()
                requestTokens({
                    onSuccess: () => {
                        toast({
                            title: 'SICKLE successfully sent!',
                            description: 'Fresh SICKLE are showing up into the receiver wallet',
                            status: 'success',
                            duration: 9000,
                            isClosable: true
                        })
                        setReceiver('')
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
                <FormControl mt="6" mb="6">
                    <FormLabel htmlFor="receiver" mt="4"> Input address to recieve SICKLE tokens</FormLabel>
                    <Input id="receiver" type="text" placeholder="0x..." value={receiver} onChange={e => setReceiver(e.target.value)} />
                    <NumberInput mt="4" step={0.1} onChange={handleChange}>
                        <NumberInputField id="amount" placeholder="ex. 100" value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button type="submit" colorScheme="teal" >??????&nbsp; Request SICKLE Tokens</Button>
            </form>
        </CustomContainer>
    )
}