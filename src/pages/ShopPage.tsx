import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../containers/CollectionsOverviewContainer';
import CollectionContainer from '../containers/CollectionContainer';
import { fetchShopDataAsync } from '../store/features/shop/actions';

const mapDispatchToProps = {
  fetchShopData: fetchShopDataAsync.request
}

type ShopPageProps = typeof mapDispatchToProps & RouteComponentProps;

class ShopPage extends Component<ShopPageProps> {
  componentDidMount() {
    const { fetchShopData } = this.props;
    fetchShopData()
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ShopPage);