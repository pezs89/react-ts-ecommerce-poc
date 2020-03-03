import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Unsubscribe } from 'firebase';

import CollectionsOverview from '../components/CollectionsOverview';
import withLoading from '../components/WithLoading';
import CollectionPage from './CollectionPage';
import { firestore, converCollectionsSnapshotToMap, ICollectionSnapshotData } from '../firebase/firebase.utils';
import { loadShopData } from '../store/features/shop/actions';

const mapDispatchToProps = {
  loadShopData
}

type ShopPageProps = typeof mapDispatchToProps & RouteComponentProps;

type ShopPageState = {
  loading: boolean
}

const WrappedCollectionsOverview = withLoading(CollectionsOverview);
const WrappedCollectionPage = withLoading(CollectionPage);

class ShopPage extends Component<ShopPageProps, ShopPageState> {
  unsubscribeFromSnapshot: Unsubscribe | null = null;
  state = { loading: true }

  componentDidMount() {
    const { loadShopData } = this.props;
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapShot => {
      const collectionsMap = converCollectionsSnapshotToMap(snapShot as firebase.firestore.QuerySnapshot<ICollectionSnapshotData>);
      loadShopData(collectionsMap)
      this.setState({ loading: false })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <WrappedCollectionsOverview isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <WrappedCollectionPage isLoading={loading} {...props} />} />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ShopPage);