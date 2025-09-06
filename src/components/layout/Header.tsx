import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useAppSelector } from "../../app/hooks";
import ProfileWidget from "./ProfileWidget";
import CartModal from './CartModal';

const Header = () => {
  const cart = useAppSelector((state) => state.cart);
  const totalCount = cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <header style={{ padding: "12px 18px", background: "#f5f5f5", borderBottom: '1px solid #eee' }}>
      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
        <nav style={{ display: "flex", gap: "20px", alignItems: 'center' }}>
          {location.pathname === '/cart' ? (
            <button onClick={() => navigate('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.04)' }}>
              ← Back to shop
            </button>
          ) : (
            <Link to="/" style={{ fontWeight: 700, color: '#111', textDecoration: 'none' }}>Shop</Link>
          )}
        </nav>
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.04)' }}> 
            ← Back to shop
          </button>
        </div> */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setCartOpen(v => !v); }}>
            <img src="/cart.png" alt="cart" style={{ width: 36, height: 36, borderRadius: 8 }} />
            {totalCount > 0 && (
              <div style={{ position: 'absolute', top: -6, right: -6, background: '#e53935', color: '#fff', borderRadius: 12, padding: '2px 6px', fontSize: 12, fontWeight: 700 }}>{totalCount}</div>
            )}
          </div>
          <ProfileWidget />
          {cartOpen && <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
