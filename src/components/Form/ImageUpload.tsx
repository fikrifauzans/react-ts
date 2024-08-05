import React, { useState } from 'react';
import { Button, Avatar, Box } from '@mui/material';

interface ImageUploadProps {
  onImageUpload: (base64String: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageUpload(base64String.split(',')[1]); // remove the prefix `data:image/*;base64,`
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      onImageUpload(null);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
      <input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="profile-picture-upload"
      />
      <label htmlFor="profile-picture-upload">
        <Button variant="contained" component="span">
          Upload Profile Picture
        </Button>
      </label>
      {imagePreview && (
        <Avatar
          src={imagePreview}
          alt="Profile Picture"
          sx={{ width: 100, height: 100, marginTop: 2 }}
        />
      )}
    </Box>
  );
};

export default ImageUpload;
