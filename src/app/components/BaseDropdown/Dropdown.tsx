"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Post } from "../Posts/Posts";
import { LinearProgress } from "@mui/material";

interface Props<DataType extends Post> {
  label: string;
  items: DataType[];
  value: string;
  onValueChange: (value: string, selectedItem: DataType) => void;
  loading?: boolean;
  clearSearch?: boolean;
  setLoading: (loading: boolean) => void;
}

const Dropdown = <DataType extends Post>({
  label,
  items,
  value,
  onValueChange,
  loading,
  clearSearch,
  setLoading,
}: Props<DataType>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItem = items.find((item) => item.id.toString() === value);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (selectedItem) {
          setSearchQuery(selectedItem.title);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  useEffect(() => {
    if (clearSearch) {
      setSearchQuery("");
    }
  }, [clearSearch]);

  const handleItemClick = (item: DataType) => {
    onValueChange(item.id.toString(), item);
    setSearchQuery(item.title);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLoading(false);
    setIsOpen(true);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  // const filteredItems = items.filter((item) => {
  //   return (
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     (item.body && item.body.toLowerCase().includes(searchQuery.toLowerCase()))
  //   )
  // })

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          (item.body &&
            item.body.toLowerCase().includes(debouncedQuery.toLowerCase()))
      ),
    [items, debouncedQuery]
  );

  return (
    <div ref={dropdownRef}>
      <span className="label text-sm font-medium text-white">{label}</span>
      <div className="input-field relative mt-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={loading ? "Loading posts" : "Search with title/body"}
          disabled={loading}
          autoComplete="off"
          onClick={handleInputClick}
          className="border border-b-blue-50 w-full h-12 pr-9"
        />
        {searchQuery && !loading && (
          <button
            onClick={() => {
              setSearchQuery("");
              onValueChange("", null as unknown as DataType);
            }}
            className="absolute top-1/2 right-6 -translate-y-1/2 text-gray-400 hover:text-white"
            type="button"
          >
            x
          </button>
        )}
        {isOpen && !loading && (
          <div className="absolute z-1000 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-black shadow-lg">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No items found</div>
            ) : (
              <ul>
                {filteredItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer px-4 
                    py-2 capitalize hover:bg-gray-100 hover:text-black"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {loading && <LinearProgress />}
      </div>
    </div>
  );
};
export default Dropdown;
