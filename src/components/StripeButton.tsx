import React from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import Button from './Button';

type StripeButtonProps = {
  price: number
}

const StripeButton: React.FC<StripeButtonProps> = ({ price }) => {
  const priceForStripe = price * 100;
  const publishKey = 'pk_test_hoKes8XtktCPixQsR5IYRsa3004CKd0jCQ';

  const onToken = (token: Token) => alert('Payment Succesful' + JSON.stringify(token))

  return (
    <StripeCheckout
      label='Pay Now'
      currency='USD'
      name='Ecommerce poc'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishKey}
    >
      <Button label='Pay Now' />
    </StripeCheckout>
  )
}

export default StripeButton;