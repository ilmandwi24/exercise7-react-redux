import { Box, Grid, IconButton } from '@mui/material';

import { useDispatch } from 'react-redux';

import { useState } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MenuTodo from '@components/Todo/MenuTodo';
import Header from '@components/Todo/Header';
import { setTodo } from '@containers/App/actions';
import classes from './todo.module.scss';
import ListTodo from '@components/Todo/ListTodo';

const Todo = () => {
  const dispatch = useDispatch();

  const [inputTodo, setInputTodo] = useState('');
  const addTodo = () => {
    if (inputTodo === '') return;
    dispatch(setTodo(inputTodo));
    setInputTodo('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputTodo === '') return;
      dispatch(setTodo(inputTodo));
      setInputTodo('');
    }
  };

  return (
    <div className={classes.wrapper}>
      <Box sx={{ flexGrow: 1 }} className={classes.container}>
        <Grid container spacing={2}>
          {/* Header */}
          <Header />
          {/* Feature Input Todo */}
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: 'var(--main-component)',
                display: 'flex',
                padding: '3px 7.05px',
                alignItems: 'center',
                borderRadius: 1.5,
                boxShadow: 2,
              }}
            >
              <Box>
                <IconButton onClick={addTodo}>
                  <RadioButtonUncheckedIcon
                    sx={{
                      fontSize: 25,
                      color: 'var(--circle-icon)',
                    }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <input
                  type="text"
                  placeholder="Create a new todo"
                  className={classes.inputText}
                  value={inputTodo}
                  onChange={(e) => setInputTodo(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Box>
            </Box>
          </Grid>
          {/* Feature List Todo */}
          <Grid item xs={12}>
            {/* list todo */}
            <ListTodo />
          </Grid>
          {/* Feature Menu */}
          <Grid item xs={12} className={classes.menuDesktop}>
            <MenuTodo />
          </Grid>
          {/* Footer */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: 'none', mt: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexGrow: 1,
                  typography: 'body1',
                  color: 'var(--credit)',
                  fontWeight: 700,
                }}
              >
                Drag and drop to reorder list
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Todo;
