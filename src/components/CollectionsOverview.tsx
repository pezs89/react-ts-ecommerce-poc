import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from './CollectionPreview';
import { ApplicationState } from '../store';
import { IShopCollection } from '../store/features/cart/types';
import { selectCollectionsForPreview } from '../store/features/shop/selector';

interface ShopPageSelection {
  collections: Array<IShopCollection>
}

const mapStateToProps = createStructuredSelector<ApplicationState, ShopPageSelection>({
  collections: selectCollectionsForPreview
})

type CollectionOverviewProps = ReturnType<typeof mapStateToProps>

const CollectionOverview: React.FC<CollectionOverviewProps> = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(collectionItem => <CollectionPreview key={collectionItem.id} {...collectionItem} />)}
  </div>
)

export default connect(mapStateToProps)(CollectionOverview);