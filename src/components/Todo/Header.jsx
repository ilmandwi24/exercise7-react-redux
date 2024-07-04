import { Box, Grid, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { selectTheme } from '@containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { setTheme } from '@containers/App/actions';

const Header = ({ theme }) => {
  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          letterSpacing: 7,
          color: 'white',
        }}
      >
        <h1>TODO</h1>
        <h1>
          <IconButton onClick={handleTheme}>
            {theme === 'light' ? (
              // <NightsStayIcon sx={iconStyle} />
              <DarkModeIcon sx={{ fontSize: 30, marginTop: -0.62 }} htmlColor="#f7fffd" />
            ) : (
              // <LightModeIcon sx={iconStyle} htmlColor="#fae6be" />
              <LightModeIcon sx={{ fontSize: 30, marginTop: -0.62 }} />
            )}
          </IconButton>
        </h1>
      </Box>
    </Grid>
  );
};

Header.propTypes = {
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
});

export default connect(mapStateToProps)(Header);
