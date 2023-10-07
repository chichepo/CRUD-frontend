import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import TableComponent from './TableComponent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationDialog from './dialogs/ConfirmationDialog';

const columns = [
  { id: 'ProjectID', label: 'Project ID', minWidth: 100 },
  { id: 'ProjectCode', label: 'Project Code', minWidth: 100 },
  { id: 'CodeName', label: 'Code Name', minWidth: 100 },
  { id: 'CityId', label: 'City ID', minWidth: 100 },
  { id: 'Address', label: 'Address', minWidth: 100 },
  { id: 'GeographicalLocation', label: 'Geographical Location', minWidth: 150 },  // Assumes POINT is convertible to a string
  { id: 'ProjectManagerName', label: 'Project Manager', minWidth: 150 },
  { id: 'ProjectStatus', label: 'Project Status', minWidth: 150 },
  { id: 'NumberOfBuildings', label: '# of Buildings', minWidth: 100 },
  { id: 'NumberOfApartments', label: '# of Apartments', minWidth: 100 },
  { id: 'NumberOfAvailableApartments', label: '# of Available Apartments', minWidth: 150 },
  { id: 'GeneralInformation', label: 'General Information', minWidth: 150 },
  { id: 'CommunityProject', label: 'Is Community Project?', minWidth: 150 },
  { id: 'LuxuriousProject', label: 'Is Luxurious Project?', minWidth: 150 },
  { id: 'ApartmentRentalUnderSupervision', label: 'Is Rental Under Supervision?', minWidth: 200 },
  { id: 'RandomDrawStatus', label: 'Random Draw Status', minWidth: 150 },
  { id: 'PartnershipDetails', label: 'Partnership Details', minWidth: 150 }
];


const ProjectsTableComponent = ({ apiEndpoint }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingRow, setEditingRow] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [openNewRecordDialog, setOpenNewRecordDialog] = useState(false);
  const [newRecord, setNewRecord] = useState({ ProjectID: '', ProjectCode: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenNewRecordDialog = () => {
    setOpenNewRecordDialog(true);
  };

  const handleCloseNewRecordDialog = () => {
    setOpenNewRecordDialog(false);
  };

  const handleCreateNewRecord = async () => {
    try {
      const { ProjectID, ...restOfNewRecord } = newRecord;  // Destructure to exclude ProjectID
      const response = await axios.post(apiEndpoint, restOfNewRecord);
      if (response.data) {
        console.log('Data before:', data);
        console.log('New record:', response.data);
        setData(prevData => {
          console.log('Prev data:', prevData);
          return [...prevData, response.data];
        });
        console.log('Data after:', data);
      }
      setOpenNewRecordDialog(false);
    } catch (error) {
      console.error('An error occurred while creating a new record:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);  // Set loading to true when the API call starts
      try {
        const response = await axios.get(apiEndpoint);
        setData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
      setIsLoading(false);  // Set loading to false when the API call is complete
    };
    fetchData();
  }, [apiEndpoint]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = async (row) => {
    if (editingRow) {
      try {
        await axios.put(`${apiEndpoint}/${editingRow.ProjectID}`, { CityName: editedValue });
        setEditingRow(null); // Exit edit mode
      } catch (error) {
        console.error('An error occurred while updating data:', error);
      }
    } else {
      setEditingRow(row);
      setEditedValue(row.CityName);
    }
  };

  const handleConfirmClick = async () => {
    try {
      await axios.put(`${apiEndpoint}/${editingRow.ProjectID}`, { CityName: editedValue });
      const updatedData = data.map(row => {
        if (row.ProjectID === editingRow.ProjectID) {
          return { ...row, CityName: editedValue };
        }
        return row;
      });

      setData(updatedData);
      setEditingRow(null);

    } catch (error) {
      console.error('An error occurred while updating data:', error);
    }
  };

  const handleCancelClick = (row) => {
    setEditingRow(null);  // Exit edit mode
    setEditedValue(row.CityName);  // Reset the edited value to the original one
  };

  const handleOpenDialog = (row) => {
    setRowToDelete(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${apiEndpoint}/${rowToDelete.ProjectID}`);
      const updatedData = data.filter(row => row.ProjectID !== rowToDelete.ProjectID);
      setData(updatedData);
      setOpenDialog(false);
    } catch (error) {
      console.error('An error occurred while deleting data:', error);
    }
  };

  // Define actions for the dialog
  const dialogActions = [
    { label: 'Cancel', onClick: handleCloseDialog },
    { label: 'Confirm', onClick: handleConfirmDelete }
  ];

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={handleOpenNewRecordDialog}>
            Add New Record
          </Button>
          <TableComponent
            apiEndpoint={apiEndpoint}
            columns={columns}
            data={data}
            handleEditClick={handleEditClick}
            handleConfirmClick={handleConfirmClick}
            handleCancelClick={handleCancelClick}
            handleOpenDialog={handleOpenDialog}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            editingRow={editingRow}
            editedValue={editedValue}
            setEditedValue={setEditedValue}
          />
          {/* Add New Record Dialog */}
          <ConfirmationDialog
            open={openNewRecordDialog}
            handleClose={handleCloseNewRecordDialog}
            title="Add New Record"
            actions={[
              { label: 'Cancel', onClick: handleCloseNewRecordDialog },
              { label: 'Create', onClick: handleCreateNewRecord }
            ]}
          >
            <TextField
              margin="dense"
              label="Project Code"
              value={newRecord.ProjectCode}
              onChange={(e) => setNewRecord({ ...newRecord, ProjectCode: e.target.value })}
            />
          </ConfirmationDialog>
          
          {/* Delete Confirmation Dialog */}
          <ConfirmationDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            title="Delete Confirmation"
            actions={[
              { label: 'Cancel', onClick: handleCloseDialog },
              { label: 'Confirm', onClick: handleConfirmDelete }
            ]}
          >
            Are you sure you want to delete this row?
          </ConfirmationDialog>
        </>
      )}
    </>
  );
};

export default ProjectsTableComponent;
