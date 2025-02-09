import { useCallback, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { CompanyService } from 'src/services/company';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ----------------------------------------------------------------------

export type CompanyProps = {
  _id: string;
  companyName: string;
  title: string;
  location: string;
  status: string;
  tech: string;
  salary: string;
  createdAt: string;
  submissionDate: any

};


type UserTableRowProps = {
  row: CompanyProps;
  selected?: boolean;
  onSelectRow?: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [updateValue, setUpdateValue] = useState<Omit<CompanyProps, "_id" | "createdAt">>({
    companyName: row.companyName,
    title: row.title,
    location: row.location,
    status: row.status,
    tech: row.tech,
    salary: row.salary,
    submissionDate: row.submissionDate


  })
  const handleClickOpen = () => {
    handleClosePopover()
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, [open]);


  const handleDelete = async (id: string) => {
    const response = await CompanyService.deleteCompany(id)
    if (response) {
      queryClient.invalidateQueries({
        queryKey: ["company-list"]
      });

      toast.success(`Xóa thành công`)
      handleClosePopover()
      handleClose()
    }
  }

  const handleUpdate = async (id: string) => {
    const response = await CompanyService.updateCompany(id, updateValue)
    if (response) {
      queryClient.invalidateQueries({
        queryKey: ["company-list"]
      });
      setUpdateValue({
        companyName: "",
        title: "",
        location: "",
        status: "",
        tech: "",
        salary: "",
        submissionDate: "row.submissionDate"
      })
      toast.success(`Sửa thành công`)
      handleClosePopover()
      handleClose()
    }
  }
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={onSelectRow} /> */}
        </TableCell>

        <TableCell>{row.companyName}</TableCell>

        <TableCell>{row.title}</TableCell>

        <TableCell >
          {row.location}
        </TableCell>

        <TableCell>
          <Label color={row.status === 'interview' ? "success" : row.status === 'rejected' ? "warning" :

            row.status === 'failed' ? "error" : "secondary"


          }>{row.status}</Label>

        </TableCell>
        <TableCell >
          {row.tech}
        </TableCell>
        <TableCell >
          {`${(row.salary)}M`}
        </TableCell>
        <TableCell >
          {dayjs(row.submissionDate).format("DD-MM-YY")}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClickOpen}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => handleDelete(row._id)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>

      </Popover >
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thay đổi thông tin Job"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" display={"flex"} flexDirection={"column"} gap={3} py={2}>
            <TextField variant="filled" size="small" label="Tên công ty" value={updateValue.companyName}
              onChange={(e) => setUpdateValue({
                ...updateValue,
                companyName: e.target.value
              })}
            />
            <TextField variant="filled" size="small" label="Tên Job" value={updateValue.title}
              onChange={(e) => setUpdateValue({
                ...updateValue,
                title: e.target.value
              })}

            />
            <Select

              variant="filled"
              value={updateValue.location}
              label="Địa chỉ"
              onChange={
                (event) =>

                  setUpdateValue({
                    ...updateValue,
                    location: event.target.value as string
                  })

              }
            >
              <MenuItem value="Quận 1">Quận 1</MenuItem>
              <MenuItem value="Quận 3">Quận 3</MenuItem>
              <MenuItem value="Quận 5">Quận 5</MenuItem>
              <MenuItem value="Quận 7">Quận 7</MenuItem>
              <MenuItem value="Quận 10">Quận 10</MenuItem>
              <MenuItem value="Bình Thạnh">Bình Thạnh</MenuItem>
              <MenuItem value="Phú Nhuận">Phú Nhuận</MenuItem>
              <MenuItem value="Tân Bình">Tân Bình</MenuItem>
              <MenuItem value="Thủ Đức">Thủ Đức</MenuItem>
              <MenuItem value="Bình Tân">Bình Tân</MenuItem>
              <MenuItem value="Gò Vấp">Gò Vấp</MenuItem>
              <MenuItem value="Other">Chỗ Khác</MenuItem>

            </Select>
            <TextField variant="filled" size="small" label="Công Nghệ" value={updateValue.tech}

              onChange={(e) => setUpdateValue({
                ...updateValue,
                tech: e.target.value
              })} />
            <TextField
              type="number"
              variant="filled" size="small" label="Salary"

              value={updateValue.salary}
              onChange={(e) => setUpdateValue({
                ...updateValue,
                salary: e.target.value
              })} />
            {/* <TextField variant="filled" size="small" label="Status" value={updateValue.status}
              onChange={(e) => setUpdateValue({
                ...updateValue,
                status: e.target.value
              })}
            /> */}
            <Select

              variant="filled"
              value={updateValue.status}
              label="Trạng thái"
              onChange={
                (event) =>

                  setUpdateValue({
                    ...updateValue,
                    status: event.target.value as string
                  })

              }
            >
              <MenuItem value={"sent"}>Đã gửi CV</MenuItem>
              <MenuItem value={"rejected"}>Từ Chối</MenuItem>
              <MenuItem value={"failed"}>Rớt</MenuItem>
              <MenuItem value={"interview"}>Phỏng Vấn</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(updateValue.submissionDate)}
                format='DD-MM-YY'
                label="Ngày nộp" onChange={(value) => setUpdateValue({
                  ...updateValue,
                  submissionDate: value
                })} />
            </LocalizationProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleUpdate(row._id)} >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
