import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Button from './Button';
import CartItem from './CartItem';
import { ApplicationState } from '../store';
import { selectCartItems } from '../store/features/cart/selectors';
import { IShopItem } from '../store/features/cart/types';

interface CartDropDownSelection {
  items: Array<IShopItem>
}

const mapStateToProps = createStructuredSelector<ApplicationState, CartDropDownSelection>({
  items: selectCartItems
})

type CartDropDownProps = ReturnType<typeof mapStateToProps> & RouteComponentProps;

const CartDropDown: React.FC<CartDropDownProps> = ({ items, history }) => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {
          items.length ?
            items.map(cartItem => <CartItem key={cartItem.id} {...cartItem} />)
            :
            <span className='empty-message'>Your cart is empty</span>
        }
      </div>
      <Button type='button' label='CHECKOUT' callback={() => history.push('/checkout')} />
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(CartDropDown));