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
import useUserActions from '../../_actions/user.actions';

const columns = [
  {
    title: 'Rank',
    render: (id, record, index) => { ++index; return index; },
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Saved Score',
    dataIndex: 'nArticles',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Liked Score',
    dataIndex: 'nClaims',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Agreed Score',
    dataIndex: 'nReviews',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

export default function Scoreboard() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userActions = useUserActions();

  const [stats, setStats] = useState();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      userActions.getUserStats(setStats);
      userActions.getLeaderboard(setLeaderboard);
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
            <MyTitle headline={`${t('your_rank')} :  ${stats?.articles?.total}`} fontcolor="white" />
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
        <MyTitle headline="Best Hoaxkillers" fontcolor="#d86e3d" />
      </Row>
      <Row className="containerLeaders" style={{ padding: '2%' }}>
        <Col sm={6}>
          <img alt="leaders" width="100%" src={`${process.env.PUBLIC_URL}/pictures/scoreboard.png`} style={{ padding: '5%' }} />
        </Col>
        <Col sm={18}>
          <Table columns={columns} dataSource={leaderboard} />
        </Col>
      </Row>
    </div>
  );
}
