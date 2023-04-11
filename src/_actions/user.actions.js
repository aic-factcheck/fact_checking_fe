import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { message, notification } from 'antd';
import authAtom from '../_state/auth';
import usersAtom from '../_state/users';

import useFetchWrapper from '../_helpers/fetch_wrapper';

export default function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_BASE}`;
  const fetchWrapper = useFetchWrapper();
  const [auth, setAuth] = useRecoilState(authAtom);
  // eslint-disable-next-line no-unused-vars
  const setUsers = useSetRecoilState(usersAtom);

  function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
      .then((user) => {
        const now = new Date();
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
          expiry: now + 900000,
        };

        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(saveUser));
        setAuth(saveUser);

        // get return url from location state or default to home page
        // const { from } = history.location.state || { from: { pathname: '/' } };
        // history.push('/collections');
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  function signup(firstName, lastName, email, password, verificationCode) {
    return fetchWrapper.post(`${baseUrl}/auth/register`, {
      firstName, lastName, email, password, verificationCode,
    })
      .then((user) => {
        const now = new Date();
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
          expiry: now + 900000,
        };

        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(saveUser));
        setAuth(saveUser);

        // get return url from location state or default to home page
        // const { from } = history.location.state || { from: { pathname: '/' } };
        // history.push('/collections');
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  function editProfile(id, firstName, lastName, email, password) {
    return fetchWrapper.patch(`${baseUrl}/users/${id}`, {
      firstName, lastName, email, password,
    })
      .then((user) => {
        const now = new Date();
        const saveUser = {
          data: user,
          token: auth.token,
          at: auth.token.accessToken,
          expiry: now + 900000,
        };

        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(saveUser));
        setAuth(saveUser);

        // get return url from location state or default to home page
        // const { from } = history.location.state || { from: { pathname: '/' } };
        // history.push('/collections');
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
  }

  function getArticles(setArticlesList) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles`).then((res) => setArticlesList(res)).catch(console.log(''));
  }

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/users`).then(setUsers);
  }

  function saveUnsaveArticle(saved, articleId, setSaved) {
    if (!saved) {
      return fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/save?articleId=${articleId}`).then(setSaved((current) => !current)).catch((err) => {
        console.log(err);
        setSaved((current) => !current);
      });
    }
    return fetchWrapper.delete(`${process.env.REACT_APP_API_BASE}/save?articleId=${articleId}`).then(setSaved((current) => !current)).catch((err) => {
      console.log(err);
      setSaved((current) => !current);
    });
  }

  function voteClaim(idClaim, upvotes, setVotes, rating) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/vote?claimId=${idClaim}`, { rating }).then(setVotes(upvotes + 1)).catch((err) => {
      console.log(err);
      setVotes(upvotes);
    });
  }

  function voteReview(idReview, upvotes, setVotes, rating) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/vote?reviewId=${idReview}`, { rating }).then(setVotes(upvotes + 1)).catch((err) => {
      console.log(err);
      setVotes(upvotes);
    });
  }

  function getReviews(articleid, claimid, setReviewsList) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`).then((res) => {
      const reviews = res.filter((el) => claimid === el?.claimId);
      setReviewsList(reviews);
      console.log('');
    }).catch(console.log(''));
  }

  function addreview(articleid, claimid, setReviewsList, values, reviewsList, claimForm) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`, values)
      .then((res) => {
        const mergedReviews = [...reviewsList];
        res.key = res._id;
        res.addedBy.firstName = auth?.data.firstName;
        res.addedBy.lastName = auth?.data.lastName;
        mergedReviews.push(res);
        claimForm.resetFields(['text']);
        setReviewsList(mergedReviews);
        notification.info({
          message: 'Successfully added review!',
          description: 'You gained 10 experience!',
          icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
        });
      })
      .catch((e) => message.error(e));
  }

  function getMyArticles(id, setMyArticlesList) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/articles`).then((res) => {
      const articles = res.filter((el) => id === el?.addedBy._id);
      setMyArticlesList(articles);
    }).catch(console.log(''));
  }

  function getTextFromURL(finalURL) {
    return fetchWrapper.get(`${finalURL}`)
      .then((res) => {
        // eslint-disable-next-line prefer-const
        let rawTextData = document.getElementById('rawTextData');
        if (rawTextData !== undefined) {
          rawTextData.value = res.raw_text;
        }
      })
      .catch(console.log(''));
  }

  // eslint-disable-next-line max-len
  function createArticle(mergedValues, myArticlesList, newArticle, setMyArticlesList, setArticle, setArticleSubmited) {
    fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles`, mergedValues)
      .then((res) => {
        console.log(myArticlesList);
        const mergedArticles = [...myArticlesList, newArticle];
        setMyArticlesList(mergedArticles);
        setArticle(res);
        setArticleSubmited(true);
        notification.info({
          message: 'Successfully added article!',
          description: 'You gained 15 experience!',
          icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
        });
      })
      .catch((e) => message.error(e));
  }

  function editArticle(id, mergedValues, myArticlesList, indexEdit, values, setMyArticlesList) {
    return fetchWrapper.patch(`${process.env.REACT_APP_API_BASE}/articles/${id}`, mergedValues)
      .then(() => {
        message.success('Successfully edited article');

        // eslint-disable-next-line prefer-const
        let articleToEdit = { ...myArticlesList[indexEdit] };

        if (articleToEdit?.title) {
          articleToEdit.title = values.title;
        }

        if (articleToEdit?.sourceUrl) {
          articleToEdit.sourceUrl = values.sourceUrl;
        }

        if (articleToEdit?.text) {
          articleToEdit.text = values.text;
        }

        if (articleToEdit?.lang) {
          articleToEdit.lang = values.lang;
        }

        // eslint-disable-next-line max-len
        const mergedArticles = [...myArticlesList.slice(0, indexEdit), articleToEdit, ...myArticlesList.slice(indexEdit + 1)];

        setMyArticlesList(mergedArticles);
      })
      .catch((e) => message.error(e));
  }

  function getMyClaims(id, setMyClaimsList) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/claims`).then((res) => {
      const claimsList = res.filter((el) => id === el?.addedBy._id);
      setMyClaimsList(claimsList);
    }).catch(console.log(''));
  }

  // eslint-disable-next-line max-len
  function createClaim(articleId, values, claims, claimForm, setClaims, myClaimsList, newClaim, setMyClaimsList) {
    return fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles/${articleId}/claims`, values)
      .then((res) => {
        const mergedClaims = [...claims];
        res.key = res._id;
        mergedClaims.push(res);
        claimForm.resetFields(['text']);
        setClaims(mergedClaims);
        const mergedMyClaims = [...myClaimsList, newClaim];
        setMyClaimsList(mergedMyClaims);
        notification.info({
          message: 'Successfully added claim!',
          description: 'You gained 15 experience!',
          icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
        });
      })
      .catch((e) => message.error(e));
  }

  function editClaim(articleid, claimid, values, myClaimsList, indexClaim, setMyClaimsList) {
    return fetchWrapper.patch(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}`, values)
      .then(() => {
        message.success('Successfully edited claim');
        // eslint-disable-next-line prefer-const
        let claimToEdit = { ...myClaimsList[indexClaim] };

        if (claimToEdit?.text) {
          claimToEdit.text = values.text;
        }

        // eslint-disable-next-line max-len
        const mergedClaims = [...myClaimsList.slice(0, indexClaim), claimToEdit, ...myClaimsList.slice(indexClaim + 1)];

        setMyClaimsList(mergedClaims);
      })
      .catch((e) => message.error(e));
  }

  function getClaims(setClaimsList) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/hot/claims`).then((res) => setClaimsList(res)).catch(console.log(''));
  }

  function getArticle(articleId, setArticle) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleId}`).then((res1) => { setArticle(res1); console.log(''); }).catch(console.log(''));
  }

  function getClaimsOfArticle(articleId, setClaims) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleId}/claims`).then((res2) => {
      const claimsList = res2.filter((el) => articleId === el?.article._id);
      setClaims(claimsList); console.log('');
    }).catch(console.log(''));
  }

  function getUserStats(setStats) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/stats`).then((res) => {
      setStats(res);
    });
  }

  function getLeaderboard(setLeaderboard) {
    return fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/stats/leaderboard`).then((res) => {
      setLeaderboard(res);
    });
  }

  return {
    login,
    logout,
    getAll,
    signup,
    editProfile,
    getArticles,
    saveUnsaveArticle,
    voteClaim,
    voteReview,
    getReviews,
    addreview,
    getMyArticles,
    getTextFromURL,
    createArticle,
    editArticle,
    getMyClaims,
    createClaim,
    editClaim,
    getClaims,
    getArticle,
    getClaimsOfArticle,
    getUserStats,
    getLeaderboard,
  };
}
