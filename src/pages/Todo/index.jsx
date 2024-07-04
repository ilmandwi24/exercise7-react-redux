import { Box, Button, Checkbox, Grid, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';

import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { checkedTodo, clearCompleteTodo, delTodo, setTodo } from '@containers/App/actions';
import { selectTodo, selectFilter } from '@containers/App/selectors';
import { useEffect, useState } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MenuTodo from '@components/Todo/MenuTodo';
import Header from '@components/Todo/Header';
import classes from './todo.module.scss';

const Checked = () => (
  <div
    style={{
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, hsl(280, 87%, 65%), hsl(200, 87%, 65%))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
    </svg>
  </div>
);
const Todo = ({ todos, filter }) => {
  const dispatch = useDispatch();

  const handleChange = (id) => {
    // console.log(id)
    dispatch(checkedTodo(id));
  };
  const [inputTodo, setInputTodo] = useState('');
  const [jumlahItem, setJumlahIem] = useState('');
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'ALL') {
      return true;
    }
    if (filter === 'CHECKED') {
      return todo.checked;
    }
    if (filter === 'UNCHECKED') {
      return !todo.checked;
    }
    return true;
  });

  useEffect(() => {
    // console.log(todos);
    setJumlahIem(filteredTodos.length);
  }, [filteredTodos]);

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

  const deleteTodo = (id) => {
    dispatch(delTodo(id));
  };

  return (
    <div className={classes.wrapper}>
      <Box sx={{ flexGrow: 1 }} className={classes.container}>
        {/* <button onClick={addNewTodo} type="button">
              Click
            </button> */}
        {/* {todo.map((t) => t)} */}
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
            <Box
              sx={{
                my: 0.7,
                backgroundColor: 'var(--main-component)',
                display: 'flex',
                padding: '2px 7px',
                alignItems: 'center',
                borderRadius: 1.5,
                flexDirection: 'column',
                flexGrow: 1,
                boxShadow: 2,
              }}
            >
              {filteredTodos.length !== 0 &&
                filteredTodos.map((todo, index) => (
                  <Box
                    sx={{
                      width: '100%',
                      // backgroundColor: 'blue',
                      display: 'flex',
                      padding: '2px 7px',
                      alignItems: 'center',
                      // borderRadius: 1,
                      borderBottom: 1,
                      borderColor: 'var(--line-divider)',
                    }}
                    key={index}
                  >
                    <Box>
                      <Checkbox
                        checked={todo.checked}
                        onChange={() => handleChange(todo.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<Checked />}
                        sx={{
                          '&.Mui-checked': {
                            color: 'hsl(280, 87%, 65%)',
                          },
                          '& .MuiSvgIcon-root': { fontSize: 25, color: 'var(--circle-icon)' },
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: 1, alignItem: 'flex-start' }}>
                      <div className={classes.note}>
                        <span className={todo.checked ? classes.checked : null}>{todo.todo}</span>
                      </div>
                    </Box>
                    <Box>
                      <IconButton onClick={() => deleteTodo(todo.id)}>
                        <ClearIcon
                          sx={{
                            fontSize: 25,
                            color: 'var(--delete-icon)',
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              {/* status list note */}
              <Box
                sx={{
                  width: '100%',
                  // backgroundColor: 'blue',
                  display: 'flex',
                  padding: '0 10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // borderRadius: 1,
                  color: 'var(  --font-footer-list)',
                }}
              >
                <Box sx={{ margin: '10px' }}>{jumlahItem} items left</Box>
                <Box className={classes.menuMobile}>
                  <MenuTodo />
                </Box>
                <Box sx={{ margin: '0 10px' }}>
                  <Button
                    onClick={() => dispatch(clearCompleteTodo())}
                    sx={{
                      fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
                      fontWeight: 400,
                      color: 'var(  --font-footer-list)',
                      '&:hover': {
                        background: 'none',
                      },
                      p: 0,
                      mt: 0.5,
                      textTransform: 'none',
                    }}
                  >
                    Clear Completed{' '}
                  </Button>
                </Box>
              </Box>
            </Box>
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
Todo.propTypes = {
  todos: PropTypes.array,
  filter: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  todos: selectTodo,
  filter: selectFilter,
});

export default connect(mapStateToProps)(Todo);
