import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routers/AppRoutes";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
