import React from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const UploadButton = ({ handleImportCSV }) => {
  return (
    <>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="import-csv"
        type="file"
        onChange={handleImportCSV}
      />
      <label htmlFor="import-csv">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
          size="medium"
        >
          Upload CSV
        </Button>
      </label>
    </>
  );
};

export default UploadButton;
