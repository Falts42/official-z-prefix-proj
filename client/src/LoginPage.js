import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Text, Link } from "@chakra-ui/react";
import {
  Button,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  Stack,
  useToast,
  IconButton,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthUser";

export default function LoginPage() {
  const { state } = useLocation();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  useEffect(() => {
    if (state) {
      toast({
        title: "Error not Logged In",
        description: state.msg,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleChange = (e) => {
    if (e.target.id === "username") {
      setLogin({ ...login, username: e.target.value });
    } else if (e.target.id === "password") {
      setLogin({ ...login, password: e.target.value });
    }
  };

  const submitLogin = () => {
    if (
      login.account === "" ||
      login.username === "" ||
      login.password === ""
    ) {
      // Creates a pop up if none of the fields are properly filled out
      toast({
        title: "Incomplete Login Fields",
        description: "You must fill in all login fields to continue",
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
      setInvalid(true);
    } else {
      setLoading(!loading);
      user.loginAction(login);
    }
  };

  const user = useAuth();

  // if (user.token) return <Navigate to="/managerView" state={userData} />;
  // if (user.token) return <Navigate to="/managerView" />;

  return (
    <>
      <Box boxShadow="lg" paddingY="2em">
        <Box display="flex" justifyContent="center">
        </Box>
        {/* A container that takes in the user's input */}
        <Container paddingTop="2em" maxW={["50%", "30%", "20%"]}>
          <Stack gap={2}>
            <Input
              variant="flushed"
              onChange={handleChange}
              id="username"
              placeholder="Username"
              isInvalid={invalid && login.username === ""}
            ></Input>
            <InputGroup size="md">
              <Input
                onChange={handleChange}
                pr="4.5rem"
                variant="flushed"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                id="password"
                isInvalid={invalid && login.password === ""}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Container display="flex" justifyContent="center" marginTop="1em">
            <Button
              isLoading={loading}
              loadingText="Logging In"
              onClick={submitLogin}
            >
              Login
            </Button>
          </Container>
        </Container>
        <VStack>
        <Box>
          {/* Creates a hyperlink that navigates to the CreateAccount Page */}
            <Text>
              <Link color='teal.500' href='/createAccount'>
                Create New Account{' '}
              </Link>
              ?
            </Text>
          </Box>
          <Box>
            {/* Creates a hyperlink that navigates to the GuestView Page */}
            <Text>
              Would you like to{' '}
              <Link color='teal.500' href='/guestView'>
                go to the visitors page
              </Link>
              ?
            </Text>
          </Box>

        </VStack>
      </Box>
    </>
  );
}