import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Box, Select, MenuItem, Typography, styled } from "@mui/material"
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../lib/ThemeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileMenu from './ProfileMenu';

const StyledHeader = styled(AppBar)`
    height: 100px;
`
const CustomButtonWrapper = styled(Box)`
    margin: 0 5% 0 auto;
`

const BoxContainer = styled(Box)`
    display: flex;
    margin: 0 3% 0 auto;
    & > button, & > p, & > div {
        margin-right: 40px;
        font-size: 16px;
        align-items: center;
    }
`
const names = [
    'Blue',
    'Red',
    'Black',
    'Yellow',
    'Grey'
];


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const onProfileClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { primaryThemeColor, changePrimaryThemeColor } = useContext(ThemeContext);

    const onValueChange = (e) => {
        changePrimaryThemeColor(e.target.value);
    }

    const userDetails = useSelector((state) => state.user.user_details);

    return (
        <StyledHeader style={{ background: primaryThemeColor }}>
            <Toolbar style={{ minHeight: 100 }}>
                <Typography style={{ marginLeft: 50 }}>Welcome to Preference App</Typography>
                <CustomButtonWrapper>
                    <BoxContainer>
                        <Box style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}>
                            <Typography >Primary Theme Color</Typography>
                            <Select
                                style={{ color: 'black', background: 'white' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={primaryThemeColor || names[0]}
                                name="Primary Theme Color"
                                onChange={onValueChange}
                            >
                                {names.map((name, i) => (
                                    <MenuItem
                                        key={i}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box style={{ display: 'flex' }}>
                            <Typography style={{ marginRight: 10 }}>{userDetails?.user?.name || "" }</Typography>
                            <AccountCircleIcon style={{ height: 40, width: 40 }} onClick={(e) => onProfileClick(e)} />
                            <ProfileMenu open={menuOpen} anchorEl={anchorEl} handleClose={handleClose} />
                        </Box>

                    </BoxContainer>
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;