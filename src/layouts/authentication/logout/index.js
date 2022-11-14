import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import useUserActions from '../../../_actions/user.actions';

export default function Logout() {
  const userActions = useUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    userActions.logout();
    navigate('/sign-in');
  }, [userActions]);

  return (<Spin />);
}
