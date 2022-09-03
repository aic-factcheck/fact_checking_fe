import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

import { useRecoilValue } from 'recoil';

import authAtom from '../../../_state/auth';
// import useUserActions from '../../../_actions/user.actions';

const { Content } = Layout;

export default function SignUp() {
  const auth = useRecoilValue(authAtom);
  // const userActions = useUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) {
      // history.push('/');
      // window.location.reload(false);
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        Sign upppp
      </div>
    </Content>
  );
}
