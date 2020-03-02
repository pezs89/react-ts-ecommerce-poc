import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import CollectionsOverview from '../components/CollectionsOverview';
import CollectionPage from './CollectionPage';
import { firestore, converCollectionsSnapshotToMap, ICollectionSnapshotData } from '../firebase/firebase.utils';
import { loadShopData } from '../store/features/shop/actions';

const mapStateToProps = {
  loadShopData
}

class ShopPage extends Component<RouteComponentProps> {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(snapShot => {
      const collectionsMap = converCollectionsSnapshotToMap(snapShot as firebase.firestore.QuerySnapshot<ICollectionSnapshotData>);
      LoadShopData(collectionsMap)
    })
  }

  render() {
    const { match } = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    )
  }
}

export default ShopPage;