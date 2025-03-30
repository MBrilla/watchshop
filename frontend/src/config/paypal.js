// Use sandbox client ID for testing
export const PAYPAL_CLIENT_ID = 'AZ1Y3Dl2eJWRQMjmkcI87EcIHWpm1aRezyDFgAr9y7QpOfMSTpup7dENAFeNJtKRLBkhSwKjhrVKzo8p';

// Initialize PayPal script
export const loadPayPalScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&debug=true`;
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
    document.body.appendChild(script);
  });
};