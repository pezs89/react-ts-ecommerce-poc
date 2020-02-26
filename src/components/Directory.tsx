import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from './MenuItem';
import { selectDirectorySections } from '../store/features/directory/selectors';
import { ApplicationState } from '../store';
import { IMenuItem } from '../store/features/directory/types';

interface DirectorySelection {
  sections: Array<IMenuItem>
}

const mapStateToProps = createStructuredSelector<ApplicationState, DirectorySelection>({
  sections: selectDirectorySections
})

type DirectoryProps = ReturnType<typeof mapStateToProps>

const Directory: React.FC<DirectoryProps> = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(item => <MenuItem key={item.id} {...item} />)}
  </div>
)


export default connect(mapStateToProps)(Directory);