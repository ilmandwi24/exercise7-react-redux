import { Box, Button, Checkbox, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { connect, useDispatch } from 'react-redux';
import { checkedTodo, clearCompleteTodo, delTodo } from '@containers/App/actions';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { selectTodo, selectFilter } from '@containers/App/selectors';

import { createStructuredSelector } from 'reselect';
import classes from '../../pages/Todo/todo.module.scss';
import MenuTodo from './MenuTodo';

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
const ListTodo = ({ todos, filter }) => {
  const dispatch = useDispatch();

  const handleChange = (id) => {
    // console.log(id)
    dispatch(checkedTodo(id));
  };

  const deleteTodo = (id) => {
    dispatch(delTodo(id));
  };

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
    console.log(todos);
    setJumlahIem(filteredTodos.length);
  }, [filteredTodos]);

  console.log('a');
  return (
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
  );
};

ListTodo.propTypes = {
  todos: PropTypes.array,
  filter: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  todos: selectTodo,
  filter: selectFilter,
});

export default connect(mapStateToProps)(ListTodo);
