import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../features/products/productsSlice';
import { useAppSelector } from '../../app/hooks';

const ProductList: React.FC<{ products: Product[]; onIncrement: (p: Product) => void; onDecrement: (p: Product) => void }> = ({ products, onIncrement, onDecrement }) => {
  const cart = useAppSelector(state => state.cart);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
      {products.map((p, idx) => {
        const cartItem = cart.find((c: any) => c.id === p.id);
        const count = cartItem ? cartItem.quantity : 0;
        return (
          <div key={p.id} style={{ animation: 'fadeUp 300ms ease', animationDelay: `${idx * 40}ms`, animationFillMode: 'both' }}>
            <ProductCard product={p} onIncrement={onIncrement} onDecrement={onDecrement} count={count} />
          </div>
        );
      })}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
      `}</style>
    </div>
  );
};

export default ProductList;
 
