"use client";
import React, { useEffect, useState } from "react";
import { Post } from "../Posts/Posts";
import { Pagination } from "@mui/material";

interface Props<DataType extends Post> {
  items: DataType[];
  load: boolean;
  searchResultItem: DataType | null;
}

const ShowAll = <DataType extends Post>({ items }: Props<DataType>) => {
  const [products, setProducts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
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
    <>
      <div className="items-info">
        <div className="table-wrapper">
          <table className="table-container table-auto">
            <thead>
              <tr>
                <th>UserID</th>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.userId}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-center w-full">
        <Pagination
          className="pagination"
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default ShowAll;
