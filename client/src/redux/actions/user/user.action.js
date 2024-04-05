import { toast } from 'react-toastify';
import axiosInstance from '../../../config/axiosConfig';

export const userSignIn = (payload) => async (dispatch) => {

    
    try {
        let result = await axiosInstance.post('/auth/login', payload);

        localStorage.setItem("auth", result.data.tokens.access.token)
        localStorage.setItem("refAuth", result.data.tokens.refresh.token)
        dispatch({
            type: 'USER_DETAILS',
            payload: result.data,
        })
        toast.dismiss();
        toast.success('Login Successfully')
        return result.data;
    } catch (error) {
        dispatch({
            type: 'USER_DETAILS',
            payload: undefined,
        })
        toast.dismiss()
        toast.error(error.data.message)
        return { status: false }
    }
}

export const userSignUp = (payload) => async (dispatch) => {
    try {
        let result = await axiosInstance.post('/auth/register', payload);

        localStorage.setItem("auth", result.data.tokens.access.token)
        localStorage.setItem("refAuth", result.data.tokens.refresh.token)
        dispatch({
            type: 'USER_DETAILS',
            payload: result.data,
        })
        toast.dismiss();
        toast.success('User has been registered Successfully')
        return;
    }
    catch (error) {
        dispatch({
            type: 'USER_DETAILS',
            payload: undefined,
        })
        toast.dismiss()
        toast.error(error.data.message)
        return { status: false }
    }
}

export const userLogout = () => async (dispatch) => {
    try {
        const refreshToken = localStorage.getItem("refAuth")
        await axiosInstance.post('/auth/logout', {refreshToken});
        
        localStorage.clear();

        dispatch({
            type: 'USER_LOGOUT',
            payload: undefined,
        })

        toast.dismiss();
        toast.success('User Logged Out Successfully')
        return true;
    }
    catch (error) {
        toast.dismiss()
        toast.error(error.data.message)
        return false;
    }
}