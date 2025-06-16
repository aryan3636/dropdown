"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Post } from "../Posts/Posts";
import { Grid, LinearProgress } from "@mui/material";
import { debounce } from "lodash";

interface Props<DataType extends Post> {
  label: string;
  items: DataType[];
  value: string;
  onValueChange: (value: string, selectedItem: DataType | null) => void;
  loading?: boolean;
  clearSearch?: boolean;
}

const Dropdown = <DataType extends Post>({
  label,
  items,
  value,
  onValueChange,
  loading,
  clearSearch,
}: Props<DataType>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.id.toString() === value);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setIsSearching(false);
      }, 200),
    []
  );

  const handleItemClick = (item: DataType) => {
    onValueChange(item.id.toString(), item);
    setSearchQuery(item.title);
    setIsOpen(false);
  };

  const handleClear = () => {
    setIsResetting(true);

    setTimeout(() => {
      setSearchQuery("");
      onValueChange("", null);
      setIsResetting(false);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(true);
    debouncedSearch(value);
    setIsOpen(true);
    if (value === "") {
      onValueChange("", null as unknown as DataType);
    }
  };

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.body &&
            item.body.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [items, searchQuery]
  );

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
    if (value && selectedItem) {
      setSearchQuery(selectedItem.title);
    }
  }, [value, selectedItem]);

  useEffect(() => {
    if (clearSearch) {
      setSearchQuery("");
    }
  }, [clearSearch]);

  return (
    <Grid spacing={{ xs: 2, md: 3 }} ref={dropdownRef}>
      <span className="label text-sm font-medium text-white">{label}</span>
      <Grid spacing={{ xs: 2, md: 3 }} className="input-field relative mt-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={loading ? "Loading..." : "Search with title/body"}
          disabled={loading || isResetting}
          autoComplete="off"
          onClick={() => setIsOpen(true)}
          className="border border-b-blue-50 w-full h-12 pr-9 pl-3"
        />
        {searchQuery && !loading && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-red-600 hover:text-white"
            type="button"
            disabled={isResetting}
          >
            x
          </button>
        )}
        {isOpen && !loading && (
          <Grid
            spacing={{ xs: 2, md: 3 }}
            className="absolute z-1000 mt-1 w-full overflow-y-auto rounded-md border border-gray-200 bg-black shadow-lg"
          >
            {isSearching ? (
              <Grid
                spacing={{ xs: 2, md: 3 }}
                className="px-4 py-2 text-gray-500"
              >
                Searching...
              </Grid>
            ) : filteredItems.length === 0 ? (
              <Grid
                spacing={{ xs: 2, md: 3 }}
                className="px-4 py-2 text-gray-500"
              >
                No items found
              </Grid>
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
          </Grid>
        )}
        {(loading || isSearching || isResetting) && <LinearProgress />}
      </Grid>
    </Grid>
  );
};
export default Dropdown;
