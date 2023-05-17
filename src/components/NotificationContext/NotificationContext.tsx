import { createContext } from 'react';
import NotificationInstance from 'antd/lib/notification';

// eslint-disable-next-line import/prefer-default-export
export const NotificationContext = createContext<typeof NotificationInstance | any >({});
