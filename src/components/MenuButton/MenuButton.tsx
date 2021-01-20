import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { Languages } from "../../enums/languages/languages"
import { useStyles } from "../../Functions/Hooks/useStyles"
import { loginAction, setShowUserInfo } from "../../state/actions/actions"
import { selectLoginStatus } from "../../state/selectors/userData.selector"
import { getTranslations } from "../../utils/utils"

type MyProps = {
  language?: Languages
}
const Box = styled.div`
  display: flex;
  justify-content: center;
  height: 64px;
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
  return (
    <Box className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        <MenuItem onClick={handleShowUserInfo}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>
          {loggedIn ? "logout" : "signUp-signIn"}
        </MenuItem>
      </Menu>
    </Box>
  )
}
