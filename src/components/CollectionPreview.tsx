import React from 'react';
import { IShopItems } from '../store/features/directory/types';
import CollectionItem from './CollectionItem';

const CollectionPreview: React.FC<IShopItems> = ({ title, items }: IShopItems) => {
  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <div className='preview'>
        {items.filter((item, id) => id < 4).map(item =>
          <CollectionItem key={item.id} {...item} />
        )}
      </div>
    </div>
  )
}

export default CollectionPreview;