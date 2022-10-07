import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../Auth/Auth'

export function PrivateRoute({ component: Component, ...rest }:any) {
  const { user } = useAuth()


  return user ? <Outlet/> : <Navigate to="/login" />;

}
