import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../assets/svg/shopping-bag.svg';
import { toggleCartHidden } from '../store/features/cart/actions';
import { ApplicationState } from '../store';
import { selectCartItemsCount } from '../store/features/cart/selectors';
import { createStructuredSelector } from 'reselect';

interface CartIconSelection {
  itemCount: number;
}

const mapDispatchToProps = {
  toggleCartHidden
}

const mapStateToProps = createStructuredSelector<ApplicationState, CartIconSelection>({
  itemCount: selectCartItemsCount
})

type CartIconProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CartIcon: React.FC<CartIconProps> = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);