import React, { useEffect, useState } from 'react';
import {
  List, Layout, Row, Col, Card,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import authAtom from '../../_state/auth';
import Claim from '../../components/claim';
import { IArticle, IClaim, IProfile } from '../../common/types';
import claimsService from '../../api/claims.service';
import articlesService from '../../api/articles.service';
import Article from '../../components/article';
import userService from '../../api/users.service';

const { Content } = Layout;
const { Meta } = Card;

const UserProfile: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [claimsList, setClaimsList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [userProfile, setUserProfile] = useState<IProfile>();
  const { userId } = useParams();
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    if (userId !== undefined) {
      claimsService.getMyClaims(userId).then((res: any) => {
        setClaimsList(res.data);
      }).catch();
      articlesService.getMyArticles(userId).then((res: any) => {
        setArticlesList(res.data);
      }).catch();
      userService.getUserProfile(userId).then((res: any) => {
        setUserProfile(res.data);
      }).catch();
    }
  }, [auth, navigate]);

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <List
        style={{
          padding: '0% 1% 1% 1%',
        }}
      >
        <Row justify="space-between" align="top">
          <Col xs={7} sm={7} md={7} lg={5} xl={5} xxl={5} style={{ marginRight: '3%', marginBottom: '3%' }}>
            <Card
              hoverable
              cover={(
                <img
                  src={`${process.env.PUBLIC_URL}/user.svg`}
                  alt="user"
                  style={{ padding: '23%', height: '30%' }}
                />
)}
            >
              <Meta title={userProfile?.name !== undefined ? userProfile?.name : ' '} description={`Level : ${userProfile?.level}`} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title={t('articles')}>
                {
                  articlesList.length > 0 ? (articlesList?.map((obj : IArticle, index: number) => (
                    <div key={obj?._id} style={{ margin: '1%', background: 'white', borderRadius: '10px' }}>
                      <Article
                        article={obj}
                        isEditable={allowEdit}
                        indexArticle={index}
                      />
                    </div>
                  ))) : (
                    <div className="emptyList">
                      {' '}
                      {t('no_articles_yet')}
                      {' '}
                    </div>
                  )
                }
              </Tab>
              <Tab eventKey="profile" title={t('claims')}>
                {
                  claimsList.sort((a: IClaim, b: IClaim) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj: IClaim, index: number) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Claim claim={obj} isEditable={allowEdit} index={index} /></div>)
                }
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </List>
    </Content>
  );
};

export default UserProfile;
