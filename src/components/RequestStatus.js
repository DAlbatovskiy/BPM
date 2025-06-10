import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Container,
  Paper,
  Button,
  Alert
} from '@mui/material';

const RequestStatus = ({ onBack }) => {
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // В будущем здесь будет запрос к 1С
    // Пока просто имитируем ответ
    const mockResponse = {
      requestId: requestId,
      status: 'В обработке',
      type: 'Справка в военкомат',
      createdAt: '2024-03-20',
      estimatedComplete: '2024-03-23'
    };

    setStatus(mockResponse);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Проверка статуса заявки
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Номер заявки"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              required
              variant="outlined"
              placeholder="Введите номер заявки"
            />
          </Box>

          {status && (
            <Alert severity="info" sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Статус заявки: <strong>{status.status}</strong>
              </Typography>
              <Typography variant="body2">
                Тип справки: {status.type}
              </Typography>
              <Typography variant="body2">
                Дата создания: {status.createdAt}
              </Typography>
              <Typography variant="body2">
                Ожидаемая дата готовности: {status.estimatedComplete}
              </Typography>
            </Alert>
          )}

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
              disabled={!requestId}
              sx={{ minWidth: 200 }}
            >
              Проверить статус
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RequestStatus; 