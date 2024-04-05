import React, { useEffect, useState } from 'react';

import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';


const InputText = ({ label, type, placeholder, name, value, onChange, validationObj, refresh, style, ...rest }) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const changeValue = (event) => {
        setErrorMsg(null)
        onChange(event)
    }
    useEffect(() => {
        if (validationObj && !validationObj.isvalid) {
            setErrorMsg(validationObj.errorMessage)
        }
    }, [refresh, validationObj])
    return (
        <FormControl style={style}>
            {label ?
                <InputLabel className={validationObj?.required ? "required" : ""}>{label}</InputLabel>
                : <></>
            }
            <Input invalid={errorMsg ? true : false} type={type} placeholder={placeholder} name={name} value={value || ''} onChange={changeValue} {...rest} />
            <FormHelperText invalid>{errorMsg}</FormHelperText>
        </FormControl>
    )
}

export default InputText;