import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { fetchAuthMe } from "./features/auth/authThunks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedIn') === '1') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
