// Tablecomponent.js
import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const TableComponent = ({
  apiEndpoint,
  columns = [],
  data,
  handleEditClick,
  handleConfirmClick,
  handleCancelClick,
  handleOpenDialog,
  editingRow,
  editedValue,
  setEditedValue
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  if (editingRow === row && column.id === 'CityName') { // NEW: Check if this row is being edited
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <TextField value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell align="right">
                  {editingRow === row ? (
                    <>
                      <CheckCircleIcon onClick={() => handleConfirmClick()} style={{ cursor: 'pointer' }} />
                      <CancelIcon onClick={() => handleCancelClick(row)} style={{ cursor: 'pointer' }} />
                    </>
                  ) : (
                    <EditIcon onClick={() => handleEditClick(row)} style={{ cursor: 'pointer' }} />
                  )}
                  <DeleteIcon onClick={() => handleOpenDialog(row)} style={{ cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
