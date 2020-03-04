import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'


import { selectIsCollectionLoaded } from '../store/features/shop/selector';
import withLoading from '../components/WithLoading';
import CollectionPage from '../pages/CollectionPage';
import { ApplicationState } from '../store';


interface CollectionContainerSelection {
  isLoading: boolean
}

const mapStateToProps = createStructuredSelector<ApplicationState, CollectionContainerSelection>({
  isLoading: (state) => !selectIsCollectionLoaded(state)
})

type CollectionContainerProps = ReturnType<typeof mapStateToProps>;

const CollectionContainer = compose<React.FC<CollectionContainerProps>>(
  connect(mapStateToProps),
  withLoading
)(CollectionPage)

export default CollectionContainer;