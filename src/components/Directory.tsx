import React from 'react';
import MenuItem from './MenuItem';
import SECTIONS_DATA from '../mock/sections.data';

const Directory = () => {
  const data = SECTIONS_DATA;
  return (
    <div className="directory-menu">
      {data.map(item => <MenuItem key={item.id} {...item} />)}
    </div>
  )
}

export default Directory;