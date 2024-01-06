import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'store/auth';
import './index.scss';

interface AccountProps {}

const Account = (props: AccountProps) => {
  const [isLogin, setLogin] = useRecoilState(loginState);

  const handleLogout = useCallback(() => {
    setLogin(false);
  }, []);

  return (
    <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
      {isLogin && (
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      )}
      {/* <Link className="sidebar-btn" style={{ cursor: 'pointer' }} to="/profile">
        <FaUser />
        <span>My Account</span>
      </Link> */}
    </div>
  );
};

export default Account;
