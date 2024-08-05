import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CardHeader,
  Card,
  TablePagination,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useEmployee } from 'src/contexts/EmployeeContext';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { csvHeaders, MetaEmployee } from './Meta';
import AddButton from 'src/components/Button/AddButton';
import TableGeneral from 'src/components/Table/Table';
import AppTitle from 'src/components/AppTitle/AppTitle';
import { CSVLink } from 'react-csv';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

const EmployeeList: React.FC = () => {
  const {
    employeeList,
    fetchEmployees,
    pagination,
    onPageChange,
    onRowsPerPageChange,
    handleImportCSV,
    loading,
    routerPush,
    tableEmployeeColumn
  } = useEmployee();

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <AppTitle meta={MetaEmployee} />
      <PageHeader
        meta={MetaEmployee}
        action={
          <AddButton onclick={() => routerPush(MetaEmployee.formUrl)}>
            Add Data
          </AddButton>
        }
      />
      <Container maxWidth="lg">
        <Card>
          <CardHeader
            title={MetaEmployee.title}
            action={
              <div>
                <input
                  accept=".csv"
                  style={{ display: 'none' }}
                  id="import-csv"
                  type="file"
                  onChange={handleImportCSV}
                />
                <label htmlFor="import-csv">
                  <IconButton color="primary" component="span">
                    <UploadIcon />
                  </IconButton>
                </label>
                <CSVLink
                  headers={csvHeaders}
                  data={employeeList}
                  filename="employee_list.csv"
                  style={{ textDecoration: 'none' }}
                >
                  <IconButton color="primary">
                    <DownloadIcon />
                  </IconButton>
                </CSVLink>
              </div>
            }
          />
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableGeneral column={tableEmployeeColumn} data={employeeList} />
              <Box p={2}>
                <TablePagination
                  component="div"
                  page={pagination.currentPage - 1}
                  rowsPerPage={pagination.limit}
                  rowsPerPageOptions={[5, 10, 25]}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  count={pagination.totalCount}
                />
              </Box>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default EmployeeList;
