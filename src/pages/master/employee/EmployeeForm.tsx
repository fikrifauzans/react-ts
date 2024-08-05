import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEmployee } from 'src/contexts/EmployeeContext';
import { MetaEmployee, validationSchemaEmployee } from './Meta';
import AppTitle from 'src/components/AppTitle/AppTitle';
import PageHeader from 'src/components/PageHeader/PageHeader';
import FormCard from 'src/components/Card/FormCard';
import ImageUpload from 'src/components/Form/ImageUpload';
import SuspenseLoader from 'src/components/SuspenseLoader';

export const EmployeeForm: React.FC = () => {
  const { handleSubmit, initialValues, loading, id } = useEmployee();
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageUpload = (base64String: string | null) => {
    setImageBase64(base64String);
  };

  return (
    <>
      <AppTitle meta={MetaEmployee} />
      <PageHeader meta={MetaEmployee} action={null} />
      {loading ? (
        <SuspenseLoader />
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchemaEmployee}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched,values }) => (
            <Form>
              <FormCard title="Form Employee">
                <Grid container>
                  <Grid item xs={6}>
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
                        select
                        SelectProps={{
                          native: true
                        }}
                        fullWidth
                        error={touched.department && !!errors.department}
                        helperText={<ErrorMessage name="department" />}
                      >
                        <option value="" />
                        <option value="Marketing">Marketing</option>
                        <option value="Tech">Tech</option>
                        <option value="Customer Service">
                          Customer Service
                        </option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                      </Field>
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
                        select
                        SelectProps={{
                          native: true
                        }}
                        fullWidth
                        error={touched.status && !!errors.status}
                        helperText={<ErrorMessage name="status" />}
                      >
                        <option value="" />
                        <option value="kontrak">Kontrak</option>
                        <option value="tetap">Tetap</option>
                        <option value="probation">Probation</option>
                      </Field>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid p={3}>
                      <ImageUpload label="Upload Image" name="photoPath"  defaultView={values.photo}/>
                    </Grid>
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
      )}
    </>
  );
};

export default EmployeeForm;
