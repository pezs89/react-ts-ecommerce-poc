import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../components/CollectionPreview';
import { selectShopItems } from '../store/features/shop/selector';
import { IShopItems } from '../store/features/cart/types';
import { ApplicationState } from '../store';

interface ShopPageSelection {
  shopItems: IShopItems[]
}

const mapStateToProps = createStructuredSelector<ApplicationState, ShopPageSelection>({
  shopItems: selectShopItems
})

type ShopPageProps = ReturnType<typeof mapStateToProps>

const ShopPage: React.FC<ShopPageProps> = ({ shopItems }) => (
  <div className='shop-page'>
    {shopItems.map(shopItem => <CollectionPreview key={shopItem.id} {...shopItem} />)}
  </div>
)

export default connect(mapStateToProps)(ShopPage);