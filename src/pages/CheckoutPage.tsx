import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../components/CheckoutItem';
import StripeButton from '../components/StripeButton';
import { selectCartItems, selectCartTotal } from '../store/features/cart/selectors';
import { ApplicationState } from '../store';
import { IShopCollectionItem } from '../store/features/cart/types';
import { onPaymentSuccess } from '../store/features/cart/actions';

interface CheckoutPageSelection {
  cartItems: Array<IShopCollectionItem>
  totalPrice: number
}

const mapStateToProps = createStructuredSelector<ApplicationState, CheckoutPageSelection>({
  cartItems: selectCartItems,
  totalPrice: selectCartTotal
})

const mapDispatchToProps = {
  onPaymentSuccess: onPaymentSuccess.request
}

type CheckoutPageProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, totalPrice, onPaymentSuccess }) => {
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
        cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
      }
      <div className='total'>
        <span>TOTAL: ${totalPrice}</span>
      </div>
      <div className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 / Exp: Any future date / CVC: Any 3 digits
      </div>
      <StripeButton price={totalPrice} successCallback={onPaymentSuccess} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);