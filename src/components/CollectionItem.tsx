import React from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import { IShopCollectionItem } from '../store/features/cart/types';
import { addToCart } from '../store/features/cart/actions';
interface CollectionItem {
  item: IShopCollectionItem
}

const mapDispatchToProps = {
  addToCart
}

type CollectionItemProps = CollectionItem & typeof mapDispatchToProps;

const CollectionItem: React.FC<CollectionItemProps> = ({
  item,
  addToCart
}) => {
  const { name, price, imageUrl } = item;
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
      </div>
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button label='Add to cart' extraClass='inverted' callback={() => addToCart(item)} />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CollectionItem);