import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import CustomContainer from "./CustomContainer";
import { useWeb3Transfer } from "react-moralis";
import { Button } from "@chakra-ui/button";
import Moralis from "moralis";
import { useToast } from "@chakra-ui/toast";
import { Text } from "@chakra-ui/layout";

export default function Faucet() {
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState(0)
    const handleChange = (value) => setAmount(value)
    const { fetch, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.Token(amount, 18),
        receiver: receiver,
        type: 'erc20',
        contractAddress: "0xBD0E4389F397dab6dD0ED32d8eDF36581FDcbCd8"
    })
    const toast = useToast()

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Recieve SICKLE</Text>
            <form onSubmit={e => {
                e.preventDefault()
                if(receiver.trim() !== '') {
                    fetch({
                        amount: Moralis.Units.Token(20, 18),
                        receiver: receiver,
                        type: "erc20",
                        contractAddress: "0xBD0E4389F397dab6dD0ED32d8eDF36581FDcbCd8"
                    })
                }
            }}>
                <FormControl mt="6" mb="6">
                    <FormLabel htmlFor="receiver"> Input address to recieve SICKLE tokens</FormLabel>
                    <Input id="receiver" type="text" placeholder="0x..." value={receiver} onChange={e => setreceiver(e.target.value)}></Input>
                </FormControl>
                <Button type="submit" colorScheme="teal" disabled={isFetching}>⬇️&nbsp; Request SICKLE Tokens</Button>
            </form>
        </CustomContainer>
    )
}