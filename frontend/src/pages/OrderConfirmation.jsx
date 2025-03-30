import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    navigate('/cart');
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8,
        }}
      >
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Thank you for your purchase
        </Typography>

        <Paper sx={{ mt: 4, p: 3, width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography color="text.secondary">
              Order ID: {orderDetails.orderId}
            </Typography>
            <Typography color="text.secondary">
              Total Amount: ${orderDetails.amount.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;