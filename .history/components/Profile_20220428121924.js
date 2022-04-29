import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Profile({user}) {
    const [input, setInput] = useState('')
    const {setUserData, isUserUpdating} = useMoralis()

    return(
        <CustomContainer>
            <Text><b>😎&nbsp; Username:</b> {user.getUsername()}</Text>
            <Text><b>💰&nbsp; Wallet Address:</b> {user.get('ethAddress')}</Text>
            <form onSubmit={e => {
                e.preventDefault()
                if(input.trim() !== '') {
                    setUserData({
                        username: input
                    }).then(() => setInput(''))
                }
            }}>
                <FormControl mt="6" mb="6"> 
                    <FormLabel htmlFor="username">Set a new username</FormLabel>
                    <Input id="username" type="text" placeholder="ex. LilCat" value={input} onChange={e => setInput(e.target.value)}></Input>
                </FormControl>
                <Button type="submit" colorScheme="purple" disabled={isUserUpdating}>✅&nbsp; Change Username</Button>
            </form>
        </CustomContainer>
    )
}