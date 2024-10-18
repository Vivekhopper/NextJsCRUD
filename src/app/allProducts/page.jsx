"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import style from "./allproducts.module.css";
import { useRouter } from "next/navigation";

function Page() {
  const [mob, setMob] = useState([]);
const router=useRouter()
  // Fetch product list
  const productHandler = async () => {
    const res = await fetch("http://localhost:3000/api/products/mobiles");
    const rdata = await res.json();
    setMob(rdata.mobileData);
  };

  useEffect(() => {
    productHandler();
  }, []);

  // Delete product by id
  const deleteHandler = async (id) => {
    const res = await fetch(`http://localhost:3000/api/products/mobiles?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert("Mobile deleted successfully");
      setMob((prevMob) => prevMob.filter((mobile) => mobile._id !== id)); // Update the list
    } else {
      alert("Failed to delete mobile");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Mobiles</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Model</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mob.map((mobile) => {
            return (
              <tr key={mobile._id}>
                <td>{mobile.title}</td>
                <td>{mobile.model}</td>
                <td>{mobile.price}</td>
                <td>
                  <Link href={`/allProducts/${mobile._id}`}>
                    <button className={style.updateButton}>Update</button>
                  </Link>
                  <button
                    className={style.deleteButton}
                    onClick={() => deleteHandler(mobile._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <button onClick={()=>router.push('/add-products/add-mobiles')} style={{backgroundColor:"#0070f3",color:"white"}}>Add Mobile</button>
    </div>
    </div>
  );
}

export default Page;
