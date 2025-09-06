import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, decrementFromCart, removeFromCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const CartModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const cart = useAppSelector(s => s.cart);
  const dispatch = useAppDispatch();

  if (!open) return null;

  const totalItems = cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0);
  const totalPrice = cart.reduce((s: number, i: any) => s + (i.price * (i.quantity || 0)), 0).toFixed(2);

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 2000 }} onClick={onClose}>
      <div style={{ width: 'min(720px, 96%)', maxHeight: '80%', background: '#fff', borderRadius: 10, padding: 16, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Your cart</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ color: '#666' }}>{totalItems} item{totalItems !== 1 ? 's' : ''}</div>
            <button onClick={onClose} style={{ padding: '6px 10px', borderRadius: 6 }}>Close</button>
          </div>
        </div>

        <div style={{ overflowY: 'auto', maxHeight: '60%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cart.length === 0 ? (
            <div style={{ color: '#666' }}>Cart is empty</div>
          ) : (
            cart.map((it: any) => (
              <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 8, borderRadius: 8, border: '1px solid #f0f0f0' }}>
                <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', background: '#f3f3f3' }}>
                  {it.image ? <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{it.name}</div>
                  <div style={{ color: '#666' }}>${it.price} • ${(it.price * it.quantity).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => dispatch(decrementFromCart(it.id))} style={{ width: 32, height: 32, borderRadius: 6 }}>-</button>
                  <div style={{ minWidth: 28, textAlign: 'center' }}>{it.quantity}</div>
                  <button onClick={() => dispatch(addToCart(it))} style={{ width: 32, height: 32, borderRadius: 6 }}>+</button>
                </div>
                <button onClick={() => dispatch(removeFromCart(it.id))} style={{ background: 'transparent', border: 'none', color: '#e53935', cursor: 'pointer' }}>Remove</button>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>Total: ${totalPrice}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/cart" onClick={onClose} style={{ alignSelf: 'center' }}>Open full cart</Link>
            <button style={{ padding: '8px 12px', borderRadius: 6, background: '#000', color: '#fff' }}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
