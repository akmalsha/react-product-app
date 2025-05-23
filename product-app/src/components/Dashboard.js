import { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Styles
  const outerContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #f0f4ff, #d9e8ff)",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    borderRadius: "8px",
    maxWidth: "1200px",
    width: "100%",
  };

  const cardStyle = {
    borderRadius: "12px",
    width: "220px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    background: "white",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading products...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={outerContainer}>
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "30px",
          color: "#333",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Product Dashboard
      </h2>
      <div style={containerStyle}>
        {products.map((product, index) => {
          const isHovered = index === hoveredIndex;
          const hoverStyle = isHovered
            ? {
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }
            : {};

          return (
            <div
              key={product.id}
              style={{ ...cardStyle, ...hoverStyle }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "15px",
                }}
              />
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1a202c",
                  textAlign: "center",
                  marginBottom: "8px",
                }}
                title={product.title}
              >
                {product.title.length > 40
                  ? product.title.slice(0, 40) + "..."
                  : product.title}
              </h4>
              <p
                style={{
                  color: "#4c51bf",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  marginBottom: "5px",
                }}
              >
                ${product.price.toFixed(2)}
              </p>
              <small
                style={{ color: "#718096", textTransform: "capitalize" }}
              >
                {product.category}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
