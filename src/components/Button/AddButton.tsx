import { AddTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

export default function AddButton({ children, onclick }) {
  return (
    <Button
      sx={{ mt: { xs: 2, md: 0 } }}
      variant="contained"
      startIcon={<AddTwoTone fontSize="small" />}
      onClick={onclick}
    >
      {children}
    </Button>
  );
}
