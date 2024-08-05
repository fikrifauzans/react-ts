import { lazy } from 'react';
import { Loader } from 'src/router';
import { EmployeeProvider } from 'src/contexts/EmployeeContext';

export const dashboardRoute = (loader: any) => {
  const DashboardPage = Loader(
    lazy(() => import('src/pages/dashboard/Index'))
  );

  return [
    {
      path: 'dashboard',
      element: (
        <EmployeeProvider>
          <DashboardPage />
        </EmployeeProvider>
      )
    },
  
  ];
};
