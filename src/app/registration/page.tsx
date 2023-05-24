'use client';
import React from 'react';
import RegistrationUIPage from './[referrerAddress]/page';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

function Registration() {
  return (
    <ProtectedRoute>
      <RegistrationUIPage />
    </ProtectedRoute>
  );
}

export default Registration;
