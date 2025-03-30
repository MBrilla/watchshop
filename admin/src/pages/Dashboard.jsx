import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { WatchOutlined as WatchIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const StatCard = ({ title, value, icon: Icon }) => (
  <Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Icon sx={{ mr: 1 }} />
      <Typography variant="h6" component="div">
        {title}
      </Typography>
    </Box>
    <Typography variant="h4" component="div">
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  // TODO: Fetch these values from the API
  const stats = {
    totalWatches: 24,
    totalRevenue: '$12,450',
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Total Watches"
            value={stats.totalWatches}
            icon={WatchIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={MoneyIcon}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;