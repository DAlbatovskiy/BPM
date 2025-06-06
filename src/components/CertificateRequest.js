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
  Paper
} from '@mui/material';
import PersonalDataForm from './PersonalDataForm';

const certificates = [
  "Справка в военкомат",
  "Справка об обучении",
  "Справка для налогового вычета",
  "Форма 2-НДФЛ",
  "Справка по месту требования"
];

const CertificateRequest = () => {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [showPersonalForm, setShowPersonalForm] = useState(false);

  const handleCertificateSelect = () => {
    setShowPersonalForm(true);
  };

  const handleBack = () => {
    setShowPersonalForm(false);
  };

  const handleSubmit = (formData) => {
    // В будущем здесь будет интеграция с 1С
    console.log('Данные для отправки в 1С:', formData);
    
    // Через 2 секунды возвращаемся к выбору справки
    setTimeout(() => {
      setShowPersonalForm(false);
      setSelectedCertificate('');
    }, 2000);
  };

  if (showPersonalForm) {
    return (
      <PersonalDataForm
        certificateType={selectedCertificate}
        onSubmit={handleSubmit}
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
          Выберите необходимую справку
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            disabled={!selectedCertificate}
            onClick={handleCertificateSelect}
            sx={{ minWidth: 200 }}
          >
            Продолжить
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CertificateRequest; 