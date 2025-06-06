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
  Paper
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
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Здесь будет логика отправки запроса в 1С
    console.log('Заказана справка:', selectedCertificate, 'комментарий:', comment);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Заказ справок
        </Typography>
        <Typography variant="body1" gutterBottom align="center" color="text.secondary">
          Выберите необходимую справку и укажите дополнительную информацию
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

          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Дополнительная информация"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!selectedCertificate}
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