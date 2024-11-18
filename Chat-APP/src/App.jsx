import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import Auth from "./Pages/Authentication/Auth";
import Chat from "./Pages/Chat/Chat";
import { useAppStore } from "./Store";
import { useEffect, useState } from "react";
import { APIClient } from "./lib/APIClient";
import { USER_DETAILS } from "./Utilities/Constant";
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await APIClient.get(USER_DETAILS, { withCredentials: true });
        if (response.status === 200) {
          const data = response.data; // Access data directly from response
          setUserInfo(data); // Set user data in the store
        } else {
          console.error("Failed to fetch user details. Status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch user details. Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) return <div>Loading...</div>;
  if (loading) {
    return <div>Loading...</div>;
  }

  //// router defined here//
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;

}

export default App;
