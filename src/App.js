import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topbar from "./components/Topbar";
import { useAuth } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Profile = lazy(() => import("./pages/Profile"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ProductsManagement = lazy(() => import("./pages/ProductsManagement"));
const SearchProducts = lazy(() => import("./pages/SearchProducts"));
const Cart = lazy(() => import("./pages/Cart"));
const Orders = lazy(() => import("./pages/Orders"));

function App() {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col">
      <Router>
        <Suspense fallback={<p>loading...</p>}>
          <div className="sticky z-50 top-0">{currentUser && <Topbar />}</div>
          <div className="h-full w-full">
            <Switch>
              <Route path="/" exact component={!currentUser ? Login : Home} />
              <Route
                path="/product/:id"
                exact
                component={!currentUser ? Login : Product}
              />
              <Route
                path="/profile"
                exact
                component={!currentUser ? Login : Profile}
              />
              <Route
                path="/searchproducts/:searchTerm"
                exact
                component={!currentUser ? Login : SearchProducts}
              />
              <Route
                path="/product-management/:userId"
                exact
                component={!currentUser ? Login : ProductsManagement}
              />
              <Route
                path="/cart/:userId"
                exact
                component={!currentUser ? Login : Cart}
              />
              <Route
                path="/orders"
                exact
                component={!currentUser ? Login : Orders}
              />
              <Route
                path="/signup"
                exact
                component={!currentUser ? Signup : Home}
              />
              <Route
                path="/login"
                exact
                component={!currentUser ? Login : Home}
              />
            </Switch>
          </div>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
