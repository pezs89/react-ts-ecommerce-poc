import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';
import { ReactComponent as Logo } from '../assets/svg/crown.svg';
import { ApplicationState } from '../store';

const mapStateToProps = ({ user }: ApplicationState) => ({
  currentUser: user.currentUser
});

type HeaderProps = ReturnType<typeof mapStateToProps>;

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
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
      </div>
    </header>
  )
}

export default connect(mapStateToProps)(Header);