import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Button from './Button';
import CartItem from './CartItem';
import { ApplicationState } from '../store';
import { selectCartItems } from '../store/features/cart/selectors';
import { IShopCollectionItem } from '../store/features/cart/types';
import { toggleCartHidden } from '../store/features/cart/actions';

interface CartDropDownSelection {
  items: Array<IShopCollectionItem>
}

const mapStateToProps = createStructuredSelector<ApplicationState, CartDropDownSelection>({
  items: selectCartItems
})

type CartDropDownProps = ReturnType<typeof mapStateToProps> & RouteComponentProps & DispatchProp;

const CartDropDown: React.FC<CartDropDownProps> = ({ items, history, dispatch }) => {
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
      <Button
        type='button'
        label='CHECKOUT'
        callback={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden())
        }}
      />
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(CartDropDown));