import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container
} from '@mui/material';

const Home = () => {
  const featuredCollections = [
    {
      title: 'Luxury Collection',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      description: 'Discover our premium selection of luxury timepieces'
    },
    {
      title: 'Sport Collection',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      description: 'Performance watches for the active lifestyle'
    },
    {
      title: 'Classic Collection',
      image: 'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg',
      description: 'Timeless designs that never go out of style'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            color="common.white"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
            }}
          >
            Luxury Timepieces
          </Typography>
          <Typography
            variant="h4"
            color="common.white"
            gutterBottom
            sx={{
              maxWidth: '600px',
              mb: 4,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Discover our exclusive collection of premium watches
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/products"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              py: { xs: 1, md: 1.5 },
              px: { xs: 3, md: 4 },
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Featured Collections */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" color="primary" gutterBottom align="center">
          Featured Collections
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {featuredCollections.map((collection, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: theme => theme.transitions.create(['transform', 'box-shadow'], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut
                  }),
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.6)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={collection.image}
                  alt={collection.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {collection.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {collection.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    href="/products"
                  >
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;