
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage'
import CustomerFeedbackPage from './pages/CustomerFeedbackPage';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
       <Router>
      <Routes>
      <Route path="/" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
        {/* <Route path="/" element={<AdminDashboardPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feedback" element={<CustomerFeedbackPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthProvider>
);

export default App;
