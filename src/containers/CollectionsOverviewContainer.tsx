import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'

import { selectIsCollectionLoading } from '../store/features/shop/selector';
import withLoading from '../components/WithLoading';
import CollectionsOverview from '../components/CollectionsOverview';
import { ApplicationState } from '../store';

interface CollectionsOverviewContainerSelection {
  isLoading: boolean
}

const mapStateToProps = createStructuredSelector<ApplicationState, CollectionsOverviewContainerSelection>({
  isLoading: selectIsCollectionLoading
})

type CollectionsOverviewContainerProps = ReturnType<typeof mapStateToProps>;

const CollectionsOverviewContainer = compose<React.FC<CollectionsOverviewContainerProps>>(
  connect(mapStateToProps),
  withLoading
)(CollectionsOverview)

export default CollectionsOverviewContainer;
