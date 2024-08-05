import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CardHeader,
  Card,
  TablePagination,
  CircularProgress
} from '@mui/material';
import { useEmployee } from 'src/contexts/EmployeeContext';
import { csvHeaders, MetaEmployee } from './Meta';
import PageHeader from 'src/components/PageHeader/PageHeader';
import AddButton from 'src/components/Button/AddButton';
import TableGeneral from 'src/components/Table/Table';
import AppTitle from 'src/components/AppTitle/AppTitle';
import UploadButton from 'src/components/Button/UploadButton';
import DownloadButton from 'src/components/Button/DownloadButton';

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
    tableEmployeeColumn,
    query,
    handleSort
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
              <>
                <UploadButton handleImportCSV={handleImportCSV} />
                <DownloadButton
                  csvHeaders={csvHeaders}
                  employeeList={employeeList}
                />
              </>
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
              <TableGeneral
                sortOrder={query.sortOrder}
                orderBy={query.sortBy}
                column={tableEmployeeColumn}
                data={employeeList}
                handleSort={handleSort}
              />
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
