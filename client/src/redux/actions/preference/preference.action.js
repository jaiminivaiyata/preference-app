import { toast } from 'react-toastify';
import axiosInstance from '../../../config/axiosConfig';

export const updatePreference = (payload) => async (dispatch) => {
    try {
        let result = await axiosInstance.post('/preference/save', payload);

        dispatch({
            type: 'UPDATE_PRIMARY_COLOR',
            payload: result.data.preference.preference,
        })
        return result.data;
    } catch (error) {
        toast.dismiss()
        toast.error(error.data.message)
        return { status: false }
    }
}