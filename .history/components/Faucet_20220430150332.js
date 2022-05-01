import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import CustomContainer from "./CustomContainer";
import { Button } from "@chakra-ui/button";
import Moralis from "moralis";
import { useToast } from "@chakra-ui/toast";
import { Text } from "@chakra-ui/layout";

export default function Faucet() {
    const [receiver, setReceiver] = useState('')
    const toast = useToast()

    async function requestTokens () {
        // await Moralis.enableWeb3()

        const Options = {
            contractAddress: "0xc6Ca96a4bfB6814c9D07000b14b323B0Cc8D3374",
            functionName: "requestTokens",
            abi: [{ "inputs": [ { "internalType": "address", "name": "requestor", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "requestTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
            params: {
                requestor: receiver,
                amount: Moralis.Units.Token("10", "18")
            }
        };

        const transaction = await Moralis.executeFunction(Options); 
    }


    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Recieve SICKLE Token on RINKEBY</Text>
            <Text fontSize="l" fontWeight="bold">Rinkeby Address: 0xc6Ca96a4bfB6814c9D07000b14b323B0Cc8D3374</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
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
                    <FormLabel htmlFor="receiver" mt="4"> Input address to recieve 10 SICKLE tokens (ONCE PER DAY MAX)</FormLabel>
                    <Input id="receiver" type="text" placeholder="0x..." value={receiver} onChange={e => setReceiver(e.target.value)} />
                </FormControl>
                <Button type="submit" colorScheme="teal" >⬇️&nbsp; Request SICKLE Tokens</Button>
            </form>
        </CustomContainer>
    )
}