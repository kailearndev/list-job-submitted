import { lazy, ReactNode, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const CompanyPage = lazy(() => import('src/pages/company'));

export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

interface Token {
  accessToken: string
  role: string[]
}

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

const ProtectedRoute: React.FC<{ allowedRoles: string[]; children: React.ReactNode }> = ({ allowedRoles, children }): JSX.Element => {
  const authData = localStorage.getItem("token");
  // Parse token
  const data: Token = authData ? JSON.parse(authData) : { accessToken: "", role: [] };
  const role = data.role.at(0) || ""; // Lấy vai trò đầu tiên, hoặc chuỗi rỗng nếu không có

  // Nếu không có accessToken, chuyển hướng đến trang đăng nhập
  if (!authData) {
    return <Navigate to="/sign-in" replace />;
  }

  // Nếu vai trò không có trong danh sách cho phép, chuyển hướng đến 404
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/404" replace />;
  }
  return <>{children}</>;

};




export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [

        {
          index: true,
          element: (
            <ProtectedRoute allowedRoles={['admin', "user"]} >
              <HomePage />
            </ProtectedRoute>
          ),


        },
        {
          path: 'user',
          element: (
            <ProtectedRoute allowedRoles={['admin']}>
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {

          path: 'company',
          element: (


            <ProtectedRoute allowedRoles={['user']}>
              <CompanyPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoute allowedRoles={['admin', "user"]}>
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'blog',
          element: (
            <ProtectedRoute allowedRoles={['admin', 'user']}>
              <BlogPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
