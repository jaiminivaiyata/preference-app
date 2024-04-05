import React from "react";
import { useDispatch } from "react-redux";
import {Menu, MenuItem} from '@mui/material';
import { userLogout } from "../../redux/actions/user/user.action";

const ProfileMenu = ({open, anchorEl, handleClose}) =>{

    const dispatch = useDispatch();
    
    const onLogoutClick = async () =>{
        const res = await dispatch(userLogout())

        if (res) {
            window.location.href = "/";
        };
    }
    return(
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    )
}

export default ProfileMenu;