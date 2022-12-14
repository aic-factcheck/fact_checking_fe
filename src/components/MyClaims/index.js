import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, List,
} from 'antd';

import { useRecoilValue, useRecoilState } from 'recoil';

import authAtom from '../../_state/auth';
import myClaims from '../../_state/usersClaims';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Claim from '../claim';

const { Content } = Layout;

export default function MyClaims() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const allowEdit = true;

  const [myClaimsList, setMyClaimsList] = useRecoilState(myClaims);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;

    if (!myClaimsList) {
      if (id) {
        fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/claims`).then((res) => {
          const claims = res.filter((el) => id === el?.addedBy._id);
          console.log('');
          setMyClaimsList(claims);
        }).catch(console.log(''));
      }
    }
  }, [auth, navigate, myClaimsList, setMyClaimsList]);

  return (
    <Content className="site-layout" style={{ paddingLeft: '0%', padding: '1%' }}>
      <List
        style={{
          padding: '1%',
        }}
      >
        {
          // _id, priority, addedBy, articleId, text
          myClaimsList?.map((obj, index) => (
            <div key={obj?._id} style={{ margin: '1%', background: 'white', borderRadius: '10px' }}>
              <Claim
                claim={obj}
                index={index}
                isEditable={allowEdit}
              />
            </div>
          ))
        }
      </List>
    </Content>
  );
}
