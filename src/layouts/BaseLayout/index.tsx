import { FC, ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admin/employee');
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
