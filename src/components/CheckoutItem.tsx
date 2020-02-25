import React from 'react';
import { connect } from 'react-redux';

import { IoMdClose } from 'react-icons/io';
import { IShopItem } from '../store/features/cart/types';
import { clearItemFromCart } from '../store/features/cart/actions';

const mapDispatchToProps = {
  clearItemFromCart
}

type CheckoutItemProps = IShopItem & typeof mapDispatchToProps;

const CheckoutItem: React.FC<CheckoutItemProps> = ({ id, name, imageUrl, price, quantity, clearItemFromCart }) => {
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img alt='item' src={imageUrl} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>{quantity}</span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart(id)}>
        <IoMdClose />
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CheckoutItem);