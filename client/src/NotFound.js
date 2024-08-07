import { Box, Heading, Text, Link } from "@chakra-ui/react";


export default function NotFound() {
    return (
        <Box textAlign="center">
            <Heading>404 Page Not Found</Heading>
            <Text>
                Would you like to{' '}
                <Link color='teal.500' href='/'>
                    go home
                </Link>
                ?
            </Text>
        </Box>
    )
}