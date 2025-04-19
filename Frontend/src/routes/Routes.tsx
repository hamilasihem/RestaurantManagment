import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Services/Dashboard";
import AuthGuard from "../guarde/AuthGuard";
import Login from "../Pages/Login/Login";
import GuestGuard from "../guarde/GuestGuard";
import { IRoute } from "../types/index"
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../Pages/MainLayout/MainLayout";

export const routes: IRoute[] = [
  {
    path: "/",
    element: Dashboard,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: "/login",
    element: Login,
    guard: GuestGuard,
  },
  {
    path: "/MainLayout",
    element: MainLayout,
    guard: AuthGuard,
  },
];

export const renderRoutes = (routes: IRoute[]) => {
  return (
    <Routes>
      {routes?.map((route: IRoute, index: number) => {
        const Component = route.element;
        const Guard = route.guard || React.Fragment;
        const Layout = route.layout || React.Fragment;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  );
};
