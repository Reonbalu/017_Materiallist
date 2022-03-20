import { IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { showToast } from "./ToasterUtil";

export const MenuList = ({ area, flgcheck }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
    if(flgcheck===false){
      showToast({ message: "チェックしてね" })
      handleClose(event)
    }
  };
  const handleClose = (event: any) => {
    event.stopPropagation()
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={(e) => handleClick(e)}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        // aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClose(e)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{ width: "170px" }} onClick={(e) => handleClose(e)}>複写</MenuItem>
        <MenuItem onClick={(e) => handleClose(e)}>短文化</MenuItem>
        {area === "layoutcompleted" ? null : <MenuItem onClick={(e) => handleClose(e)}>削除</MenuItem>}
      </Menu>
    </>
  )
}