import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import React, { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default layout;
