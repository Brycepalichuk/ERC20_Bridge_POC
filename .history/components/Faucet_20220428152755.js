import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import CustomContainer from "./CustomContainer";
import { useWeb3Transfer } from "react-moralis";
import { Button } from "@chakra-ui/button";
import Moralis from "moralis";

export default function Faucet() {
    const [requester, setRequester] = useState('')
    // const [amount, setAmount] = useState('')
    const { fetch, error, isFetching} = useWeb3Transfer()

    return (
        <CustomContainer>
            <form onSubmit={e => {
                e.preventDefault()
                if(requester.trim() !== '') {
                    fetch({
                        amount: Moralis.Units.Token(20, 18),
                        receiver: requester,
                        type: "erc20",
                        contractAddress: "0xBD0E4389F397dab6dD0ED32d8eDF36581FDcbCd8"
                    })
                }
            }}>
                <FormControl mt="6" mb="6">
                    <FormLabel htmlFor="requester"> Input address to send SICKLE tokens</FormLabel>
                    <Input id="requester" type="text" placeholder="0x..." value={requester} onChange={e => setRequester(e.target.value)}></Input>
                </FormControl>
                <Button type="submit" colorScheme="teal" disabled={isFetching}>⬇️&nbsp; Request SICKLE Tokens</Button>
            </form>
        </CustomContainer>
    )
}