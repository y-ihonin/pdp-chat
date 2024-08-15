import { Route, BrowserRouter, Routes } from "react-router-dom";

// layout
import BaseLayout from "src/layout/BaseLayout";

// hoc
import AuthRoute from "./AuthRoute";

// pages
import Home from "../Home";
import SignIn from "../Auth/SignIn";


function Router() {

  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={
            <AuthRoute>
              <SignIn/>
            </AuthRoute>
          }/>
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
}

export default Router;
