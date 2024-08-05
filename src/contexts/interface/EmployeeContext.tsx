import { Pagination } from 'src/utils/type/pagination';

export interface Employee {
  id: number;
  name: string;
  number: number;
  position: string;
  department: string;
  joinDate: Date;
  photo?: string;
  photoPath?: any;
  status: string;
 
}

export interface EmployeeQuery {
  limit: number;
  page: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search: string;

}

export interface EmployeeFormValues {
  name: string;
  number: number;
  position: string;
  department: string;
  joinDate: string; // Using string for date input compatibility
  status: string;
  photo: string;
  photoPath?: any;
}

export interface EmployeeContextProps {
  query: EmployeeQuery;
  pagination: Pagination;
  employeeList: Employee[];
  fetchEmployees: (query?: Record<string, any>) => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (id: number, employee: Employee) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  getDetailEmployee: (id: number) => Promise<void>;
  onPageChange: (e: React.ChangeEvent<unknown>, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImportCSV: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (values: EmployeeFormValues) => Promise<void>;
  loading: boolean;
  routerPush: (url: string) => void;
  tableEmployeeColumn: Array<any>;
  initialValues: EmployeeFormValues;
  id: any;
  handleSort: (string) => void
  handleSearchChange: (any) => void
}
