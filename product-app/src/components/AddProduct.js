import { useState } from "react";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    category: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form data:", form); // Just log it (no actual POST required)
    alert("Product added (not actually saved)");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" onChange={handleChange} /><br />
        <input name="image" placeholder="Image URL" onChange={handleChange} /><br />
        <input name="price" placeholder="Price" onChange={handleChange} /><br />
        <input name="category" placeholder="Category" onChange={handleChange} /><br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
