import 'src/global.css';


import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'src/theme/theme-provider';
import { Toaster } from 'react-hot-toast';


// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const queryClient = new QueryClient()

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
