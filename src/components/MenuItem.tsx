import React from 'react';
import { IMenuItem } from '../store/features/directory/types';

const MenuItem: React.FC<IMenuItem> = ({ id, title, imageUrl, linkUrl, size }: IMenuItem): JSX.Element => {
  return (
    <div className={`menu-item ${size ? `menu-item--${size}` : ''}`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}>
      </div>
      <div className="content">
        <h1 className="title">
          {title}
        </h1>
        <span className="subtitle">
          Shop now
        </span>
      </div>
    </div>
  )
}

export default MenuItem;