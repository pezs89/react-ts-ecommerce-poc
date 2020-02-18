import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/svg/crown.svg';

const Header = () => {
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
      </div>
    </header>
  )
}

export default Header;