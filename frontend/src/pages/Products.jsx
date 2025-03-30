import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  IconButton,
  Chip
} from '@mui/material';
import { AddShoppingCart as AddToCartIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const products = [
    {
      id: 1,
      name: 'Luxury Chronograph',
      price: 1299.99,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      description: 'Premium chronograph with sophisticated design',
      inStock: true
    },
    {
      id: 2,
      name: 'Diver Pro',
      price: 899.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg',
      description: 'Professional diving watch with 300m water resistance',
      inStock: true
    },
    {
      id: 3,
      name: 'Classic Gold',
      price: 2499.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/9981133/pexels-photo-9981133.jpeg',
      description: '18K gold case with premium leather strap',
      inStock: false
    },
    {
      id: 4,
      name: 'Smart Elite',
      price: 449.99,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      description: 'Advanced smartwatch with health monitoring',
      inStock: true
    },
    {
      id: 5,
      name: 'Minimalist Series',
      price: 299.99,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg',
      description: 'Clean design with Japanese movement',
      inStock: true
    },
    {
      id: 6,
      name: 'Sport Timer',
      price: 199.99,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg',
      description: 'Durable sports watch with chronometer',
      inStock: true
    }
  ];

  return (
    <Container>
      <Typography variant="h2" color="primary" gutterBottom sx={{ mb: 4 }}>
        Our Collection
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
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
                image={product.image}
                alt={product.name}
              />
              {!product.inStock && (
                <Chip
                  label="Out of Stock"
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Rating
                  name={`rating-${product.id}`}
                  value={product.rating}
                  precision={0.1}
                  readOnly
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddToCartIcon />}
                  disabled={!product.inStock}
                  fullWidth
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;