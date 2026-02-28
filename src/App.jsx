import { message, Skeleton } from "antd";
import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const UserLayout = lazy(() => import("./layout/UserLayout"));
const ProductDetail = lazy(() => import("./pages/users/ProductDetail"));
const CategoryProductsPage = lazy(() => import("./pages/users/CategoryProductsPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  window.globalMessage = messageApi;

  return (
    <>
      {contextHolder}
      <Suspense fallback={<Skeleton active />}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<CategoryProductsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;