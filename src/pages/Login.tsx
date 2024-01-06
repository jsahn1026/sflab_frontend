import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from 'store/auth';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const LOGIN_ID = process.env.REACT_APP_LOGIN_ID;
  const LOGIN_PW = process.env.REACT_APP_LOGIN_PW;

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    if (id == LOGIN_ID && pw == LOGIN_PW) {
      setLoginState(true);
      navigate('/');
    }
  }, [id, pw]);

  return (
    <Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
      <Stack spacing={2}>
        <TextField label="ID" onChange={(e) => setId(e.target.value)} />
        <TextField
          label="PW"
          type="password"
          onChange={(e) => setPw(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
