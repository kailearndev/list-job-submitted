import type { IconButtonProps } from '@mui/material/IconButton';

import { useCallback, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useQuery } from '@tanstack/react-query';
import { _myAccount } from 'src/_mock';
import { AuthService } from 'src/services/auth';
import { Chip } from '@mui/material';

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover({ sx, ...other }: AccountPopoverProps) {
  const router = useRouter();


  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['me'],
    queryFn: () => AuthService.getMe(),
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    router.push("/sign-in")
  }

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        <Avatar src={_myAccount.photoURL} alt={_myAccount.displayName} sx={{ width: 1, height: 1 }}>
          {_myAccount.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            Hello {data?.name || "user"} 😁
          </Typography>

          <Box >
            <Typography variant="body2" sx={{ color: 'text.primary' }} noWrap>
              <Chip color="warning" label={` ${data?.username} 🥅` || "user"} />
            </Typography>

          </Box>
          <Box mt={1}>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              <Chip color="success" label={`@Role: ${data?.role[0]} 🏝️` || "user"} />
            </Typography>
          </Box>
        </Box>



        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1 }}>
          <Button onClick={() => { }} fullWidth color="info" size="medium" variant="text">
            Thay đổi thông tin
          </Button>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1 }}>
          <Button onClick={handleLogout} fullWidth color="error" size="medium" variant="text">
            Đăng xuất
          </Button>
        </Box>
      </Popover>
    </>
  );
}
