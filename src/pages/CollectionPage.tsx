import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { selectCollection } from '../store/features/shop/selector';
import CollectionItem from '../components/CollectionItem';

const mapStateToProps = (state: ApplicationState, { match }: RouteComponentProps<{ collectionId: string }>) => ({
  collection: selectCollection(match.params.collectionId)(state)
})

type CollectionPageProps = ReturnType<typeof mapStateToProps> & RouteComponentProps<{ collectionId: string }>;

const CollectionPage: React.FC<CollectionPageProps> = ({ collection, match }) => {
  if (!collection) {
    return null
  }
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => <CollectionItem key={item.id} item={item} />)}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(CollectionPage);