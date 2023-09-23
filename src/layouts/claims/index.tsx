/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import {
  List, Layout, Row, Col, Input, Divider, Skeleton, Select, Space,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  const [claimsList, setClaimsList] = useState<IClaim[]>([]);

  const [loading, setLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [hasMoreData, setHasMoreData] = useState(true);

  const [disabledRange, setDisabledRange] = useState(false);

  const [sortBy, setSortBy] = useState('POSITIVE_VOTES_DESC');
  const [duration, setDuration] = useState('MONTH');

  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token?.refreshToken === undefined) {
      console.log(auth?.refreshToken);
      console.log('You must be logged in');
      navigate('/sign-in');
    }

    claimsService.getClaimsList(1, duration, sortBy).then((res: any) => {
      setClaimsList(Array.from(res.data));
      if (res.data.length < 10) {
        setHasMoreData(false);
      }
    }).catch();
  }, [auth, navigate]);

  const onSearch = (pattern: string) => {
    // eslint-disable-next-line max-len
    if (pattern.length > 3) {
      setDisabledRange(true);
      setIsDefaultSearch(false);
      setSearchValue(pattern);
      setSearchPage(1);
      setClaimsList([]);
      // eslint-disable-next-line max-len
      claimsService.queryClaim(pattern, sortBy).then((res: any) => {
        setClaimsList(res.data);
        if (res.data.length < 10) {
          setHasMoreData(false);
        }
      }).catch(() => {
        claimsService.getClaimsList(1, duration, sortBy).then((res: any) => {
          setClaimsList(Array.from(res.data));
          if (res.data.length < 10) {
            setHasMoreData(false);
          }
        }).catch();
      });
    } else {
      setDisabledRange(false);
      setSearchValue('');
      claimsService.getClaimsList(1, duration, sortBy).then((res: any) => {
        setClaimsList(Array.from(res.data));
        if (res.data.length < 10) {
          setHasMoreData(false);
        }
      }).catch();
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
      console.log(`Loading more data  ${searchPage}`);
      claimsService.getClaimsList(searchPage + 1, duration, sortBy).then((res: any) => {
        setSearchPage((s) => s + 1);
        setClaimsList([...claimsList, ...res.data]);
        setLoading(false);
        if (res.data.length < 10) {
          setHasMoreData(false);
        }
        window.dispatchEvent(new Event('resize'));
      }).catch(() => {
        setLoading(false);
      });
    } else {
      // eslint-disable-next-line max-len
      claimsService.queryClaim(searchValue, sortBy).then((res: any) => {
        setClaimsList([...claimsList, ...res.data]);
        setLoading(false);
        setHasMoreData(false);
        window.dispatchEvent(new Event('resize'));
      }).catch(() => {
        setLoading(false);
      });
      setLoading(false);
    }
  };

  const handleChangeRange = (value: string) => {
    setDuration(value);
    setSearchPage(1);
    claimsService.getClaimsList(1, value, sortBy).then((res: any) => {
      setClaimsList(Array.from(res.data));
      if (res.data.length < 10) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }
    }).catch();
  };

  const handleChangeSort = (value: string) => {
    setSortBy(value);
    setSearchPage(1);
    if (searchValue.length > 3) {
      claimsService.queryClaim(searchValue, value).then((res: any) => {
        setClaimsList(Array.from(res.data));
        if (res.data.length < 10) {
          setHasMoreData(false);
        } else {
          setHasMoreData(true);
        }
      }).catch(() => {
        setLoading(false);
      });
      // setLoading(false);
    } else {
      claimsService.getClaimsList(1, duration, value).then((res: any) => {
        setClaimsList(Array.from(res.data));
        if (res.data.length < 10) {
          setHasMoreData(false);
        } else {
          setHasMoreData(true);
        }
      }).catch();
    }
  };

  return (
    <Content className="content" style={{ padding: '25px 25px' }}>
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
          <Row>
            <Space wrap style={{ marginRight: '5%', marginBottom: '2%' }}>
              {t('range')}
              <Select
                disabled={disabledRange}
                defaultValue="MONTH"
                style={{ width: 120 }}
                onChange={handleChangeRange}
                options={[
                  { value: 'DAY', label: t('range_day') },
                  { value: 'DAYS', label: t('range_days') },
                  { value: 'WEEK', label: t('range_week') },
                  { value: 'MONTH', label: t('range_month') },
                  { value: 'YEAR', label: t('range_year') },
                ]}
              />
            </Space>
            <Space wrap style={{ marginRight: '5%', marginBottom: '2%' }}>
              {t('sort')}
              <Select
                defaultValue="POSITIVE_VOTES_DESC"
                onChange={handleChangeSort}
                options={[
                  { value: 'POSITIVE_VOTES_DESC', label: t('positive_votes_desc') },
                  { value: 'POSITIVE_VOTES_ASC', label: t('positive_votes_asc') },
                  { value: 'DATE_DESC', label: t('date_desc') },
                  { value: 'DATE_ASC', label: t('date_asc') },
                ]}
              />
            </Space>
          </Row>
          {
          claimsList?.map((obj: IClaim, index: number) => <div key={obj?._id} style={{ padding: '1%', borderRadius: '10px' }}><Claim claim={obj} isEditable={allowEdit} index={index} /></div>)
        }
        </List>
      </InfiniteScroll>
    </Content>
  );
};

export default ClaimPages;
