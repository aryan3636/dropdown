"use client";
import { useEffect, useState } from "react";
import Dropdown from "./components/BaseDropdown/Dropdown";
import { Post } from "./components/Posts/Posts";
import { SelectModal } from "./components/selectModal/ItemSelect";
import ShowAll from "./components/ShowAll/ShowAll";
import { Grid } from "@mui/material";

export default function Home() {
  const [products, setProducts] = useState<Post[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [load, setLoad] = useState(false);
  const handleShowAll = () => {
    setSelectedProduct(null);
    return setLoad(!load);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch("https://jsonplaceholder.typicode.com/posts");
        const postData: Post[] = await data.json();
        setProducts(postData);
      } catch (error) {
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Grid
        spacing={{ xs: 2, md: 3 }}
        className="container"
        sx={{
          width: "100%",
          marginX: "auto",
        }}
      >
        <Dropdown
          label="Products"
          items={products}
          value={selectedProduct?.id || ""}
          onValueChange={(value, item) => {
            setSelectedProduct(item);
            setClearSearch(false);
          }}
          loading={loading}
          clearSearch={clearSearch}
        />
        <button className="mt-4" onClick={handleShowAll}>
          {load ? "Collapse All" : "Show All"}
        </button>

        {load && !selectedProduct && (
          <ShowAll load items={products} searchResultItem={null} />
        )}

        <Grid spacing={{ xs: 2, md: 3 }} className="items-info">
          <SelectModal
            shouldShow={!!selectedProduct}
            onRequestClose={() => {
              setSelectedProduct(null);
              setClearSearch(true);
            }}
          >
            {selectedProduct && (
              <table className="table-container table-auto">
                <thead>
                  <tr>
                    <th className="border border-white px-4 py-2">UserID</th>
                    <th className="border border-white px-4 py-2">ID</th>
                    <th className="border border-white px-4 py-2">Title</th>
                    <th className="border border-white px-4 py-2">Body</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white px-4 py-2">
                      {selectedProduct.userId}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {selectedProduct.id}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {selectedProduct.title}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {selectedProduct.body}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </SelectModal>
        </Grid>
      </Grid>
    </>
  );
}
