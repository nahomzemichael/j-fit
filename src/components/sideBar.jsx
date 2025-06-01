import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {navItems,options} from "../lib/data"



export default function SideBar({onSelect}) {
  const [state, setState] = React.useState({
    left: false,
  });
  const [selectedBodyPart, setSelectedBodyPart] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleNavItemClick = (bodyPartName) => {
    setSelectedBodyPart(bodyPartName);
    setState({ ...state, left: false }); // Close drawer on click
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      
      <List>
        {navItems.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() =>{
              handleNavItemClick(navItem.name)
              onSelect(navItem.name)  // Call the onSelect prop with the selected body part
              }}>
              <ListItemText primary={navItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {options.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={option.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["j-fit"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={
            toggleDrawer(anchor, true)
            }>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          
        </React.Fragment>
      ))}
    </div>
  );
}