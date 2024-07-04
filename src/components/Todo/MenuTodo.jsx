import { setFilter } from '@containers/App/actions';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classes from './todocomp.module.scss';

const MenuTodo = () => {
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      dispatch(setFilter('ALL'));
      setValue(newValue);
    } else if (newValue === 1) {
      dispatch(setFilter('UNCHECKED'));
      setValue(newValue);
    } else {
      dispatch(setFilter('CHECKED'));
      setValue(newValue);
    }
    setValue(newValue);
  };

  return (
    <Box className={classes.boxMenu}>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'var(--main-component)',
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label="All"
            sx={{ fontFamily: ['Josefin Sans', 'sans-serif'].join(','), fontWeight: 700, textTransform: 'none' }}
          />
          <Tab
            label="Active"
            sx={{ fontFamily: ['Josefin Sans', 'sans-serif'].join(','), fontWeight: 700, textTransform: 'none' }}
          />
          <Tab
            label="Complete"
            sx={{ fontFamily: ['Josefin Sans', 'sans-serif'].join(','), fontWeight: 700, textTransform: 'none' }}
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default MenuTodo;
