/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import {
  List, Layout, Row, Col, Input, Divider, Skeleton,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import authAtom from '../../_state/auth';
import Claim from '../../components/claim';
import MyTitle from '../../components/MyTitle';
import { IClaim } from '../../common/types';
import claimsService from '../../api/claims.service';
import hotClaims from '../../_state/hotClaims';
import hotClaimsPage from '../../_state/hotClaimsPage';

const { Content } = Layout;
const { Search } = Input;

const ClaimPages: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [recoilHotClaimsList, setRecoilHotClaimsList] = useRecoilState(hotClaims);
  const [recoilHotClaimsPageNum, setRecoilHotClaimsPage] = useRecoilState(hotClaimsPage);
  const [claimsList, setClaimsList] = useState<IClaim[]>([]);

  const [loading, setLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [hasMoreData, setHasMoreData] = useState(true);

  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    if (recoilHotClaimsList.length > 0) {
      setClaimsList(Array.from(recoilHotClaimsList));
    } else {
      claimsService.getClaimsList(recoilHotClaimsPageNum).then((res: any) => {
        setRecoilHotClaimsList(Array.from(res.data));
        setRecoilHotClaimsPage(recoilHotClaimsPageNum + 1);
        setClaimsList(Array.from(res.data));
      }).catch();
    }
  }, [auth, navigate]);

  const onSearch = (pattern: string) => {
    // eslint-disable-next-line max-len
    if (pattern.length > 3) {
      setIsDefaultSearch(false);
      setSearchValue(pattern);
      setSearchPage(1);
      // eslint-disable-next-line max-len
      claimsService.queryClaim(pattern).then((res: any) => {
        setSearchPage((s) => s + 1);
        setClaimsList(res.data);
        if (res.data.length === 0) {
          setHasMoreData(false);
        }
      }).catch(() => {
        setSearchPage(1);
        setClaimsList(Array.from(recoilHotClaimsList));
      });
    } else {
      setClaimsList(Array.from(recoilHotClaimsList));
      setIsDefaultSearch(true);
      setHasMoreData(true);
    }
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (isDefaultSearch) {
      claimsService.getClaimsList(recoilHotClaimsPageNum).then((res: any) => {
        setRecoilHotClaimsPage(recoilHotClaimsPageNum + 1);
        setClaimsList([...recoilHotClaimsList, ...res.data]);
        setRecoilHotClaimsList([...recoilHotClaimsList, ...res.data]);
        setLoading(false);
        if (res.data.length === 0) {
          setHasMoreData(false);
        }
        window.dispatchEvent(new Event('resize'));
      }).catch(() => {
        setLoading(false);
      });
    } else {
      if (searchPage < 2) {
        // eslint-disable-next-line max-len
        claimsService.queryClaim(searchValue).then((res: any) => {
          setSearchPage(searchPage + 1);
          setClaimsList([...claimsList, ...res.data]);
          setLoading(false);
          setHasMoreData(false);
          window.dispatchEvent(new Event('resize'));
        }).catch(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <InfiniteScroll
        dataLength={claimsList.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={(
          <Divider plain>
            {' '}
            {t('search_ended')}
            {' '}
            🤐
          </Divider>
)}
        scrollableTarget="scrollableDiv"
      >
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
          claimsList.map((obj: IClaim, index: number) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Claim claim={obj} isEditable={allowEdit} index={index} /></div>)
        }
        </List>
      </InfiniteScroll>
    </Content>
  );
};

export default ClaimPages;
