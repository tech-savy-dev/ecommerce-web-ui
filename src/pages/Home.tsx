import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

const Home = () => {
  const products = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price}{" "}
            <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
