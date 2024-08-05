import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CardHeader,
  Card,
  TablePagination,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useEmployee } from 'src/contexts/EmployeeContext';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/components/PageHeader/PageHeader';
import AddButton from 'src/components/Button/AddButton';
import TableGeneral from 'src/components/Table/Table';
import AppTitle from 'src/components/AppTitle/AppTitle';
import { defaultRowPerPageOptions } from 'src/utils/type/pagination';
import { MetaEDashboard } from './Meta';
import CardDashboardGrid from './components/Card';
import DepartemenCart from './components/DepartmentCart';

const EmployeeList: React.FC = () => {
  const {
    employeeList,
    fetchEmployees,
    deleteEmployee,
    pagination,
    onPageChange,
    onRowsPerPageChange,
    routerPush
  } = useEmployee();

  useEffect(() => {
    fetchEmployees({ limit: 0, page: 0 });
  }, []);

  return (
    <>
      <AppTitle meta={MetaEDashboard} />
      <PageHeader meta={MetaEDashboard} action={''} />
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={MetaEDashboard.title} />
          <Divider />
          <CardContent>
            <Grid container spacing={4}>
              <CardDashboardGrid
                title="Employee"
                description="Total Employee"
                value={employeeList?.length}
                unit="Persons"
              />
              <CardDashboardGrid
                title="Contract Employee"
                description="Total Contract Employee"
                value={employeeList?.filter((v: any) => v.status === 'kontrak').length}
                unit="Persons"
              />
              <CardDashboardGrid
                title="Permanent Employee"
                description="Total Permanent Employee"
                value={employeeList?.filter((v: any) => v.status === 'tetap').length}
                unit="Persons"
              />
              <CardDashboardGrid
                title="Probation Employee"
                description="Total Probation Employee"
                value={employeeList?.filter((v: any) => v.status === 'probation').length}
                unit="Persons"
              />
              {employeeList && <DepartemenCart data={employeeList} />}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default EmployeeList;
