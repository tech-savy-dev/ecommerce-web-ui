import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, decrementFromCart } from "../features/cart/cartSlice";
import AuthModal from "../components/auth/AuthModal";
import ProductList from "../components/product/ProductList";
import { logout } from "../features/auth/authThunks";
import { fetchProducts } from "../features/products/productsApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useAppDispatch();
  const [authOpen, setAuthOpen] = useState(true);
  const auth = useAppSelector(state => state.auth);

  // Close the modal automatically when user becomes logged in
  useEffect(() => {
    if (auth.isLoggedIn) setAuthOpen(false);
  }, [auth.isLoggedIn]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchProducts().then(setProducts).catch(console.error);
    }
  }, [auth.isLoggedIn]);

  return (
    <div style={{ padding: "20px" }}>
      {!auth.isLoggedIn && <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />}
      {auth.isLoggedIn && auth.user && (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, display: 'inline-block', marginBottom: 12 }}>
          <img src={auth.user.picture} alt={auth.user.name} style={{ width: 48, height: 48, borderRadius: 24, verticalAlign: 'middle', marginRight: 8 }} />
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <div style={{ fontSize: 12 }}>{auth.user.email}</div>
          </div>
          <button
            style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #aaa', background: '#f5f5f5', cursor: 'pointer' }}
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      )}
      <h2>Products</h2>
      <ProductList
        products={products}
        onIncrement={(p) => dispatch(addToCart(p))}
        onDecrement={(p) => dispatch(decrementFromCart(p.id))}
      />
    </div>
  );
};

export default Home;
