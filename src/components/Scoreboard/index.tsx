/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Row, Col,
  Table, Divider,
} from 'antd';
import { AiFillStar, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import {
  UpCircleOutlined, DownCircleOutlined,
} from '@ant-design/icons';
import { BiQuestionMark } from 'react-icons/bi';
import authAtom from '../../_state/auth';
import MyTitle from '../MyTitle';
import { IStats } from '../../common/types';
import usersService from '../../api/users.service';

const Scoreboard: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stats, setStats] = useState<IStats>();
  const [leaderboard, setLeaderboard] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Your page size

  const columns = [
    {
      title: 'Rank',
      render: (id: string, record: any, index: number) => {
        const rank = (currentPage - 1) * pageSize + index + 1;
        return rank;
      },
    },
    {
      title: t('name'),
      dataIndex: 'fullName', // Use a custom dataIndex for the merged value
      render: (text: string, record: any) => `${record.firstName} ${record.lastName}`, // Combine firstName and lastName
    },
    {
      title: t('reputation'),
      // eslint-disable-next-line no-useless-concat
      dataIndex: 'reputation',
      sorter: {
        compare: (a: any, b: any) => a.reputation - b.reputation,
      },
    },
    {
      title: 'Level',
      dataIndex: 'level',
      sorter: {
        compare: (a: any, b: any) => a.level - b.level,
      },
    },
    {
      title: t('claims_score'),
      dataIndex: 'nClaims',
      sorter: {
        compare: (a: any, b: any) => a.nClaims - b.nClaims,
      },
    },
    {
      title: t('reviews_score'),
      dataIndex: 'nReviews',
      sorter: {
        compare: (a: any, b: any) => a.nReviews - b.nReviews,
      },
    },
    {
      title: t('articles_score'),
      dataIndex: 'nArticles',
      sorter: {
        compare: (a: any, b: any) => a.nArticles - b.nArticles,
      },
    },
  ];

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    const id = auth?.user?._id;
    if (id !== undefined) {
      usersService.getUserStats().then((res: any) => {
        setStats(res.data);
      }).catch();
      usersService.getLeaderboard().then((res: any) => {
        setLeaderboard(res.data);
      }).catch();
    }
  }, [auth, navigate]);

  return (
    <div id="leaderboard">
      <Row className="containerLeaders" style={{ background: '#d86e3d', padding: '3%', borderRadius: '10px' }}>
        <Col span={3}>
          <img alt="leaders" width="100%" src={`${process.env.PUBLIC_URL}/pictures/trophy.png`} />
        </Col>

        <Col span={21}>
          <Row>
            <MyTitle headline={`${t('your_level')} :  ${stats?.user?.level !== undefined ? stats?.user?.level : ' '}`} fontcolor="white" />
          </Row>
          <Divider style={{ margin: '2%' }} />
          <Row>
            <Col span={12}>
              <Row>
                <Col offset={1}>
                  <AiFillStar />
                </Col>
                <Col span={1} style={{ marginLeft: '2%' }}>
                  {stats?.articles?.nSaved}
                </Col>
                <Col offset={1}>
                  {`  ${t('saved_your_articles')}`}
                </Col>
              </Row>
              <Row>
                <Col offset={1}>
                  <UpCircleOutlined />
                </Col>
                <Col span={1} style={{ marginLeft: '2%' }}>
                  {stats?.claims?.nPositiveVotes}
                </Col>
                <Col offset={1}>
                  {`  ${t('liked_your_claims')}`}
                </Col>
              </Row>
              <Row>
                <Col offset={1}>
                  <AiOutlineLike />
                </Col>
                <Col span={1} style={{ marginLeft: '2%' }}>
                  {stats?.reviews?.nPositiveVotes}
                </Col>
                <Col offset={1}>
                  {`  ${t('agreed_your_reviews')}`}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col offset={1}>
                  <DownCircleOutlined />
                </Col>
                <Col span={1} style={{ marginLeft: '2%' }}>
                  {stats?.claims?.nNegativeVotes}
                </Col>
                <Col offset={1}>
                  {`  ${t('disliked_your_claims')}`}
                </Col>
              </Row>
              <Row>
                <Col offset={1}>
                  <AiOutlineDislike />
                </Col>
                <Col span={1} style={{ marginLeft: '2%' }}>
                  {stats?.reviews?.nNegativeVotes}
                </Col>
                <Col offset={1}>
                  {`  ${t('disagreed_your_reviews')}`}
                </Col>
              </Row>
              <Row>
                <Col offset={1}>
                  <BiQuestionMark />
                </Col>
                <Col span={1} style={{ marginLeft: '2%' }}>
                  {stats?.reviews?.nNeutralVotes}
                </Col>
                <Col offset={1}>
                  {`  ${t('reviews_miss_key_info')}`}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{ margin: '2%' }} />
        </Col>
      </Row>
      <Divider />
      <Row justify="space-around" align="middle">
        <MyTitle headline={t('hoaxkillers')} fontcolor="#d86e3d" />
      </Row>
      <Row className="containerLeaders" style={{ padding: '2%' }}>
        <Col sm={6}>
          <img alt="leaders" width="100%" src={`${process.env.PUBLIC_URL}/pictures/scoreboard.png`} style={{ padding: '5%' }} />
        </Col>
        <Col sm={18} style={{ overflowX: 'scroll' }}>
          <Table
            columns={columns}
            dataSource={leaderboard}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize,
              onChange: (page) => setCurrentPage(page),
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Scoreboard;
