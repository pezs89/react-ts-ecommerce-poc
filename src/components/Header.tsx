import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { auth } from '../firebase/firebase.utils';
import { ReactComponent as Logo } from '../assets/svg/crown.svg';
import { ApplicationState } from '../store';
import CartIcon from './CartIcon';
import CartDropDown from './CartDropdown';

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }: ApplicationState) => ({
  currentUser,
  hidden
});

type HeaderProps = ReturnType<typeof mapStateToProps>;

const Header: React.FC<HeaderProps> = ({ currentUser, hidden }) => {
  return (
    <header className='header'>
      <Link to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {
          currentUser ?
            <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
            :
            <Link className='option' to='/signin'>SIGN IN</Link>
        }
        <CartIcon />
      </div>
      {hidden ?
        null
        :
        <CartDropDown />
      }
    </header>
  )
}

export default connect(mapStateToProps)(Header);