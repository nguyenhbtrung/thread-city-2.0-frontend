import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp(props) {
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7135/api/User/register', {
        username: userName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      });
      console.log('Đăng kí thành công:', response.data);
      navigate('/sign-in');
    }
    catch (error) {
      if (error.response.status === 400) {
        setPasswordError(true);
        setPasswordErrorMessage('Email không hợp lệ!');
      }
      else if (error.response.status === 500) {
        const errors = error.response.data;
        setPasswordError(true);
        displayError(errors[0].code);
        console.log(error.response.data);
      }
    }
  };

  const displayError = (error) => {
    if (error === 'DuplicateUserName') {
      setPasswordErrorMessage('Tên tài khoản đã tồn tại!');
    }
    else if (error === 'InvalidUserName') {
      setPasswordErrorMessage('Tên tài khoản không hợp lệ!');
    }
    else if (error === 'PasswordTooShort') {
      setPasswordErrorMessage('Mật khẩu quá ngắn!');
    }
    else if (error === 'PasswordRequiresNonAlphanumeric') {
      setPasswordErrorMessage('Mật khẩu thiếu ký tự đặc biệt!');
    }
    else if (error === 'PasswordRequiresLower') {
      setPasswordErrorMessage('Mật khẩu phải gồm chữ thường!');
    }
    else if (error === 'PasswordRequiresUpper') {
      setPasswordErrorMessage('Mật khẩu phải gồm chữ viết hoa!');
    }
    else if (error === 'PasswordRequiresDigit') {
      setPasswordErrorMessage('Mật khẩu phải gồm số!');
    }
    else {
      setPasswordErrorMessage("Đã có lỗi không xác định xảy ra!");
    }
  };


  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate('/sign-in');
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Đăng kí
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="userName" sx={{ fontFamily: 'Roboto, sans-serif', textAlign: 'left' }}>Tên tài khoản</FormLabel>
              <TextField
                autoComplete="username"
                name="userName"
                required
                fullWidth
                id="userName"
                placeholder="Điền tên tài khoản"
                value={userName}
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
              <FormLabel htmlFor="email" sx={{ fontFamily: 'Roboto, sans-serif', textAlign: 'left' }}>Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Điền email của bạn"
                onChange={handleEmailChange}
                name="email"
                autoComplete="email"
                variant="outlined"
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
              <FormLabel htmlFor="password" sx={{ fontFamily: 'Roboto, sans-serif', textAlign: 'left' }}>Mật khẩu</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={handlePasswordChange}
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
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
              <FormLabel htmlFor="phoneNumber" sx={{ fontFamily: 'Roboto, sans-serif', textAlign: 'left' }}>Số điện thoại</FormLabel>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                placeholder="Nhập số điện thoại của bạn"
                onChange={handlePhoneNumberChange}
                type="phoneNumber"
                id="phoneNumber"
                autoComplete="new-password"
                variant="outlined"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={validateInputs}
              sx={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Đăng kí
            </Button>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
              Đã có tài khoản?{' '}
              <span>
                <Link
                  variant="body2"
                  sx={{ alignSelf: 'center', fontFamily: 'Roboto, sans-serif' }}
                  onClick={handleSignInClick}
                >
                  Đăng nhập
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
