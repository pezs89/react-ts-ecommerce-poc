import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Unsubscribe } from 'firebase';

import CollectionsOverviewContainer from '../containers/CollectionsOverviewContainer';
import CollectionContainer from '../containers/CollectionContainer';
import { firestore, converCollectionsSnapshotToMap, ICollectionSnapshotData } from '../firebase/firebase.utils';
import { loadShopData } from '../store/features/shop/actions';

const mapDispatchToProps = {
  loadShopData
}

type ShopPageProps = typeof mapDispatchToProps & RouteComponentProps;

class ShopPage extends Component<ShopPageProps> {
  unsubscribeFromSnapshot: Unsubscribe | null = null;

  componentDidMount() {
    const { loadShopData } = this.props;
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapShot => {
      const collectionsMap = converCollectionsSnapshotToMap(snapShot as firebase.firestore.QuerySnapshot<ICollectionSnapshotData>);
      loadShopData(collectionsMap)
    })
  }

  componentWillUnmount() {
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
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