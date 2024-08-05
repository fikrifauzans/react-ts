import React, { useState, ChangeEvent } from 'react';
import { useField } from 'formik';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';

interface ImageUploadFieldProps {
  label: string;
  name: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label, name }) => {
  const [field, meta, helpers] = useField(name);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        helpers.setValue({
          base64string: reader.result as string,
          fileName: file.name,
          type: file.type,
          size: file.size
        });
        setPreview(reader.result as string);
      };
    }
  };

  return (
    <Box>
      <Grid>
        <Card>
          <CardContent
            style={{
              padding: 10
            }}
          >
            {preview && (
              <Box>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px'
                  }}
                />
              </Box>
            )}
            <Grid container justifyContent="space-between">
              <Typography variant="h6" component="label" htmlFor={name}>
                {label}
              </Typography>
              <Button variant="contained" component="label">
                Upload File
                <input
                  id={name}
                  name={name}
                  type="file"
                  hidden
                  onChange={handleChange}
                />
              </Button>
            </Grid>

            {meta.touched && meta.error ? (
              <Typography color="error">{meta.error}</Typography>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default ImageUploadField;
