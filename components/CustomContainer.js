import { Box } from "@chakra-ui/layout";

export default function CustomContainer({children}) {
    return(
        <Box bg="white" width="full" height="full" px="20" py="10" rouded="lg" shawdow="lg" textAlign="left">
            {children}
        </Box>
    )
}