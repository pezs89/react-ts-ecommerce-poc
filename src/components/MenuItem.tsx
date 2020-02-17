import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IMenuItem } from '../store/features/directory/types';

type MenuItemProps = IMenuItem & RouteComponentProps;

const MenuItem: React.FC<MenuItemProps> = ({ title, imageUrl, size, linkUrl, history, match }: MenuItemProps): JSX.Element => {
  return (
    <div className={`menu-item ${size ? `menu-item--${size}` : ''}`} onClick={() => history.push(`${match.url}/${linkUrl}`)}>
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

export default withRouter(MenuItem);