import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableEmptyRows } from '../table-empty-rows';
import { UserTableHead } from '../user-table-head';
import { UserTableRow } from '../user-table-row';
import { emptyRows } from '../utils';


import { CircularProgress, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CompanyService } from 'src/services/company';
import { TableNoData } from '../table-no-data';
import ModalRegister from './modal-register';

// ----------------------------------------------------------------------

type Filter = {
  limit: number
  page: number
}

export function CompanyView() {
  const [open, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<Filter>({
    limit: 10,
    page: 1
  })
  const table = useTable();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company-list', filter],
    queryFn: () => CompanyService.getCompany(filter),
  })
  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({
      ...prev,
      page: newPage, // Material-UI Pagination sử dụng base 1, giữ nguyên value
    }));
  };


  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Danh Sách Công Ty Nộp Phỏng Vấn
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Tạo mới
        </Button>
      </Box>

      <Card>
        {/* <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table  >
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'companyName', label: 'Tên Công Ty' },
                  { id: 'title', label: 'Tiêu Đề Job' },
                  { id: 'location', label: 'Địa Chỉ' },
                  { id: 'status', label: 'Trạng Thái' },
                  { id: 'tech', label: 'Ngôn Ngữ' },
                  { id: 'salary', label: 'Lương' },
                  { id: 'submissionDate', label: 'Ngày Nộp' },
                  { id: '', label: 'Sửa/Xóa' },
                ]}
              />
              <TableBody >
                {data?.data
                  .map((row: any) => (
                    <UserTableRow

                      key={row.id}
                      row={row}
                    // selected={table.selected.includes(row.id)}
                    // onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}



                {!data?.data.length && <TableNoData searchQuery='' />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Box display={"flex"} alignItems={"flex-end"} justifyContent={"flex-end"} p={3}>
          <Pagination
            page={data?.pagination.currentPage || 0} // Đặt giá trị mặc định là 1 nếu currentPage không có
            count={data?.pagination.totalPages || 0} // Tổng số trang
            onChange={(event, value) => handlePageChange(value)} // Gửi value (1-based) khi nhấn nút
          />
        </Box>

      </Card>
      <ModalRegister open={open} handleClose={() => setOpen(false)} />
    </DashboardContent >
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );


  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
