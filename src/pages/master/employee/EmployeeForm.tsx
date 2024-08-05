import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Avatar,
  Grid
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEmployee } from 'src/contexts/EmployeeContext';
import { MetaEmployee, validationSchemaEmployee } from './Meta';
import AppTitle from 'src/components/AppTitle/AppTitle';
import PageHeader from 'src/components/PageHeader/PageHeader';
import FormCard from 'src/components/Card/FormCard';

import { useParams, useNavigate } from 'react-router-dom';
import ImageUpload from 'src/components/Form/ImageUpload';

export const EmployeeForm: React.FC = () => {
  const { addEmployee, updateEmployee, employeeList, fetchEmployees } =
    useEmployee();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    number: 0,
    position: '',
    department: '',
    joinDate: '',
    status: ''
  });
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleImageUpload = (base64String: string | null) => {
    setImageBase64(base64String);
  };

  return (
    <>
      <AppTitle meta={MetaEmployee} />
      <PageHeader meta={MetaEmployee} action={null} />

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchemaEmployee}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          const employeeData = {
            id: id ? parseInt(id) : null,
            name: values.name,
            number: values.number,
            position: values.position,
            department: values.department,
            joinDate: new Date(values.joinDate),
            status: values.status,
            photo: imageBase64
          };
          if (id) {
            await updateEmployee(parseInt(id), employeeData);
          } else {
            await addEmployee(employeeData);
          }
          setLoading(false);
          resetForm();
          setImageBase64(null);
          navigate('/admin/employee'); 
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormCard title="Form Employee">
              <Grid container>
                <Grid xs={6}>
                  <Box marginBottom={2}>
                    <Field
                      as={TextField}
                      label="Name"
                      name="name"
                      fullWidth
                      error={touched.name && !!errors.name}
                      helperText={<ErrorMessage name="name" />}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <Field
                      as={TextField}
                      label="Number"
                      name="number"
                      type="number"
                      fullWidth
                      error={touched.number && !!errors.number}
                      helperText={<ErrorMessage name="number" />}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <Field
                      as={TextField}
                      label="Position"
                      name="position"
                      fullWidth
                      error={touched.position && !!errors.position}
                      helperText={<ErrorMessage name="position" />}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <Field
                      as={TextField}
                      label="Department"
                      name="department"
                      fullWidth
                      error={touched.department && !!errors.department}
                      helperText={<ErrorMessage name="department" />}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <Field
                      as={TextField}
                      label="Join Date"
                      name="joinDate"
                      type="date"
                      fullWidth
                      error={touched.joinDate && !!errors.joinDate}
                      helperText={<ErrorMessage name="joinDate" />}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <Field
                      as={TextField}
                      label="Status"
                      name="status"
                      fullWidth
                      error={touched.status && !!errors.status}
                      helperText={<ErrorMessage name="status" />}
                    />
                  </Box>
                </Grid>
                <Grid xs={6}>
                  <ImageUpload onImageUpload={handleImageUpload} />
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="end" alignItems="end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : id ? (
                    'Update Employee'
                  ) : (
                    'Add Employee'
                  )}
                </Button>
              </Box>
            </FormCard>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EmployeeForm;
