import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { hideNotification } from '../store/features/notification/actions';
import { NotificationTypes } from '../store/features/notification/types';

const mapStateToProps = ({ notifications }: ApplicationState) => ({
  type: notifications.type,
  message: notifications.message
});

const mapDispatchToProp = {
  hideNotification
};

type NotificationProps = typeof mapDispatchToProp & ReturnType<typeof mapStateToProps>;

const Notify: React.FC<NotificationProps> = ({ hideNotification, type, message }: NotificationProps): JSX.Element | null => {
  const el = document.querySelector('#notification');
  if (el && type) {
    const timeout = setTimeout(() => {
      hideNotification();
      clearTimeout(timeout);
    }, 5000);

    const getExtraClassByType = (type: NotificationTypes): string => {
      switch (type) {
        case NotificationTypes.SUCCESS:
          return 'notification--success';
        case NotificationTypes.ERROR:
          return 'notification--error'
        default:
          return 'notification--notify';
      }
    }

    return ReactDOM.createPortal(
      <div className={`notification ${getExtraClassByType(type)}`}>
        {message}
      </div>
      ,
      el
    );
  }
  return null;
}

export default connect(mapStateToProps, mapDispatchToProp)(Notify);