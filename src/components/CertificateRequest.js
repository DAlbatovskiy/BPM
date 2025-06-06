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
  Box,
  Container,
  Paper,
  Stack
} from '@mui/material';
import PersonalDataForm from './PersonalDataForm';
import RequestStatus from './RequestStatus';

const certificates = [
  "Справка в военкомат",
  "Справка об обучении",
  "Справка для налогового вычета",
  "Форма 2-НДФЛ",
  "Справка по месту требования"
];

const CertificateRequest = () => {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'form', 'status'

  const handleCertificateSelect = () => {
    setCurrentScreen('form');
  };

  const handleBack = () => {
    setCurrentScreen('main');
    setSelectedCertificate('');
  };

  const handleSubmit = (formData) => {
    // В будущем здесь будет интеграция с 1С
    console.log('Данные для отправки в 1С:', formData);
    
    // Через 2 секунды возвращаемся к выбору справки
    setTimeout(() => {
      setCurrentScreen('main');
      setSelectedCertificate('');
    }, 2000);
  };

  if (currentScreen === 'form') {
    return (
      <PersonalDataForm
        certificateType={selectedCertificate}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === 'status') {
    return (
      <RequestStatus
        onBack={handleBack}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Заказ справок
        </Typography>
        <Typography variant="body1" gutterBottom align="center" color="text.secondary">
          Выберите необходимую справку или проверьте статус существующей заявки
        </Typography>
        
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

        <Stack spacing={2} direction="column" alignItems="center">
          <Button
            variant="contained"
            size="large"
            disabled={!selectedCertificate}
            onClick={handleCertificateSelect}
            sx={{ minWidth: 200 }}
          >
            Продолжить
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => setCurrentScreen('status')}
            sx={{ minWidth: 200 }}
          >
            Проверить статус заявки
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CertificateRequest; 