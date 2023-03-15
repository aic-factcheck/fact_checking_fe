/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Row, Col,
  Table, Divider,
} from 'antd';
import { AiFillStar } from 'react-icons/ai';
import authAtom from '../../_state/auth';
import MyTitle from '../MyTitle';

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
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Liked Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Agreed Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

export default function Scoreboard() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  return (
    <div id="leaderboard">
      <Row className="containerLeaders" style={{ background: '#d86e3d', padding: '3%', borderRadius: '10px' }}>
        <Col span={3}>
          <img alt="leaders" width="100%" src={`${process.env.PUBLIC_URL}/pictures/trophy.png`} />
        </Col>

        <Col span={16}>
          <Row>
            Your rank : 12
          </Row>
          <Divider style={{ margin: '2%' }} />
          <Row>
            <Col sm={6}>
              <Row>
                <Col>
                  <AiFillStar />
                  {' '}
                  12
                </Col>
                <Col offset={1}>
                  saved your articles
                </Col>
              </Row>
              <Row>
                <Col>
                  ✔️
                  {' '}
                  12
                </Col>
                <Col offset={1}>
                  liked your claims
                </Col>
              </Row>
              <Row>
                <Col style={{ marginRight: '2%' }}>
                  &#128077; 5
                </Col>
                <Col offset={1}>
                  agreed your reviews
                </Col>
              </Row>
            </Col>
            <Col sm={9}>
              <Row>
                <Col>
                  ❌
                  {' '}
                  12
                </Col>
                <Col offset={1}>
                  disliked your claims
                </Col>
              </Row>
              <Row>
                <Col style={{ marginRight: '2%' }}>
                  &#128078; 3
                </Col>
                <Col offset={1}>
                  disagreed your reviews
                </Col>
              </Row>
              <Row>
                <Col style={{ marginRight: '2%' }}>
                  &#10068; 1
                </Col>
                <Col offset={1}>
                  reviews miss key information
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
        <Col sm={12}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </div>
  );
}
