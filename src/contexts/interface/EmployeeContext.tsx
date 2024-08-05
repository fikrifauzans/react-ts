import { Pagination } from 'src/utils/type/pagination';

export interface Employee {
  id: number;
  name: string;
  number: number;
  position: string;
  department: string;
  joinDate: Date;
  photo?: string;
  photoPath?: string;
  status: string;
}

export interface EmployeeQuery {
  limit: number;
  page: number;
}

export interface EmployeeContextProps {
  query: EmployeeQuery;
  pagination: Pagination;
  employeeList: Employee[];
  fetchEmployees: (query?: Record<string, any>) => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (id: number, employee: Employee) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  onPageChange: (e: React.ChangeEvent<unknown>, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImportCSV: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  routerPush: (url: string) => void;
  tableEmployeeColumn: any
}
