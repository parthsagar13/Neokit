import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { LandingPage } from '@/pages/LandingPage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { TemplateDetailsPage } from '@/pages/TemplateDetailsPage';
import { PreviewPage } from '@/pages/PreviewPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { SuccessPage } from '@/pages/SuccessPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
  UserDashboardPage,
  DownloadsPage,
  ProfilePage,
} from '@/pages/user/UserDashboardPage';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminTemplates } from '@/pages/admin/AdminTemplates';
import { UploadTemplate } from '@/pages/admin/UploadTemplate';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:slug" element={<TemplateDetailsPage />} />
          <Route path="/preview/:slug" element={<PreviewPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/:slug" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />

          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/dashboard/downloads" element={<DownloadsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="templates" element={<AdminTemplates />} />
              <Route path="templates/upload" element={<UploadTemplate />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
