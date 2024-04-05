import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputText from "../../components/Forms/InputText";
import { useFormFields } from "../../lib/formHook";
import { useDispatch } from "react-redux";
import { validateObject } from "../../lib/common";
import { userSignUp } from "../../redux/actions/user/user.action";

const FormWrapper = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 50%;
    height: 50%;
    flex-direction: column;
    flex: 1;
    & > div {
        margin-top: 20px;
    }
`
const RegisterButton = styled(Button)`
    text-transform: none;
    background-color: #FB641B;
    color: #fff;
    margin: 50px 50px;
    border-radius: 2px;
`
const CreateAccount = styled(Typography)`
    font-size: 14px;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;
`
const RegisterForm = ({ toggleIsLogin }) => {

    const validations = {
        name: {
            required: true,
            errorMessage: "*Please enter valid Name!",
            isvalid: true,
        },
        email: {
            required: true,
            errorMessage: "*Please enter valid Email!",
            isvalid: true,
        },
        password: {
            required: true,
            errorMessage: "*Please enter valid password!",
            isvalid: true,
            minlength: 6,
        },
    };

    const [refresh, setRefresh] = useState(false);
    const [validationObject, setValidationObject] = useState(validations);
    const [data, setData] = useFormFields({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const validateForm = () => {
        let isFormValid = true;

        let temp = { ...validationObject };
        [temp, isFormValid] = validateObject(temp, data);

        setValidationObject(temp);
        setRefresh(!refresh);
        return isFormValid;
    };

    const register = async (e) => {
        
        e.preventDefault();
        if (validateForm()) {
            await dispatch(userSignUp(data));
            clearData();
        }
    };

    const clearData = () => {
        setValidationObject(validations);
        setData({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <FormWrapper>

            <InputText
                label="Enter Name"
                validationObj={validationObject.name}
                refresh={refresh}
                name="name"
                type="text"
                value={data.name}
                onChange={setData}
                autoComplete="off"
            />
            <InputText
                label="Enter Email"
                validationObj={validationObject.email}
                refresh={refresh}
                name="email"
                type="text"
                value={data.email}
                onChange={setData}
                autoComplete="off"
            />
            <InputText
                label="Enter Password"
                validationObj={validationObject.password}
                refresh={refresh}
                type="password"
                name="password"
                value={data.password}
                onChange={setData}
                autoComplete="off"
            />
            <RegisterButton onClick={register}>Register</RegisterButton>
            <CreateAccount onClick={() => toggleIsLogin()}>Back to Login</CreateAccount>
        </FormWrapper>
    )
}

export default RegisterForm;