import React, { useEffect, useState } from 'react';
import {
  Layout, List, Row, Col, Button, Modal,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Article from '../../components/article';
import Claim from '../../components/claim';
import MyTitle from '../../components/MyTitle';
import CreateClaim from '../../components/claim/create';

const { Content } = Layout;

export default function ReviewArticle() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();

  const [article, setArticle] = useState();
  const [claims, setClaims] = useState([]);

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
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleId}`).then((res1) => { setArticle(res1); console.log(''); }).catch(console.log(''));
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleId}/claims`).then((res2) => {
        const claimsList = res2.filter((el) => articleId === el?.article._id);
        setClaims(claimsList); console.log('');
      }).catch(console.log(''));
    }
  }, [auth, navigate]);

  return (
    <Content className="content" style={{ padding: '0% 6% 6% 6%', marginTop: 20 }}>
      <div style={{ marginBottom: '3%' }}>
        <Article article={article} isEditable={allowEdit} />
      </div>
      <Row>
        <Col offset={0} span={22}>
          <MyTitle headline="Article claims:" fontcolor="#d86e3d" />
        </Col>
        <Col>
          <Button variant="primary" onClick={showModal} style={{ backgroundColor: '#d86e3d', color: 'white' }}>
            Add claim
          </Button>
          <Modal
            title="Add claim"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <CreateClaim
              setClaims={setClaims}
              claims={claims}
              article={article}
              articleSubmited={allowAddClaim}
              fontColour="black"
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
          claims.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj, index) => (
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
