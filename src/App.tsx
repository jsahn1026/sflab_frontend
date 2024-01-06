import SidebarToggleButton from 'components/Sidebar/SidebarToggleButton';
import ColorPage from 'pages/ColorPage';
import Login from 'pages/Login';
import PricePage from 'pages/PricePage';
import ProductPage from 'pages/ProductPage';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from 'store/auth';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import FabricPage from './pages/FabricPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Settings from './pages/SettingPage';

function App() {
  const isLogin = useRecoilValue(loginState);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, location.pathname]);

  return (
    <div className="app">
      <Sidebar />
      <main>
        <SidebarToggleButton />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/prices/:item" element={<PricePage />} />
          <Route path="/fabrics/:item" element={<FabricPage />} />
          <Route path="/colors/:item" element={<ColorPage />} />
          <Route path="/products/:item" element={<ProductPage />} />

          <Route
            path="/split/prices/:splitName/:labelName"
            element={<PricePage />}
          />
          <Route
            path="/split/fabrics/:splitName/:labelName"
            element={<FabricPage />}
          />
          <Route
            path="/split/colors/:splitName/:labelName"
            element={<ColorPage />}
          />
          <Route
            path="/split/product/:splitName/:labelName"
            element={<ProductPage />}
          />

          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
