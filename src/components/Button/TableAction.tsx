import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export const EditAction = ({ title, onClick }) => {
  const theme = useTheme();

  return (
    <Tooltip title={title} arrow>
      <IconButton
        sx={{
          '&:hover': {
            background: theme.colors.primary.lighter
          },
          color: theme.palette.primary.main
        }}
        color="inherit"
        size="small"
        onClick={onClick}
      >
        <EditTwoToneIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteAction = ({ title, onClick }) => {
  const theme = useTheme();

  return (
    <Tooltip title={title} arrow>
      <IconButton
        sx={{
          '&:hover': {
            background: theme.colors.error.lighter
          },
          color: theme.palette.error.main
        }}
        color="inherit"
        size="small"
        onClick={onClick}
      >
        <DeleteTwoToneIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};


