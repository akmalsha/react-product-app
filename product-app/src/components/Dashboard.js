import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import './Dashboard.css';


function Dashboard() {
  const [products, setProducts] = useState([]);
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center mt-5">
        Error: {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Product Dashboard</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm border-0 product-card">

              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "160px", objectFit: "contain", padding: "1rem" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "1rem" }}>
                  {product.title.length > 50
                    ? product.title.slice(0, 50) + "..."
                    : product.title}
                </Card.Title>
                <Card.Text className="text-primary fw-bold">
                  ${product.price.toFixed(2)}
                </Card.Text>
                <Card.Text className="text-muted text-capitalize small">
                  {product.category}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
