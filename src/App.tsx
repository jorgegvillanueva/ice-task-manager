import { Box, Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ice Task Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestión de tareas con modelo ICE (Impact × Confidence × Ease)
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
