import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, List,
} from 'antd';

import { useRecoilValue, useRecoilState } from 'recoil';

import authAtom from '../../_state/auth';
import myClaims from '../../_state/usersClaims';
import Claim from '../claim';
import { IClaim } from '../../common/types';
import claimsService from '../../api/claims.service';
import claimsLoaded from '../../_state/claimsLoaded';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;

const MyClaims: React.FC = () =>  {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const allowEdit = true;
  const { t } = useTranslation();
  const [myClaimsList, setMyClaimsList] = useRecoilState<IClaim[]>(myClaims);
  const [loaded, setClaimsLoaded] = useRecoilState(claimsLoaded);

  useEffect(() => {
    const id = auth?.user?.id;
    // redirect to home if already logged in
    if (id == undefined) {
      navigate('/sign-in');
    }

    console.log(myClaimsList);

    if (myClaimsList.length < 1 && loaded == false) {
      claimsService.getMyClaims(id).then((res: any) => {
        //const claimsList = res.filter((el) => id === el?.addedBy._id);
        setMyClaimsList(res.data);
        setClaimsLoaded(true);
      }).catch();
      
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
          myClaimsList?.length > 0 ? (myClaimsList?.map((obj: IClaim, index: number) => (
            <div key={obj?._id} style={{ margin: '1%', background: 'white', borderRadius: '10px' }}>
              <Claim
                claim={obj}
                index={index}
                isEditable={allowEdit}
              />
            </div>
          ))) : <div className="emptyList" > {t('no_claims_yet')} </div>
        }
      </List>
    </Content>
  );
}

export default MyClaims;
