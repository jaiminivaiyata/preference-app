import React, { useState } from "react";

import { Box, styled, Typography } from "@mui/material"
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Container = styled(Box)`
    height: 100vh;
    width: 100%;
    display: flex;
`

const LeftContainer = styled(Box)`
    background: #2874f0;
    width: 30%;
    text-align: center;
    padding-top: 100px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600;
    }
`
const RightContainer = styled(Box)`
    width: 70%;
    text-align: center;
    position: relative;
`


const Login = () => {

    const [isLogin, setIsLogin] = useState(true);

    const toggleIsLogin = () =>{
        setIsLogin(!isLogin);
    } 
    return (
        <Container>
            <LeftContainer>
                <Typography variant="h5">{isLogin ? "Login" : "Signup"}</Typography>
                <Typography style={{ marginTop: 20 }}>Welcome to Preference Aplication</Typography>
            </LeftContainer>
            <RightContainer>
                {
                    isLogin ?
                        <LoginForm toggleIsLogin={toggleIsLogin} /> :
                        <RegisterForm toggleIsLogin={toggleIsLogin} />
                }
            </RightContainer>
        </Container>
    )
}

export default Login;