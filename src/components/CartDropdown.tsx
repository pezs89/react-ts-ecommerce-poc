import React from 'react';

import Button from './Button';

const CartDropDown = () => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'></div>
      <Button type='button' label='CHECKOUT' />
    </div>
  )
}

export default CartDropDown;