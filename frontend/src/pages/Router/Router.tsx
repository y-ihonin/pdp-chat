import { Route, BrowserRouter, Routes } from "react-router-dom";

// layout
import BaseLayout from "src/layout/BaseLayout";

// hoc
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

// pages
import Home from "../Home";
import SignIn from "../Auth/SignIn";
import RoomSingle from "../RoomSingle";


function Router() {

  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }/>
          <Route path="/room/:id" element={
            <PrivateRoute>
              <RoomSingle />
            </PrivateRoute>
          }/>
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
}

export default Router;
