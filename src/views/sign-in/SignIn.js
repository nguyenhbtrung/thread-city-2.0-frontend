import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { SitemarkIcon } from './CustomIcons';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName === '' || password === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Tên tài khoản hoặc mật khẩu không được để trống');
      return;
    }
    try {
      const response = await axios.post('https://localhost:7135/api/User/login', {
        userName: userName,
        password: password
      });
      console.log('Đăng nhập thành công: ', response.data);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      navigate('/home');
    }
    catch (error) {
      setPasswordError(true);
      setPasswordErrorMessage(error.response.data);
      console.error('Error:', error.response.data);
    }
  };

  // const validateInputs = () => {
  //   const password = document.getElementById('password');

  //   let isValid = true;

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('Mật khẩu không hợp lệ');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }

  //   return isValid;
  // };

  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontFamily: 'Roboto, sans-serif' }}
          >
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="userName" sx={{ textAlign: 'left', fontFamily: 'Roboto, sans-serif' }}>Tên tài khoản</FormLabel>
              <TextField
                id="userName"
                type="userName"
                name="userName"
                placeholder="Nhập tên tài khoản"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={handleUserNameChange}
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password" sx={{ fontFamily: 'Roboto, sans-serif' }} >Mật khẩu</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline', fontFamily: 'Roboto, sans-serif' }}
                >
                  Quên mật khẩu?
                </Link>
              </Box>
              <TextField
                name="password"
                placeholder="Điền mật khẩu của bạn"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={handlePasswordChange}
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                  },
                }}
              />
              {/* Show error message if password is invalid */}
              {passwordError && (
                <FormHelperText sx={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: 'error.main' }}>
                  {passwordErrorMessage}
                </FormHelperText>
              )}
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              sx={{ fontFamily: 'Roboto, sans-serif' }}
              label="Ghi nhớ tôi"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Đăng nhập
            </Button>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
              Chưa có tài khoản?{' '}
              <span>
                <Link
                  variant="body2"
                  sx={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}
                  onClick={handleSignUpClick}
                >
                  Đăng kí ngay
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
