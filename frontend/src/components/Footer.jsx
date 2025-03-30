import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Watch Shop
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your premier destination for luxury timepieces. Discover our curated collection
              of classic and modern watches.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/about" color="text.secondary" display="block">
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="text.secondary" display="block">
              Contact
            </Link>
            <Link component={RouterLink} to="/faq" color="text.secondary" display="block">
              FAQ
            </Link>
            <Link component={RouterLink} to="/shipping" color="text.secondary" display="block">
              Shipping Information
            </Link>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="text.secondary" display="block">
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="text.secondary" display="block">
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/returns" color="text.secondary" display="block">
              Return Policy
            </Link>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Subscribe to our newsletter for updates and exclusive offers.
            </Typography>
            <Box component="form" noValidate>
              <TextField
                size="small"
                fullWidth
                placeholder="Enter your email"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                fullWidth
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media Links */}
        <Box sx={{ pt: 4, display: 'flex', justifyContent: 'center' }}>
          <IconButton
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          © {new Date().getFullYear()} Watch Shop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;