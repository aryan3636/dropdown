"use client";
import { useEffect, useState } from "react";
import Dropdown from "./components/BaseDropdown/Dropdown";
import { Post } from "./components/Posts/Posts";
import { SelectModal } from "./components/selectModal/ItemSelect";
import ShowAll from "./components/ShowAll/ShowAll";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  dropdownGrid,
  listContainer,
  pageGridContainer,
  productsLabel,
  showAllButton,
} from "./styles";

export default function Home() {
  const [products, setProducts] = useState<Post[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [load, setLoad] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  if (!hasMounted) return null;

  return (
    <>
      <Grid
        container
        spacing={{ xs: 12, md: 6, lg: 4 }}
        rowSpacing={0}
        columnSpacing={0}
        sx={pageGridContainer}
      >
        <Typography sx={productsLabel}>Products</Typography>
        <Grid spacing={{ xs: 12, md: 6, lg: 4 }} sx={dropdownGrid}>
          <Dropdown
            items={products}
            value={selectedProduct?.id || ""}
            onValueChange={(item) => {
              setSelectedProduct(item);
              setClearSearch(false);
            }}
            loading={loading}
            clearSearch={clearSearch}
          />
          <Button sx={showAllButton} onClick={handleShowAll}>
            {load ? "Collapse All" : "Show All"}
          </Button>

          {load && !selectedProduct && (
            <ShowAll
              onValueChange={(item) => {
                setSelectedProduct(item);
              }}
              load
              items={products}
              searchResultItem={null}
            />
          )}

          <Grid spacing={{ xs: 2, md: 3 }}>
            <SelectModal
              shouldShow={!!selectedProduct}
              onRequestClose={() => {
                setSelectedProduct(null);
                setClearSearch(true);
              }}
            >
              {selectedProduct && (
                <Box sx={listContainer}>
                  <Box key={selectedProduct.id}>
                    <h1>{selectedProduct.id}</h1>
                    <a>{selectedProduct.title}</a>
                    <h1>{selectedProduct.body}</h1>
                  </Box>
                </Box>
              )}
            </SelectModal>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
