import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>{children}</Box>
      <Button variant="contained" startIcon={<EditIcon />} color="secondary">
        Edit
      </Button>
      &nbsp;
      <Button variant="contained">Test</Button>
    </Container>
  );
}
