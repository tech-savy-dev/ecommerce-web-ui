import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const cart = useAppSelector(state => state.cart);

  return (
    <header style={{ padding: "10px", background: "#f5f5f5" }}>
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </nav>
    </header>
  );
};

export default Header;
