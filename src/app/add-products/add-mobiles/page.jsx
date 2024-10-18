"use client";
import { useState } from "react";
import style from "../products.module.css";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    model: "",
    price: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    const res = await fetch("http://localhost:3000/api/products/mobiles", {
      method: "POST",
      "Content-type": "application/json",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Mobile added successfully");
    }
    setFormData({
      title: "",
      model: "",
      price: "",
    });
  };
  return (
    <>
      <form className={style.formContainer} onSubmit={handleSubmit}>
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
          Add mobile
        </button>
      </form>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button onClick={() => router.push("/allProducts")} style={{backgroundColor:"#0070f3",color:"white"}}>
          Go to Mobile Details
        </button>
      </div>
    </>
  );
}

export default Page;
