import React from 'react';

import CollectionItem from './CollectionItem';
import { IShopCollection } from '../store/features/cart/types';

const CollectionPreview: React.FC<IShopCollection> = ({ title, items }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {items.filter((item, id) => id < 4).map(item =>
        <CollectionItem key={item.id} item={item} />
      )}
    </div>
  </div>
)


export default CollectionPreview;