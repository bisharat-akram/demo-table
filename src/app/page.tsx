"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { fetchUsersData } from '../axios/usersApi'

interface TableDataInterface {
  name: string
  age: number
  hourlyRate: number,
}

// This component shows the table with sorting and pagination
export default function DataTable() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [tableData, setTableData] = React.useState<TableDataInterface[]>([])
  const [pageSize, setPageSize] = React.useState<number>(5)
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [sorting, setSorting] = React.useState<string>('rate')

  const setUsersData = async () => {
    setIsLoading(true)
    const data = await fetchUsersData(pageSize, currentPage, sorting)
    setTableData(data?.data || [])
    setIsLoading(false)
    setTotalPages(data?.totalPages)
  }

  React.useEffect(() => {
    setUsersData()
  }, [currentPage, sorting])

  const handleSortingChange = (event: SelectChangeEvent) => {
    setCurrentPage(1)
    setSorting(event.target.value)
  }

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value)
  }

  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
      {isLoading && 
        (<div className="loader-container">
          <div className="loader"/>
        </div>)
      }
      <div style={{ width: '60%'}} className='bg-white'>
        <div className='w-[60%] text-black p-4 flex gap-4'>
          <div className='flex items-center'>
            <p>
              Sort:
            </p>
          </div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={sorting}
            onChange={handleSortingChange}
            >
              <MenuItem value={'rate'}>Rate (Low to High)</MenuItem>
              <MenuItem value={'-rate'}>Rate (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Hourly Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.hourlyRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='flex items-center justify-center'>
          <Stack spacing={4} className='p-4'>
            <Pagination count={totalPages} onChange={handlePageChange}/>
          </Stack>
        </div>
      </div>
    </div>
  );
}