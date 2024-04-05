import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePreference } from '../redux/actions/preference/preference.action';

export const ThemeContext = createContext("");

export const ThemeProvider = ({ children }) => {
    const dispatch = useDispatch();
    const {user_details} = useSelector((state)=> state.user)
    const initialPrimaryColor = user_details?.preference?.["primary-theme-color"] ? user_details?.preference?.["primary-theme-color"] : "";
    const [primaryThemeColor, setPrimaryThemeColor] = useState(initialPrimaryColor);

    useEffect(()=>{
        if(primaryThemeColor)
        {
            dispatch(updatePreference({"primary-theme-color": primaryThemeColor}));
        }
    }, [primaryThemeColor]);

    const changePrimaryThemeColor = (value) => {
        setPrimaryThemeColor(value)
    }
    return (
        <ThemeContext.Provider value={{primaryThemeColor, changePrimaryThemeColor}}>
                {children}
        </ThemeContext.Provider>
    )
}