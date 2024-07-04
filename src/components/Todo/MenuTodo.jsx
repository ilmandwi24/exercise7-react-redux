import { setFilter } from '@containers/App/actions';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    <Grid item xs={12}>
      <Box
        sx={{
          backgroundColor: 'var(--main-component)',
          display: 'flex',
          padding: '0 7px',
          alignItems: 'center',
          borderRadius: 1.5,
          boxShadow: 2,
          color: 'red !important',
        }}
      >
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
    </Grid>
  );
};

export default MenuTodo;
