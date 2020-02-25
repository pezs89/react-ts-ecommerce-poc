import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../assets/svg/shopping-bag.svg';
import { toggleCartHidden } from '../store/features/cart/actions';
import { ApplicationState } from '../store';
import { selectCartItemsCount } from '../store/features/cart/selectors';

const mapDispatchToProps = {
  toggleCartHidden
}

const mapStateToProps = (state: ApplicationState) => ({
  itemCount: selectCartItemsCount(state)
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