import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import OmegaMedBed from './pages/OmegaMedBed';
import EngineeringDocs from './pages/EngineeringDocs';
import BrightSteps from './pages/BrightSteps';
import SessionDashboard from './pages/SessionDashboard';
import KidsOs from './pages/KidsOs';
import InvestorPortalPage from './pages/InvestorPortalPage';
import TherapyLogs from './pages/TherapyLogs';
import DeviceStatus from './pages/DeviceStatus';
import UserProfile from './pages/UserProfile';
import QuickStart from './pages/QuickStart';
import CampaignDashboard from './pages/CampaignDashboard';
import ClinicalTrials from './pages/ClinicalTrials';
import RoutineManager from './pages/RoutineManager';
import SafetyCenter from './pages/SafetyCenter';
import DataInsights from './pages/DataInsights';
import ChildProgress from './pages/ChildProgress';
import HardwareGallery from './pages/HardwareGallery';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route path="/" element={<OmegaMedBed />} />
      <Route path="/engineering" element={<EngineeringDocs />} />
      <Route path="/brightsteps" element={<BrightSteps />} />
      <Route path="/dashboard" element={<SessionDashboard />} />
      <Route path="/kidsos" element={<KidsOs />} />
      <Route path="/investor-portal" element={<InvestorPortalPage />} />
      <Route path="/therapy-logs" element={<TherapyLogs />} />
      <Route path="/device-status" element={<DeviceStatus />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/quick-start" element={<QuickStart />} />
      <Route path="/campaign-dashboard" element={<CampaignDashboard />} />
      <Route path="/clinical-trials" element={<ClinicalTrials />} />
      <Route path="/routine-manager" element={<RoutineManager />} />
      <Route path="/safety-center" element={<SafetyCenter />} />
      <Route path="/data-insights" element={<DataInsights />} />
      <Route path="/child-progress" element={<ChildProgress />} />
      <Route path="/hardware-gallery" element={<HardwareGallery />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App