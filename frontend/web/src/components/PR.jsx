import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Avatar, Box, List, ListItem, ListItemText, Typography, Divider, Badge, IconButton, Switch, Rating } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip, Legend);

const PR = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGraphBig, setIsGraphBig] = useState(false); // To track graph size
  const [darkMode, setDarkMode] = useState(false); // To toggle light/dark mode

  // Hardcoded user info for the sidebar
  const user = {
    name: 'Atharva Wakhare',
    rank: 'Elite',
    badges: ['Quiz Master', 'Accuracy Pro', 'Top Scorer'],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // Random image URL
    rating: 4.5,
  };

  // Theme toggling for dark and light mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // Toggle function for dark mode
  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_gmail_scores/?gmail=atharva@gmail.com'); // Replace with actual email
        const json = await response.json();
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data || !data.history) {
    return <p>No data available</p>;
  }

  // Process the data from the backend
  const scores = data.history.map((item) => item.score);
  const timestamps = data.history.map((item) => new Date(item.timestamp));

  // Prepare data for Chart.js
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Score Over Time',
        data: scores,
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'PPpp',
        },
        title: {
          display: true,
          text: 'Timestamp',
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score',
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        {/* Navbar with light/dark mode toggle */}
        <Box
          sx={{
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            boxShadow: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6">Dashboard</Typography>
          <IconButton onClick={handleModeChange} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: '300px',
              bgcolor: 'background.paper',
              p: 2,
              boxShadow: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h6" component="h2">
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Rank: {user.rank}
              </Typography>

              {/* Rating Stars */}
              <Rating value={user.rating} precision={0.5} readOnly />

              {/* Game Quiz Badges */}
              <List>
                <Divider />
                {user.badges.map((badge, index) => (
                  <ListItem key={index}>
                    <Badge badgeContent="🏆" color="primary">
                      <ListItemText primary={badge} />
                    </Badge>
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Box>

          {/* Main content */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              transition: 'all 0.3s ease',
              transform: isGraphBig ? 'scale(1.2)' : 'scale(1)', // Adjust based on graph size state
            }}
          >
            <motion.div
              className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsGraphBig(!isGraphBig)} // Toggle graph size on click
              whileHover={{ scale: 1.05 }} // Hover effect for graph
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Performance Over Time</h2>
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PR;
