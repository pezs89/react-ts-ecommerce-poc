import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { IShopItem } from '../store/features/cart/types';

const CheckoutItem: React.FC<IShopItem> = ({ name, imageUrl, price, quantity }) => {
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img alt='item' src={imageUrl} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>{quantity}</span>
      <span className='price'>{price}</span>
      <div className='remove-button'>
        <IoMdClose />
      </div>
    </div>
  )
}

export default CheckoutItem;