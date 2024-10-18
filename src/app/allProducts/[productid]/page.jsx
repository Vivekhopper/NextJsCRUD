"use client";
import { useEffect, useState } from "react";
import style from "../../add-products/products.module.css";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const [formData, setFormData] = useState({
    title: "",
    model: "",
    price: "",
  });
  const router=useRouter()
  
  const id = params.productid;

  // Fetch product data by id
  const getPro = async () => {
    const response = await fetch(
      `http://localhost:3000/api/products/mobiles/update/${id}`
    );
    const singleData = await response.json();
    
    setFormData({
      title: singleData.product.title || "",
      model: singleData.product.model || "",
      price: singleData.product.price || "",
    });
  };

  useEffect(() => {
    getPro();
  }, [id]);

  // Update product data
  const prodUpdate = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    
    const res = await fetch(`http://localhost:3000/api/products/mobiles?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newTitle: formData.title,
        newModel: formData.model,
        newPrice: formData.price,
      }),
    });

    if (res.ok) {
      alert("Mobile updated successfully");
      router.push('/allProducts')

    } else {
      alert("Failed to update the mobile");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  return (
    <form className={style.formContainer} onSubmit={prodUpdate}>
      <div className={style.formGroup}>
        <label className={style.label}>Enter Mobile Name</label>
        <input
          type="text"
          name="title"
          className={style.input}
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className={style.formGroup}>
        <label className={style.label}>Model</label>
        <input
          type="text"
          name="model"
          className={style.input}
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      <div className={style.formGroup}>
        <label className={style.label}>Price</label>
        <input
          type="text"
          name="price"
          className={style.input}
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={style.button}>
        Update Mobile
      </button>
    </form>
  );
}

export default Page;
