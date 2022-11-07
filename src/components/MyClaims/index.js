import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, List,
} from 'antd';

import { useRecoilValue } from 'recoil';

import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Claim from '../claim';

const { Content } = Layout;

export default function MyClaims() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [claimsList, setClaimsList] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/');
    }
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/claims`).then((res) => setClaimsList(res)).catch(console.log('api error'));
  }, [auth, navigate]);

  return (
    <Content className="site-layout" style={{ paddingLeft: '0%', padding: '1%' }}>
      <List
        style={{
          padding: '1%',
        }}
      >
        {
          claimsList.map((obj) => <div key={obj._id} style={{ padding: '1%', background: '#77A6F7' }}><Claim article={obj} /></div>)
        }
      </List>
    </Content>
  );
}
