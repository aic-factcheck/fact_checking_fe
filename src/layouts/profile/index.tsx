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
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  return (
    <div>
      <ProfileSidebar userid={auth?.user?._id} />
    </div>
  );
};

export default Profile;
