import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Container,
  Paper,
  Collapse,
  Grid
} from '@mui/material';

const certificates = [
  "Справка в военкомат",
  "Справка об обучении",
  "Справка для налогового вычета",
  "Форма 2-НДФЛ",
  "Справка по месту требования"
];

const CertificateRequest = () => {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    group: '',
    studentId: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Здесь будет логика отправки запроса в 1С
    console.log('Заказана справка:', {
      type: selectedCertificate,
      ...formData
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Заказ справок
        </Typography>
        <Typography variant="body1" gutterBottom align="center" color="text.secondary">
          Выберите необходимую справку и заполните данные
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Тип справки:
            </Typography>
            <RadioGroup
              value={selectedCertificate}
              onChange={(e) => setSelectedCertificate(e.target.value)}
            >
              {certificates.map((certificate) => (
                <Card key={certificate} sx={{ mb: 2 }}>
                  <CardContent>
                    <FormControlLabel
                      value={certificate}
                      control={<Radio />}
                      label={certificate}
                    />
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </FormControl>

          <Collapse in={selectedCertificate !== ''}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Персональные данные:
              </Typography>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Дополнительная информация"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!selectedCertificate || !formData.lastName || !formData.firstName || !formData.group || !formData.studentId}
              sx={{ minWidth: 200 }}
            >
              Заказать справку
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CertificateRequest; 