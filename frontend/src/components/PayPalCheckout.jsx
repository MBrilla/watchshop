import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { loadPayPalScript } from '../config/paypal';

const PayPalCheckout = ({ amount, onSuccess, onError, onCancel }) => {
  const paypalButtonsRef = useRef(null);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let paypalInstance = null;
    const initializePayPal = async () => {
      try {
        if (isProcessing) return;
        paypalInstance = await loadPayPalScript();
        if (paypalButtonsRef.current) {
          // Clear any existing buttons
          paypalButtonsRef.current.innerHTML = '';
          
          // Create PayPal buttons
          paypalInstance.Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'paypal'
            },
            fundingSource: paypalInstance.FUNDING.PAYPAL,
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [{
                  amount: {
                    value: amount.toFixed(2),
                    currency_code: 'USD'
                  }
                }]
              });
            },
            onApprove: async (data, actions) => {
              if (isProcessing) return;
              setIsProcessing(true);
              try {
                console.log('Payment approved, attempting to capture order:', data);
                const order = await actions.order.capture();
                console.log('Capture result:', order);
                
                // Detailed payment status verification
                if (!order) {
                  throw new Error('Payment verification failed: No order data received');
                }

                if (!order.purchase_units?.[0]?.payments?.captures?.[0]) {
                  throw new Error('Payment verification failed: Missing capture information');
                }

                const capture = order.purchase_units[0].payments.captures[0];
                console.log('Payment capture details:', {
                  status: capture.status,
                  id: capture.id,
                  amount: capture.amount,
                  create_time: capture.create_time,
                  update_time: capture.update_time,
                  status_details: capture.status_details
                });

                // Handle various payment statuses
                switch(capture.status) {
                  case 'COMPLETED':
                    console.log('Payment capture verified successfully');
                    onSuccess({
                      ...order,
                      captureId: capture.id,
                      captureStatus: capture.status,
                      captureAmount: capture.amount,
                      createTime: capture.create_time,
                      updateTime: capture.update_time
                    });
                    break;
                  case 'PENDING':
                    const pendingReason = capture.status_details?.reason || 'Further verification needed';
                    console.log('Payment pending:', pendingReason);
                    throw new Error(`Payment is pending: ${pendingReason}. Please wait for confirmation.`);
                  case 'DECLINED':
                    console.log('Payment declined:', capture.status_details);
                    throw new Error('Payment was declined by PayPal. Please try a different payment method.');
                  case 'FAILED':
                    console.log('Payment failed:', capture.status_details);
                    throw new Error(`Payment failed: ${capture.status_details?.reason || 'Please check your payment details and try again'}`);
                  default:
                    console.log('Unexpected payment status:', capture.status, capture.status_details);
                    throw new Error(`Payment status: ${capture.status}. Please try again or contact support if the issue persists.`);
                }
              } catch (error) {
                console.error('PayPal Capture Error:', error);
                console.error('Error details:', {
                  message: error.message,
                  details: error.details || [],
                  stack: error.stack
                });
                onError(error);
              } finally {
                setIsProcessing(false);
              }
            },
            onError: (err) => {
              console.error('PayPal Error:', err);
              console.error('Error details:', {
                message: err.message,
                details: err.details || [],
                stack: err.stack
              });
              onError(err);
            },
            onCancel: () => {
              onCancel();
            }
          }).render(paypalButtonsRef.current);
        }
      } catch (error) {
        console.error('Failed to load PayPal:', error);
        onError(error);
      }
    };

    initializePayPal();
    
    return () => {
      const paypalScript = document.querySelector('script[src*="paypal"]');
      if (paypalScript) {
        paypalScript.remove();
      }
      if (paypalButtonsRef.current) {
        paypalButtonsRef.current.innerHTML = '';
      }
    };
  }, [amount, onSuccess, onError, onCancel, isProcessing]);

  return (
    <Box
      ref={paypalButtonsRef}
      sx={{
        width: '100%',
        minHeight: 44,
        '& iframe': {
          minHeight: 44,
        }
      }}
    />
  );
};

export default PayPalCheckout;