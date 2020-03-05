import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CartIcon from './CartIcon';
import CartDropDown from './CartDropdown';
import { ReactComponent as Logo } from '../assets/svg/crown.svg';
import { ApplicationState } from '../store';
import { selectCartHidden } from '../store/features/cart/selectors';
import { selectCurrentUser } from '../store/features/user/selectors';
import { IUser } from '../store/features/user/types';
import { signOutAsync } from '../store/features/user/actions';

interface HeaderSelection {
  currentUser: IUser | null
  hidden: boolean
};

const mapStateToProps = createStructuredSelector<ApplicationState, HeaderSelection>({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = {
  signOutRequest: signOutAsync.request
}

type HeaderProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Header: React.FC<HeaderProps> = ({ currentUser, hidden, signOutRequest }) => {
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
            <div className='option' onClick={() => signOutRequest()}>SIGN OUT</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);