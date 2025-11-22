import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <CssBaseline />
    <Toaster position='top-right' richColors />
    <App />
  </>
  // </StrictMode>
);
