import { ReactNode } from "react";
import { RouteType } from "./RouteType";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layouts/PageWrapper";
import appRoutes from "./appRoutes";

const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route, index) => {
    return route.index ? (
      <Route
        index
        element={
          <PageWrapper state={route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <PageWrapper state={route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      ></Route>
    )
  })
}

const routes = generateRoute(appRoutes)
export default routes