import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent
} from 'react';
import {
  getList,
  getDetail,
  createItem,
  updateItem,
  deleteItem
} from '../api/api';
import { Pagination } from 'src/utils/type/pagination';
import {
  Employee,
  EmployeeContextProps,
  EmployeeQuery,
  EmployeeFormValues
} from './interface/EmployeeContext';
import { useNavigate, useParams } from 'react-router';
import Papa from 'papaparse';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormikHelpers } from 'formik';
import { DeleteAction, EditAction } from 'src/components/Button/TableAction';
import Swal from 'sweetalert2';
import { Chip } from '@mui/material';
import { formatDate } from 'src/helper/date.helper';

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const useEmployee = (): EmployeeContextProps => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};

const RESOURCE = 'employees';

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [query, setQuery] = useState<EmployeeQuery>({
    limit: 10,
    page: 1,
    sortBy: 'id',
    sortOrder: 'desc',
    search: ''
  });
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 0,
    limit: 0,
    nextPage: 0,
    prevPage: 0,
    totalCount: 0,
    totalPages: 0,
    beginData: 0,
    endData: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<EmployeeFormValues>({
    name: '',
    number: 0,
    position: '',
    department: '',
    joinDate: '',
    status: '',
    photo: ''
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const routerPush = (url: string) => navigate(url);

  const fetchEmployees = async (q: Partial<EmployeeQuery> = {}) => {
    setLoading(true);
    try {
      const response = await getList(RESOURCE, { ...query, ...q });
      const { data, meta } = response;
      setPagination(meta.pagination);
      setEmployeeList(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const getDetailEmployee = async (id: number) => {
    setLoading(true);
    try {
      if (id) {
        const response = await getDetail(RESOURCE, id);
        const { data } = response;
        setInitialValues({
          name: data.name,
          number: data.number,
          position: data.position,
          department: data.department,
          joinDate: data.joinDate,
          status: data.status,
          photo: data.photo
        });
      } else {
        setInitialValues({
          name: null,
          number: null,
          position: null,
          department: null,
          joinDate: null,
          status: null,
          photo: null
        });
      }
    } catch (error) {
      console.error('Failed to fetch employee', error);
      toast.error('Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee: Employee) => {
    setLoading(true);
    try {
      const newEmployee = await createItem(RESOURCE, employee);
      setEmployeeList((prev) => [...prev, newEmployee]);
      toast.success('Employee added successfully');
    } catch (error) {
      console.error('Failed to add employee', error);
      toast.error('Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: number, employee: Employee) => {
    setLoading(true);
    try {
      const updatedEmployee = await updateItem(RESOURCE, id, employee);
      setEmployeeList((prev) =>
        prev.map((emp) => (emp.id === id ? updatedEmployee : emp))
      );
      toast.success('Employee updated successfully');
    } catch (error) {
      console.error('Failed to update employee', error);
      toast.error('Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await deleteItem(RESOURCE, id);
          setEmployeeList((prev) => prev.filter((emp) => emp.id !== id));
          Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
        } catch (error) {
          console.error('Failed to delete employee', error);
          toast.error('Failed to delete employee');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleImportCSV = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const importedData = results.data.map((item: any) => ({
            name: item.nama,
            number: item.nomor,
            position: item.jabatan,
            department: item.departmen,
            joinDate: item.tanggal_masuk,
            photo: item.foto,
            photoPath: null,
            status: item.status
          }));

          for (const employee of importedData) {
            try {
              await createItem(RESOURCE, employee);
            } catch (error) {
              console.error('Failed to import employee', error);
              toast.error(`Failed to import employee: ${employee.name}`);
            }
          }

          toast.success('Employees imported successfully');
          setLoading(false);
          fetchEmployees();
        }
      });
    }
  };

  const onPageChange = (e: ChangeEvent<unknown>, newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const onRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, limit: parseInt(e.target.value, 10) }));
  };

  const handleSubmit = async (values: EmployeeFormValues) => {
    console.log(values);
    setLoading(true);
    const employeeData = {
      id: id ? parseInt(id) : null,
      name: values.name,
      number: values.number,
      position: values.position,
      department: values.department,
      joinDate: new Date(values.joinDate),
      status: values.status,
      photo: values.photo,
      photoPath: values.photoPath
    };
    if (id) {
      await updateEmployee(parseInt(id), employeeData);
    } else {
      await addEmployee(employeeData);
    }
    setLoading(false);
    navigate('/admin/employee');
  };

  const handleSort = (column: string) => {
    const isAsc = query.sortBy === column && query.sortOrder === 'asc';
    setQuery({
      ...query,
      sortBy: column,
      sortOrder: isAsc ? 'desc' : 'asc'
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, search: event.target.value }));
  };

  useEffect(() => {
    getDetailEmployee(parseInt(id));
  }, [id]);

  const tableEmployeeColumn: Array<any> = [
    { name: 'id', query: 'id', label: 'ID', align: 'left', type: 'select' },
    { name: 'name', query: 'name', label: 'Name', align: 'left' },
    { name: 'number', query: 'number', label: 'Number', align: 'left' },
    {
      name: 'department',
      query: 'department',
      label: 'Department',
      align: 'left'
    },
    {
      name: 'joinDate',
      query: 'joinDate',
      label: 'Join Date',
      align: 'left',
      component: (v) => v.joinDate ? formatDate(v.joinDate) : ""
     },
    {
      name: 'status',
      query: 'status',
      label: 'Status',
      align: 'left',
      component: (v) => {
        switch (v.status) {
          case 'kontrak':
            return (
              <Chip
                style={{ minWidth: '150px' }}
                label={v?.status?.toUpperCase() ?? ''}
                color="primary"
              />
            );

          case 'tetap':
            return (
              <Chip
                style={{ minWidth: '150px' }}
                label={v?.status?.toUpperCase() ?? ''}
                color="info"
              />
            );

          case 'probation':
            return (
              <Chip
                style={{ minWidth: '150px' }}
                label={v?.status?.toUpperCase() ?? ''}
                color="warning"
              />
            );

          default:
            return '';
            break;
        }
      }
    },
    {
      name: 'photo',
      query: 'photo',
      label: 'photo',
      align: 'left',
      component: (data) => {
        return data.photo ? <img width={50} src={data.photo} /> : '';
      }
    },
    {
      name: 'action',
      query: 'action',
      label: 'Action',
      align: 'left',
      component: (val) => (
        <>
          <EditAction
            title="Edit Data Employee"
            onClick={() => routerPush(`/admin/employee/form/${val?.id}`)}
          />
          <DeleteAction
            title="Delete Data Employee"
            onClick={() => deleteEmployee(val?.id)}
          />
        </>
      )
    }
  ];

  useEffect(() => {
    fetchEmployees();
  }, [query]);

  return (
    <EmployeeContext.Provider
      value={{
        pagination,
        employeeList,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getDetailEmployee,
        onPageChange,
        onRowsPerPageChange,
        handleImportCSV,
        handleSubmit,
        loading,
        query,
        routerPush,
        tableEmployeeColumn,
        initialValues,
        handleSort,
        id,
        handleSearchChange
      }}
    >
      <ToastContainer />
      {children}
    </EmployeeContext.Provider>
  );
};
