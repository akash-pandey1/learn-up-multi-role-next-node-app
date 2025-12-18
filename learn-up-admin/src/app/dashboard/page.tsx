'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  People,
  School,
  Category,
  Label,
} from '@mui/icons-material';
import { usersAPI, programsAPI, categoriesAPI, tagsAPI } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    programs: 0,
    categories: 0,
    tags: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, programs, categories, tags] = await Promise.all([
          usersAPI.getUsers().catch(() => []),
          programsAPI.getPrograms().catch(() => ({ programs: [] })),
          categoriesAPI.getCategories().catch(() => []),
          tagsAPI.getTags().catch(() => []),
        ]);

        setStats({
          users: Array.isArray(users) ? users.length : 0,
          programs: programs?.programs?.length || programs?.length || 0,
          categories: Array.isArray(categories) ? categories.length : 0,
          tags: Array.isArray(tags) ? tags.length : 0,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: <People fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Programs',
      value: stats.programs,
      icon: <School fontSize="large" />,
      color: '#2e7d32',
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: <Category fontSize="large" />,
      color: '#ed6c02',
    },
    {
      title: 'Tags',
      value: stats.tags,
      icon: <Label fontSize="large" />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to Learn-Up Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.loading ? '...' : card.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color }}>{card.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

