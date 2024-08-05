import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent
} from 'react';
import { getList, createItem, updateItem, deleteItem } from '../api/api';
import { Pagination } from 'src/utils/type/pagination';
import {
  Employee,
  EmployeeContextProps,
  EmployeeQuery
} from './interface/EmployeeContext';
import { useNavigate } from 'react-router';
import Papa from 'papaparse';
import { EditAction } from 'src/components/Button/TableAction';

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
    page: 1
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
  const navigate = useNavigate();
  const routerPush = (url: string) => navigate(url);

  const fetchEmployees = async (q: Partial<EmployeeQuery> = {}) => {
    setLoading(true);
    try {
      const response = await getList(RESOURCE, { ...query, ...q });
      const { data, meta } = response;
      const { pagination } = meta;
      setPagination(pagination);
      setEmployeeList(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
    } finally {
      setLoading(false);
    }
  };

  const tableEmployeeColumn: Array<any> = [
    { name: 'id', query: 'id', label: 'id', align: 'left', type: 'select' },
    { name: 'name', query: 'name', label: 'Name', align: 'left' },
    { name: 'number', query: 'number', label: 'number', align: 'left' },
    {
      name: 'department',
      query: 'department',
      label: 'department',
      align: 'left'
    },
    { name: 'joinDate', query: 'joinDate', label: 'joinDate', align: 'left' },
    { name: 'status', query: 'status', label: 'status', align: 'left' },
    {
      name: 'action',
      query: 'action',
      label: 'Action',
      align: 'left',
      component: (val) => (
        <>
          <EditAction title="Edit Data Employee" onClick={() => routerPush(`/admin/employee/form/${val?.id}`)} />

        </>
      )
    }
  ];

  const addEmployee = async (employee: Employee) => {
    setLoading(true);
    try {
      const newEmployee = await createItem(RESOURCE, employee);
      setEmployeeList((prev) => [...prev, newEmployee]);
    } catch (error) {
      console.error('Failed to add employee', error);
      // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
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
    } catch (error) {
      console.error('Failed to update employee', error);
      // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    setLoading(true);
    try {
      await deleteItem(RESOURCE, id);
      setEmployeeList((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error('Failed to delete employee', error);
      // Tambahkan logika untuk menampilkan pesan kesalahan kepada pengguna
    } finally {
      setLoading(false);
    }
  };

  const handleImportCSV = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const importedData = results.data.map((item: any) => ({
            id: Date.now(),
            name: item.nama,
            number: item.nomor,
            position: item.jabatan,
            department: item.departemen,
            joinDate: item.tanggal_masuk,
            photo: item.foto,
            photoPath: null,
            status: item.Status
          }));
          console.log(importedData);
          // Tambahkan logika untuk menyimpan importedData ke state atau kirim ke server
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
        onPageChange,
        onRowsPerPageChange,
        handleImportCSV,
        loading,
        query,
        routerPush,
        tableEmployeeColumn
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
