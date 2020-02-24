import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../assets/svg/shopping-bag.svg';
import { toggleCartHidden } from '../store/features/cart/actions';

const mapDispatchToProps = {
  toggleCartHidden
}

type CartIconProps = typeof mapDispatchToProps;

const CartIcon: React.FC<CartIconProps> = ({ toggleCartHidden }) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CartIcon);