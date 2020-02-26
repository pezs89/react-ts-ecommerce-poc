import React from 'react';
import { connect } from 'react-redux';

import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IShopItem } from '../store/features/cart/types';
import { clearItemFromCart, removeItemFromCart, addToCart } from '../store/features/cart/actions';

interface ICheckoutItem {
  cartItem: IShopItem;
}

const mapDispatchToProps = {
  clearItemFromCart,
  removeItemFromCart,
  addToCart
}

type CheckoutItemProps = ICheckoutItem & typeof mapDispatchToProps;

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem, clearItemFromCart, removeItemFromCart, addToCart }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img alt='item' src={imageUrl} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow'>
          <IoIosArrowBack onClick={() => removeItemFromCart(id)} />
        </div>
        <span className='value'>
          {quantity}
        </span>
        <div className='arrow'>
          <IoIosArrowForward onClick={() => addToCart(cartItem)} />
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart(id)}>
        <IoMdClose />
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CheckoutItem);