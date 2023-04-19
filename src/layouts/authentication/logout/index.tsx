import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useRecoilState } from 'recoil';
import usersService from '../../../api/users.service';
import authAtom from '../../../_state/auth';
import articlesLoaded from '../../../_state/articlesLoaded';
import claimsLoaded from '../../../_state/claimsLoaded';
import myArticles from '../../../_state/usersArticles';
import myClaims from '../../../_state/usersClaims';

const Logout : React.FC = () => {
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authAtom);
  const [,setArticlesLoaded] = useRecoilState(articlesLoaded);
  const [,setClaimsLoaded] = useRecoilState(claimsLoaded);
  const [,setMyArticles] = useRecoilState(myArticles);
  const [,setMyClaims] = useRecoilState(myClaims);

  useEffect(() => {
    usersService.logout();
    setAuth('{}');
    setArticlesLoaded(false);
    setClaimsLoaded(false);
    setMyArticles([]);
    setMyClaims([]);
    navigate('/sign-in');
  }, [usersService]);

  return (<Spin />);
};

export default Logout;
