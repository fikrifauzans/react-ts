import React from 'react';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadButton = ({ csvHeaders, employeeList }) => {
  return (
    <CSVLink
      headers={csvHeaders}
      data={employeeList}
      filename="employee_list.csv"
      style={{ textDecoration: 'none', marginLeft: '10px' }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        size="medium"
      >
        Download CSV
      </Button>
    </CSVLink>
  );
};

export default DownloadButton;
