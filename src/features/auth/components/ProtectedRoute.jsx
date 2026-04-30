import React from 'react'
import { Outlet, Navigate } from 'react-router';

export const ProtectedRoute = () => {

  return (
    <Outlet />
  )
}
