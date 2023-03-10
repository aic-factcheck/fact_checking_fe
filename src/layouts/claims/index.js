import React, { useEffect, useState } from 'react';
import { List, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Claim from '../../components/claim';
import MyTitle from '../../components/MyTitle';

const { Content } = Layout;

export default function ClaimPages() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fetchWrapper = useFetchWrapper();
  const [claimsList, setClaimsList] = useState([]);
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/hot/claims`).then((res) => setClaimsList(res)).catch(console.log(''));
    }
  }, [auth, navigate]);

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <List
        style={{
          padding: '0% 1% 1% 1%',
        }}
      >
        <MyTitle headline={t('hot_claims')} fontcolor="#d86e3d" />
        {
          claimsList.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Claim claim={obj} isEditable={allowEdit} setMyClaimsList={setClaimsList} /></div>)
        }
      </List>
    </Content>
  );
}
