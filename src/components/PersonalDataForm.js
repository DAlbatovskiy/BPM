import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Container,
  Paper,
  Grid,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const PersonalDataForm = ({ certificateType, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    group: '',
    studentId: '',
    comment: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Формируем JSON с данными заявки
    const requestData = {
      certificateType,
      studentInfo: {
        lastName: formData.lastName,
        firstName: formData.firstName,
        middleName: formData.middleName,
        group: formData.group,
        studentId: formData.studentId
      },
      comment: formData.comment,
      requestDate: new Date().toISOString()
    };

    // Выводим JSON в консоль (для демонстрации)
    console.log('Сформированная заявка:', JSON.stringify(requestData, null, 2));

    // Показываем уведомление об успехе
    setOpenSnackbar(true);

    // Передаем данные наверх (если нужно)
    onSubmit(requestData);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Заказ справки
        </Typography>
        <Typography variant="h6" gutterBottom align="center" color="text.secondary">
          {certificateType}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Фамилия"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Имя"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Отчество"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Группа"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Номер студенческого билета"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Комментарий"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            sx={{ mb: 4 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={onBack}
              sx={{ minWidth: 200 }}
            >
              Назад
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!formData.lastName || !formData.firstName || !formData.group || !formData.studentId}
              sx={{ minWidth: 200 }}
            >
              Заказать справку
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Заявка на справку успешно сформирована!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PersonalDataForm; 