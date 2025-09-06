import React from 'react';
import { Product } from '../../features/products/productsSlice';

const ProductCard: React.FC<{
  product: Product;
  onIncrement: (p: Product) => void;
  onDecrement: (p: Product) => void;
  count?: number;
}> = ({ product, onIncrement, onDecrement, count = 0 }) => {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      padding: 12,
      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      transition: 'transform 160ms ease, box-shadow 160ms ease',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 180
    }}
    className="product-card"
    >
      <div style={{ height: 120, borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#999' }}>Image</span>
          </div>
        )}
      </div>
      <div style={{ fontWeight: 700 }}>{product.name}</div>
      <div style={{ color: '#666' }}>${product.price}</div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <button
            onClick={() => onDecrement(product)}
            disabled={count <= 0}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: '1px solid #ddd',
              background: count > 0 ? '#fff' : '#f7f7f7',
              color: count > 0 ? '#000' : '#bbb',
              cursor: count > 0 ? 'pointer' : 'not-allowed'
            }}
            aria-label={`Decrease ${product.name} quantity`}
          >
            -
          </button>
          <div style={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }}>{count}</div>
          <button
            onClick={() => onIncrement(product)}
            style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #000', background: '#000', color: '#fff' }}
            aria-label={`Increase ${product.name} quantity`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
