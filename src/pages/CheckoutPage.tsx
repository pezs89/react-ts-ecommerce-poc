import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../store/features/cart/selectors';
import { ApplicationState } from '../store';
import { IShopItem } from '../store/features/cart/types';
import CheckoutItem from '../components/CheckoutItem';

interface CheckoutPageSelection {
  cartItems: IShopItem[]
  totalPrice: number
}

const mapStateToProps = createStructuredSelector<ApplicationState, CheckoutPageSelection>({
  cartItems: selectCartItems,
  totalPrice: selectCartTotal
})

type CheckoutPageProps = ReturnType<typeof mapStateToProps>;

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, totalPrice }) => {
  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span className=''>Product</span>
        </div>
        <div className='header-block'>
          <span className=''>Description</span>
        </div>
        <div className='header-block'>
          <span className=''>Quantity</span>
        </div>
        <div className='header-block'>
          <span className=''>Price</span>
        </div>
        <div className='header-block'>
          <span className=''>Remove</span>
        </div>
      </div>
      {
        cartItems.map(cartItem => <CheckoutItem key={cartItem.id} {...cartItem} />)
      }
      <div className='total'>
        <span>TOTAL: ${totalPrice}</span>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(CheckoutPage);