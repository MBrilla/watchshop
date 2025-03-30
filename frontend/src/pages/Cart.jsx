import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import PayPalCheckout from '../components/PayPalCheckout';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, calculateTotal, clearCart } = useCart();
  const [showPaypal, setShowPaypal] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  if (cartItems.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Your cart is empty
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/products"
        sx={{ mt: 2 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );

  return (
    <Container>
      <Typography variant="h2" color="primary" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: 'flex',
                  mb: 2,
                  position: 'relative',
                  transition: theme => theme.transitions.create(['transform', 'opacity', 'box-shadow'], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut
                  }),
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.6)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      size="small"
                      sx={{ mt: -1 }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mt: 'auto',
                    }}
                  >
                    <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      sx={{ mx: 2, minWidth: '40px', textAlign: 'center' }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              position: 'sticky',
              top: 24,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Shipping</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">Free</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            {!showPaypal ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={() => setShowPaypal(true)}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Box sx={{ mt: 3 }}>
                <PayPalCheckout
                  amount={calculateTotal()}
                  onSuccess={(order) => {
                    if (isPaymentProcessing) return;
                    setIsPaymentProcessing(true);
                    try {
                      const orderDetails = {
                        orderId: order.id,
                        amount: calculateTotal(),
                        captureId: order.captureId,
                        paymentStatus: order.captureStatus,
                        transactionDate: new Date().toISOString()
                      };
                      clearCart();
                      setShowPaypal(false);
                      navigate('/order-confirmation', {
                        state: { orderDetails },
                        replace: true
                      });
                    } catch (error) {
                      console.error('Navigation error:', error);
                      setNotification({
                        open: true,
                        message: 'Error processing order. Please try again.',
                        severity: 'error'
                      });
                    } finally {
                      setIsPaymentProcessing(false);
                    }
                  }}
                  onError={(error) => {
                    console.error('PayPal Error:', error);
                    setNotification({
                      open: true,
                      message: 'Payment failed. Please try again.',
                      severity: 'error'
                    });
                    setShowPaypal(false);
                  }}
                  onCancel={() => {
                    setNotification({
                      open: true,
                      message: 'Payment cancelled.',
                      severity: 'info'
                    });
                    setShowPaypal(false);
                  }}
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;