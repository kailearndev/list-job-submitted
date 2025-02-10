import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { AuthService } from 'src/services/auth';
import toast from 'react-hot-toast';
import { Button, Chip, Dialog, DialogActions, Modal, Stack } from '@mui/material';

// ----------------------------------------------------------------------

interface LoginPayload {
  username: string
  password: string
  confirmPassword: string
}


export function SignInView() {


  const router = useRouter();
  const [loginValue, setLoginValue] = useState<Omit<LoginPayload, "confirmPassword">>({
    username: "",
    password: ""
  })
  const [signupValue, setSignupValue] = useState<LoginPayload>({
    username: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);

  const handleSignIn = async () => {
    const response = await AuthService.login(loginValue)
    if (response) {
      localStorage.setItem("token", JSON.stringify(response));
      toast.success("Login Success", {
        position: "top-right"
      })
      router.push("/")

    }
    else {
      toast.error("Login failed", {
        position: "top-right"
      })
    }

  }
  const handleConfirmPassword = () => {
    return signupValue.password === signupValue.confirmPassword ? true : false
  }


  const handleClose = () => {
    setIsLogin(true)
    setSignupValue({
      password: "",
      confirmPassword: "",
      username: ""
    })

    setModalConfirm(false);
  };
  const handleSignUp = async () => {
    const response: any = await AuthService.signup(signupValue)

    if (response) {
      toast.success("Tạo tài khoản thành công ", {
        position: "top-right"
      })
      setModalConfirm(true)

    }

    else {
      toast.error("User tồn tại hoặc sai mật khẩu", {
        position: "top-right"
      })
    }

  }

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        onChange={(e) => {
          setLoginValue({
            ...loginValue,
            username: e.target.value
          })
        }}
        name="username"
        label="Tên đăng nhập"
        value={loginValue.username}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Mật khẩu"
        value={loginValue.password}
        onChange={(e) => {
          setLoginValue({
            ...loginValue,
            password: e.target.value
          })
        }}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Đăng nhập
      </LoadingButton>

    </Box>
  );
  const renderFormSignUp = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        onChange={(e) => {
          setSignupValue({
            ...signupValue,
            username: e.target.value
          })
        }}
        name="username"
        label="Tên đăng nhập"
        value={signupValue.username}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />



      <TextField
        fullWidth
        name="password"
        label="Mật Khẩu"
        value={signupValue.password}
        onChange={(e) => {
          setSignupValue({
            ...signupValue,
            password: e.target.value
          })
        }}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="confirmPassword"
        label="Nhập lại mật khẩu"
        value={signupValue.confirmPassword}
        onChange={(e) => {
          setSignupValue({
            ...signupValue,
            confirmPassword: e.target.value
          })
        }}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      <LoadingButton
        fullWidth
        disabled={Boolean(!isLogin && !handleConfirmPassword())}
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={isLogin ? handleSignIn : handleSignUp}
      >
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </LoadingButton>

    </Box>
  );
  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Hi user ✌️</Typography>

      </Box>

      {isLogin ? renderForm : renderFormSignUp}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >

        </Typography>
      </Divider>
      {
        isLogin && <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
          <Typography variant="body2" color="text.secondary">
            Chưa có tài khoản
            <Button variant="text" disableElevation onClick={() => setIsLogin(pre => !pre)}>

              Tạo ngay thôi

            </Button>
          </Typography>

        </Box>
      }

      <Dialog
        open={modalConfirm}
        onClose={handleClose}

      >
        <Box p={4} display={"flex"} justifyContent={"center"} alignItems={"center"} >

          <Typography id="modal-modal-title" variant="h6" component="h2" pt={3}>
            Tài khoản được tạo thành công✅
          </Typography>



        </Box>
        <DialogActions>

          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog >
    </>

  );
}
