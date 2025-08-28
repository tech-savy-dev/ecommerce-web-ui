import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromCart } from "../features/cart/cartSlice";

const CartPage = () => {
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} (x{item.quantity}) - ${item.price * item.quantity}
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
