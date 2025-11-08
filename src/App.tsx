import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routers/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // gcTime: QUERY_CACHE_TIME_DEFAULT,
      retry: 3,
    },
    mutations: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
