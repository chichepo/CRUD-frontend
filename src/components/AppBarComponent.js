// AppBarComponent.js
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MyIcon from '../assets/icons/megureit-vector-logo.svg';

const AppBarComponent = ({ onMenuClick }) => {  // Changed setPage to onMenuClick
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePageChange = (selectedPage) => {
    onMenuClick(selectedPage);  // Use onMenuClick here
    handleDrawerClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#02296e' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="icon">
          <img src={MyIcon} alt="My Icon" width="30" height="30" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Divider />
          <List>
            {['Cities', 'Projects', 'Buildings', 'ApartmentTypes', 'Apartments', 'RentalPrices', 'ExternalParameters', 'ExternalParametersValues'].map((text, index) => (
              <ListItem button key={text} onClick={() => handlePageChange(text)}>
                {text}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default AppBarComponent;
