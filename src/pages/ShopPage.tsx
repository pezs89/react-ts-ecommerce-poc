import React, { useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../containers/CollectionsOverviewContainer';
import CollectionContainer from '../containers/CollectionContainer';
import { fetchShopDataAsync } from '../store/features/shop/actions';

const mapDispatchToProps = {
  fetchShopData: fetchShopDataAsync.request
}

type ShopPageProps = typeof mapDispatchToProps & RouteComponentProps;

const ShopPage: React.FC<ShopPageProps> = ({ match, fetchShopData }) => {
  useEffect(() => {
    fetchShopData()
  }, [fetchShopData])

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
    </div>
  )
}


export default connect(null, mapDispatchToProps)(ShopPage);