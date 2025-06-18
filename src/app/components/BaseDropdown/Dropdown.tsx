"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Post } from "../Posts/Posts";
import { Box, Button, Grid, TextField, LinearProgress } from "@mui/material";
import { debounce } from "lodash";
import {
  boxContainer,
  boxTitleDropdown,
  clearButton,
  noItemsFoundBox,
  searchingBox,
  textFieldStyles,
  titleBoxNames,
} from "./DropdownStyles";

interface Props<DataType extends Post> {
  items: DataType[];
  value: string;
  onValueChange: (selectedItem: DataType | null) => void;
  loading?: boolean;
  clearSearch?: boolean;
}

const Dropdown = <DataType extends Post>({
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
    onValueChange(item);
    setSearchQuery(item.title);
    setIsOpen(false);
  };

  const handleClear = () => {
    setIsResetting(true);
    setTimeout(() => {
      setSearchQuery("");
      onValueChange(null);
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
      onValueChange(null as unknown as DataType);
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
    <Grid container spacing={{ xs: 2, md: 3 }} ref={dropdownRef}>
      <Box sx={boxContainer}>
        <TextField
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={loading ? "Loading..." : "Search with title/body"}
          autoComplete="off"
          disabled={loading || isResetting}
          sx={textFieldStyles}
        />

        {isOpen && !loading && (
          <Box sx={boxTitleDropdown}>
            {isSearching ? (
              <Box sx={searchingBox}>Searching...</Box>
            ) : filteredItems.length === 0 ? (
              <Box sx={noItemsFoundBox}>No items found</Box>
            ) : (
              filteredItems.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  sx={titleBoxNames}
                >
                  {item.title}
                </Box>
              ))
            )}
          </Box>
        )}

        {searchQuery && !loading && (
          <Button onClick={handleClear} sx={clearButton}>
            x
          </Button>
        )}

        {(loading || isSearching || isResetting) && <LinearProgress />}
      </Box>
    </Grid>
  );
};

export default Dropdown;
