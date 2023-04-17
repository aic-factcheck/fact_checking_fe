import React, { useEffect, useState } from 'react';
import {
  Layout, List, Row, Col, Button, Modal,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import authAtom from '../../_state/auth';
import Article from '../../components/article';
import Claim from '../../components/claim';
import MyTitle from '../../components/MyTitle';
import CreateClaim from '../../components/claim/create';
import { IArticle, IClaim } from '../../common/types';
import articlesService from '../../api/articles.service';
import claimsService from '../../api/claims.service';

const { Content } = Layout;

class ArticleEmpty implements IArticle {
  _id = '';
  createdAt = '';
  title = '';
  sourceUrl = '';
  lang = '';
  text = '';
  sourceType = '';
  addedBy!: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isSavedByUser = false
}

const ReviewArticle: React.FC = () =>{
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [article, setArticle] = useState<IArticle>();
  const [claims, setClaims] = useState<IClaim[]>([]);

  const { articleId } = useParams();
  const allowEdit = false;

  const allowAddClaim = true;

  const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email == undefined) {
      navigate('/sign-in');
    }
    if (articleId != undefined) {
      //userActions.getArticle(articleId, setArticle);
      articlesService.getArticle(articleId).then((res: any) => { setArticle(res.data); console.log(''); }).catch();
      claimsService.getClaimsOfArticle(articleId).then((res: any) => {
        /*const claimsList = res2.filter((el) => articleId === el?.article._id);*/
        setClaims(res.data); console.log('');
      }).catch();
    }
  }, [auth, navigate]);

  return (
    <Content className="content" style={{ padding: '0% 2% 2% 2%', marginTop: 20 }}>
      <div style={{ marginBottom: '3%' }}>
        <Article article={article != undefined ? article : new ArticleEmpty()} isEditable={allowEdit} indexArticle={1} />
      </div>
      <Row justify="space-between" align="bottom">
        <Col span={12}>
          <MyTitle headline={t('claims')} fontcolor="#d86e3d" />
        </Col>
        <Col span={12} flex="0">
          <Button type="primary" shape="round" size="large" onClick={showModal} style={{ backgroundColor: '#d86e3d', color: 'white' }} icon={<PlusCircleOutlined />}>
            {t('add_claim')}
          </Button>
          <Modal
            title={t('add_claim')}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <CreateClaim
              setClaims={setClaims}
              claims={claims != undefined ? claims : []}
              article={article != undefined ? article : new ArticleEmpty()}
              articleSubmited={allowAddClaim}
            />
          </Modal>
        </Col>
      </Row>
      <List
        style={{
          padding: '1%',
        }}
      >
        {
          // _id, priority, addedBy, articleId, text
          claims?.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj, index) => (
            <div key={obj._id} style={{ margin: '1%', background: 'white', borderRadius: '10px' }}>
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

export default ReviewArticle;