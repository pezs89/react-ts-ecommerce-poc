import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from './CollectionPreview';
import { ApplicationState } from '../store';
import { IShopItems } from '../store/features/cart/types';
import { selectCollections } from '../store/features/shop/selector';

interface ShopPageSelection {
  collections: IShopItems
}

const mapStateToProps = createStructuredSelector<ApplicationState, ShopPageSelection>({
  collections: selectCollections
})

type CollectionOverviewProps = ReturnType<typeof mapStateToProps>

const CollectionOverview: React.FC<CollectionOverviewProps> = ({ collections }) => (
  <div className='collections-overview'>
    {Object.keys(collections).map(key => <CollectionPreview key={collections[key].id} {...collections[key]} />)}
  </div>
)

export default connect(mapStateToProps)(CollectionOverview);