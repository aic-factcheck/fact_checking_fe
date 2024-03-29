import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ProfileSidebar from '../../components/ProfileSidebar';
import authAtom from '../../_state/auth';

const Profile: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token?.refreshToken === undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  return (
    <div>
      <ProfileSidebar />
    </div>
  );
};

export default Profile;
