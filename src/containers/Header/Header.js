import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { toggleLogin, loadFavorites } from '../../actions';
import { fetchFavoriteData } from '../../utils/fetchFavoriteData';
import './Header.css';

export const Header = props => {
  const handleClick = async () => {
    const favoritesArray = await fetchFavoriteData(props.userId);

    props.loadFavorites(favoritesArray);
  };

  const showDefaultState = (
    <div className="userControls">
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <NavLink to="/signup">
        <button>Sign Up</button>
      </NavLink>
    </div>
  );

  const showLoggedInState = (
    <div className="userControls">
      <NavLink to="/">
        <button className="logOut" onClick={props.toggleLogin}>
          Log Out
        </button>
      </NavLink>
      <NavLink to="/favorites">
        <button className="favorites" onClick={handleClick}>
          Favorites
        </button>
      </NavLink>
      <p>Welcome back, {props.name}</p>
    </div>
  );

  return (
    <header>
      <NavLink to="/">
        <img
          src="https://fontmeme.com/permalink/180520/17ff7fa8ddbb9659c011cbf5dacff735.png"
          alt="movie-tracker logo"
          className="headerLogo"
        />
      </NavLink>
      {props.loggedIn ? showLoggedInState : showDefaultState}
    </header>
  );
};

export const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  name: state.user.name,
  userId: state.user.id
});

export const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin()),
  loadFavorites: favoritesArray => dispatch(loadFavorites(favoritesArray))
});

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  userId: PropTypes.number,
  toggleLogin: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
