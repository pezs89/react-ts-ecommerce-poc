import React from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import { ApplicationState } from '../store';
import CartItem from './CartItem';

const mapStateToProps = ({ cart: { items } }: ApplicationState) => ({
  items
})

type CartDropDownProps = ReturnType<typeof mapStateToProps>;

const CartDropDown: React.FC<CartDropDownProps> = ({ items }) => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {
          items.map(cartItem => <CartItem key={cartItem.id} {...cartItem} />)
        }
      </div>
      <Button type='button' label='CHECKOUT' />
    </div>
  )
}

export default connect(mapStateToProps)(CartDropDown);