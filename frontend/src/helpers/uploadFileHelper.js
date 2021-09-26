import axios from 'axios';

const uploadFileHelper = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('/api/upload', formData, config);

    return {
      data,
      text: 'Image uploaded successfully',
      severity: 'success',
    };
  } catch (error) {
    console.error(error);
    return { data: '', text: error, severity: 'error' };
  }
};

export default uploadFileHelper;
