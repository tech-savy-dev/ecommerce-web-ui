import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, decrementFromCart, removeFromCart } from '../../features/cart/cartSlice';

const CartDropdown: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const cart = useAppSelector(s => s.cart);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose && onClose();
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [onClose]);

  if (!cart || cart.length === 0) {
    return (
      <div ref={ref} style={{ position: 'absolute', right: 0, marginTop: 12, width: 320, background: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', borderRadius: 8, padding: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Your cart</div>
        <div style={{ color: '#666' }}>Cart is empty</div>
      </div>
    );
  }

  const total = cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0);

  return (
    <div ref={ref} style={{ position: 'absolute', right: 0, marginTop: 12, width: 360, background: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>Cart</div>
        <div style={{ fontSize: 12, color: '#666' }}>{total} item{total !== 1 ? 's' : ''}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto' }}>
        {cart.map((it: any) => (
          <div key={it.id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 4px', borderRadius: 6 }}>
            <div style={{ width: 56, height: 56, borderRadius: 6, overflow: 'hidden', background: '#f3f3f3', flexShrink: 0 }}>
              {it.image ? <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div style={{ color: '#666', fontSize: 13 }}>${it.price} • Qty: {it.quantity}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button onClick={() => dispatch(decrementFromCart(it.id))} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #ddd', background: '#fff' }}>-</button>
              <div style={{ minWidth: 26, textAlign: 'center', fontWeight: 600 }}>{it.quantity}</div>
              <button onClick={() => dispatch(addToCart(it))} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #000', background: '#000', color: '#fff' }}>+</button>
            </div>
            <button onClick={() => dispatch(removeFromCart(it.id))} style={{ marginLeft: 8, background: 'transparent', border: 'none', color: '#e53935', cursor: 'pointer' }} title="Remove">✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <div style={{ fontWeight: 700 }}>Total</div>
        <div style={{ fontWeight: 700 }}>${cart.reduce((s: number, i: any) => s + (i.price * (i.quantity || 0)), 0).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartDropdown;
