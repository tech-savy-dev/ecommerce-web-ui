import React from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, decrementFromCart, removeFromCart } from "../features/cart/cartSlice";
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s: number, i: any) => s + (i.price * (i.quantity || 0)), 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = (subtotal + shipping + tax).toFixed(2);

  return (
    <div style={{ padding: 20 }}>
      <style>{`
        .cart-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start; }
        @media (max-width: 880px) { .cart-grid { grid-template-columns: 1fr; } }
        .item-card { display:flex; gap:12px; align-items:center; padding:12px; border-radius:10px; border:1px solid #f0f0f0; background:#fff; transform: translateY(0); transition: transform 220ms ease, box-shadow 220ms ease; }
        .item-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
        .thumb { width:96px; height:96px; border-radius:8px; overflow:hidden; background:#f3f3f3; flex-shrink:0 }
        .qty-btn { width:34px; height:34px; border-radius:8px; border:1px solid #ddd; background:#fff; cursor:pointer }
        .fadeUp { animation: fadeUp 320ms ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Your Cart</h2>
        {/* <button onClick={() => navigate('/')} style={{ padding: '8px 12px', borderRadius: 8 }}>← Back to shop</button> */}
      </div>
      <div className="cart-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cart.length === 0 ? (
            <div style={{ padding: 28, borderRadius: 12, background: '#fff', textAlign: 'center', color: '#666' }}>Your cart is empty.</div>
          ) : (
            cart.map((it: any, idx: number) => (
              <div className={`item-card fadeUp`} key={it.id} style={{ animationDelay: `${idx * 40}ms` }}>
                <div className="thumb">
                  {it.image ? <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{it.name}</div>
                  <div style={{ color: '#666', marginBottom: 8 }}>${it.price.toFixed(2)} each</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button className="qty-btn" onClick={() => dispatch(decrementFromCart(it.id))}>-</button>
                    <div style={{ minWidth: 36, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{it.quantity}</div>
                    <button className="qty-btn" onClick={() => dispatch(addToCart(it))}>+</button>
                    <button onClick={() => dispatch(removeFromCart(it.id))} style={{ marginLeft: 12, border: 'none', background: 'transparent', color: '#e53935', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>${(it.price * it.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: 20, borderRadius: 12, padding: 16, background: '#fff', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ color: '#666' }}>Subtotal</div>
              <div style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ color: '#666' }}>Shipping</div>
              <div style={{ fontWeight: 700 }}>${shipping.toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ color: '#666' }}>Tax</div>
              <div style={{ fontWeight: 700 }}>${tax.toFixed(2)}</div>
            </div>
            <div style={{ borderTop: '1px dashed #eee', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Total</div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>${total}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Proceed to Checkout</button>
              <button onClick={() => navigate('/')} style={{ padding: '10px 12px', borderRadius: 8, background: 'transparent', border: '1px solid #ddd', cursor: 'pointer' }}>Continue Shopping</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
