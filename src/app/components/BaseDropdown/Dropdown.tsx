'use client'

import React, { useState } from "react"
import { Post } from "../Posts/Posts";

interface Props<DataType extends Post> {
  label: string;
  items: DataType[]
  value: string
  onValueChange: (value: string, selectedItem: DataType) => void
  loading?: boolean
}

const Dropdown = <DataType extends Post>({
  label,
  items,
  value,
  onValueChange,
  loading
  }: Props<DataType>) =>{
    const handleOnValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value
      const selectedItem = items.find((item) => item.id.toString() === selectedValue)
      if (selectedItem) {
        onValueChange(selectedValue, selectedItem)
      }
    }
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const filteredItems = items.filter((item) => {
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const selectedLabel = items.find((item) => item.id.toString() === value)?.title || ''
    return(
      <div>
        
        <label className="block mb-1">{label}</label>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border border-gray-300 rounded px-4 py-2 bg-white cursor-pointer"
        >
          {selectedLabel || 'Please select a product'}
        </div>
          <select
            value={value}
            onChange={handleOnValueChange}
            className="select rounded-md border border-gray-100 px-4 py-2"
            disabled={loading}
          >
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search with title/body"
            />      

            {items.map((item) => {
              return (
                <>                  
                  <option key={item.id} value={item.id.toString()} className="drop-item capitalize">                    
                    {item.title}
                  </option>
                </>  
              );
            })}
            
          </select>
      </div>
      
    )
    }
export default Dropdown