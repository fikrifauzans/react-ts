import { lazy } from 'react';
import { Loader } from 'src/router';
import { EmployeeProvider } from 'src/contexts/EmployeeContext';

export const employeeRoute = (loader: any) => {
  const EmployeeList = Loader(
    lazy(() => import('src/pages/master/employee/EmployeeList'))
  );
  const EmployeeForm = Loader(
    lazy(() => import('src/pages/master/employee/EmployeeForm'))
  );

  return [
    {
      path: 'employee',
      element: (
        <EmployeeProvider>
          <EmployeeList />
        </EmployeeProvider>
      )
    },
    {
      path: 'employee/form',
      element: (
        <EmployeeProvider>
          <EmployeeForm />
        </EmployeeProvider>
      )
    },
    {
      path: 'employee/form/:id',
      element: (
        <EmployeeProvider>
          <EmployeeForm />
        </EmployeeProvider>
      )
    }
  ];
};
