import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthGuard from "../guarde/AuthGuard";
import Login from "../Pages/Login/Login";
import GuestGuard from "../guarde/GuestGuard";
import { IRoute } from "../types/index"
import DashboardLayout from "../layouts/DashboardLayout";
import UserTable from "../components/user/UserTable";
import PlatsTable from "../components/plats/PlatsTable";
import MenuTable from "../components/menu/MenuTable";



export const routes: IRoute[] = [
  {
    path: "/",
    guard: AuthGuard,
    layout: DashboardLayout,
    children: [
      {
        path: "plats",
        element: PlatsTable,
      },
      {
        path: "users",
        element: UserTable,
      },
      {
        path: "/menu",
        element: MenuTable,
      },
    ],
  },
  {
    path: "/login",
    element: Login,
    guard: GuestGuard,
  },
];

 

export const renderRoutes = (routes: IRoute[]) => {
  const render = (routes: IRoute[]) =>
    routes.map((route: IRoute, index: number) => {
      const Guard = route.guard || React.Fragment;
      const Layout = route.layout || React.Fragment;

      const element = route.element ? (
        <Guard>
          <Layout>
            <route.element />
          </Layout>
        </Guard>
      ) : (
        <Guard>
          <Layout>
            <React.Fragment />
          </Layout>
        </Guard>
      );

      return (
        <Route key={index} path={route.path} element={element}>
          {route.children && render(route.children)}
        </Route>
      );
    });

  return <Routes>{render(routes)}</Routes>;
};