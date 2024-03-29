import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Languages } from '../../enums/languages/languages';
import { useStyles } from '../../Functions/Hooks/useStyles';
import { loginAction, setShowLoginRegisterForm, setShowUserInfo } from '../../state/actions/actions';
import { selectLoginStatus } from '../../state/selectors/userData.selector';
import { getTranslations } from '../../utils/utils';
import { Button } from '../Button/Button';

type MyProps = {
  language?: Languages
}
const Box = styled.div`
  display: flex;
  justify-content: center;
`
export const MenuButton: React.FC<MyProps> = ({ language }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const dispatch = useDispatch()
  const classes = useStyles()
  const loggedIn = useSelector(selectLoginStatus)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleLogout = () => {
    handleClose()
    dispatch(
      loginAction({
        isLoggedIn: false,
        canUpload: false,
        subscribed: false,
        email: "",
        stripeCustomerId: "",
        subscriptionId: "",
        loginName: "",
      })
    )
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleShowUserInfo = () => {
    handleClose()
    dispatch(setShowUserInfo(true))
  }
  const showLogin = () => {
    dispatch(setShowLoginRegisterForm(true))
  }
  return (
    <Box className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        handleClick={handleClick}
        variant="contained"
        color="primary"
      >
        {getTranslations(language, "UserInfo")}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={loggedIn ? handleShowUserInfo : showLogin}>
          My account
        </MenuItem>
        <MenuItem onClick={loggedIn ? handleLogout : showLogin}>
          {loggedIn ? "logout" : "signUp-signIn"}
        </MenuItem>
      </Menu>
    </Box>
  )
}
