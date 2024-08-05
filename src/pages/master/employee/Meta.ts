import * as Yup from 'yup';

interface MetaEmployeeInterface {
  appTitle: string,
  title: string,
  description: string,
  formUrl: string

}

export const MetaEmployee: MetaEmployeeInterface = {
  appTitle: "Master - Employee",
  title: "Master Employee",
  description: 'List master data employee',
  formUrl: "/admin/employee/form"
}



export const validationSchemaEmployee = Yup.object({
  name: Yup.string().required('Name is required'),
  number: Yup.number()
    .integer('Must be an integer')
    .required('Number is required'),
  position: Yup.string().required('Position is required'),
  department: Yup.string().required('Department is required'),
  joinDate: Yup.date().required('Join Date is required').nullable(),
  status: Yup.string().required('Status is required')
});
 
export const csvHeaders = [
  { label: 'Nama', key: 'name' },
  { label: 'Nomor', key: 'number' },
  { label: 'Jabatan', key: 'position' },
  { label: 'Departemen', key: 'department' },
  { label: 'Tanggal Masuk', key: 'joinDate' },
  { label: 'Foto', key: 'photo' },
  { label: 'Status', key: 'status' }
];


