import React from 'react';
import { IShopItem } from '../store/features/cart/types';

const CartItem: React.FC<IShopItem> = ({ imageUrl, price, name, quantity }) => (
  <div className='cart-item'>
    <img src={imageUrl} alt={name} />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>{quantity} x ${price}</span>
    </div>
  </div>
)

export default CartItem;