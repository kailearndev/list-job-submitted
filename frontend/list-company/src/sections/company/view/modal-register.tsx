import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Select,
    MenuItem, DialogActions, Button
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';
import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { CompanyService } from 'src/services/company';


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
type ModalRegisterProps = {
    open: boolean;
    handleClose?: () => void // Prop open có kiểu boolean
};
const ModalRegister: React.FC<ModalRegisterProps> = ({ open, handleClose }) => {
    const queryClient = useQueryClient();

    const [updateValue, setUpdateValue] = useState<Omit<CompanyProps, "_id" | "createdAt">>({
        companyName: "",
        title: "",
        location: "",
        status: "",
        tech: "",
        salary: "",
        submissionDate: ""

    })
    const handleCreate = async () => {
        const res = await CompanyService.createCompany(updateValue)
        if (res) {
            queryClient.invalidateQueries({
                queryKey: ["company-list"]
            });
            toast.success("Created company success")
            setUpdateValue({
                companyName: "",
                title: "",
                location: "",
                status: "",
                tech: "",
                salary: "",
                submissionDate: ""
            })
            handleClose && handleClose()

        }

    }
    return (
        <Dialog
            fullWidth

            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Đăng Kí Công Ty Mới"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" display={"flex"} flexDirection={"column"} gap={3} py={2}>
                    <TextField variant="filled" size="small" label="Tên Công Ty" value={updateValue.companyName}
                        onChange={(e) => setUpdateValue({
                            ...updateValue,
                            companyName: e.target.value
                        })}
                    />
                    <TextField variant="filled" size="small" label="Vị trí tuyển" value={updateValue.title}
                        onChange={(e) => setUpdateValue({
                            ...updateValue,
                            title: e.target.value
                        })}

                    />
                    <Select

                        variant="filled"
                        value={updateValue.location}
                        label="Địa Chỉ"
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
                    <TextField variant="filled" size="small" label="Ngôn ngữ" value={updateValue.tech}

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

                    <Select
                        variant="filled"
                        value={updateValue.status}
                        label="Trạng Thái"
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
                        <DatePicker label="Ngày nộp"
                            format='DD-MM-YY'
                            onChange={(value) => setUpdateValue({
                                ...updateValue,
                                submissionDate: value
                            })} />
                    </LocalizationProvider>


                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate} >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalRegister;