import React, { useEffect, useState } from 'react';
import {
  List, Layout, Row, Col, Input,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import Claim from '../../components/claim';
import MyTitle from '../../components/MyTitle';
import { IClaim } from '../../common/types';
import claimsService from '../../api/claims.service';

const { Content } = Layout;
const { Search } = Input;

const ClaimPages: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [claimsList, setClaimsList] = useState([]);
  const [loadedClaimsList, setLoadedClaimsList] = useState([]);
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    claimsService.getClaimsList().then((res: any) => {
      setClaimsList(res.data);
      setLoadedClaimsList(res.data);
    }).catch();
  }, [auth, navigate]);

  const onSearch = (pattern: string) => {
    // eslint-disable-next-line max-len
    if (pattern.length > 3) {
      // eslint-disable-next-line max-len
      claimsService.queryClaim(pattern).then((res: any) => setClaimsList(res.data)).catch();
    } else {
      setClaimsList(loadedClaimsList);
    }
  };

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <List
        style={{
          padding: '0% 1% 1% 1%',
        }}
      >
        <Row justify="space-between" align="bottom">
          <Col span={24}>
            <MyTitle headline={t('hot_claims')} fontcolor="#d86e3d" />
          </Col>
        </Row>
        <Row justify="space-between" align="bottom" style={{ marginBottom: '2%' }}>
          <Col span={24}>
            <Search placeholder={t('search_claim')} onSearch={onSearch} />
          </Col>
        </Row>
        {
          claimsList.sort((a: IClaim, b: IClaim) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj: IClaim, index: number) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Claim claim={obj} isEditable={allowEdit} index={index} /></div>)
        }
      </List>
    </Content>
  );
};

export default ClaimPages;
