import React from "react";

const Footer: React.FC = () => (
	<footer style={{ padding: 16, textAlign: "center", background: "#f5f5f5" }}>
		© {new Date().getFullYear()} Ecommerce Web UI
	</footer>
);

export default Footer;
