"use client";
import React, { useEffect, useState } from "react";
import { Post } from "../Posts/Posts";
import { Pagination, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  itemsBody,
  itemsGrid,
  itemsTitle,
  pagination,
  showAllContainerBox,
} from "./ShowAllStyles.js";

interface Props<DataType extends Post> {
  items: DataType[];
  load: boolean;
  searchResultItem: DataType | null;
  onValueChange: (selectedItem: DataType | null) => void;
}

const ShowAll = <DataType extends Post>({
  items,
  onValueChange,
}: Props<DataType>) => {
  const [products, setProducts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleItemClick = (item: DataType) => {
    onValueChange(item);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const paginatedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const pageCount = Math.ceil(items.length / itemsPerPage);

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
    <Grid container spacing={2} direction="column">
      <Grid sx={showAllContainerBox}>
        <Grid container direction="column" spacing={2}>
          {paginatedItems.map((item) => (
            <Grid key={item.id} sx={itemsGrid}>
              <Typography variant="h6">{item.id}</Typography>
              <Typography sx={itemsTitle} onClick={() => handleItemClick(item)}>
                {item.title}
              </Typography>
              <Typography sx={itemsBody}>{item.body}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid spacing={{ xs: 12 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          shape="rounded"
          sx={pagination}
        />
      </Grid>
    </Grid>
  );
};

export default ShowAll;
