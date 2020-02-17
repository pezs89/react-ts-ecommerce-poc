import React, { Component } from 'react';
import SHOP_DATA from '../mock/shop.data';
import CollectionPreview from '../components/CollectionPreview';

class ShopPage extends Component {
  state = { collections: SHOP_DATA };

  render() {
    const { collections } = this.state;
    return (
      <div className='shop-page'>
        {collections.map(collection => <CollectionPreview key={collection.id} {...collection} />)}
      </div>
    )
  }
}

export default ShopPage;