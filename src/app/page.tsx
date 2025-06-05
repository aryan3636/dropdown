'use client'
import { useEffect, useState } from "react";
import Dropdown from "./components/BaseDropdown/Dropdown";
import { Post } from "./components/Posts/Posts";

export default function Home() {
  const [products, setProducts] = useState<Post[]>([])
  const [selectedPostId, setSelectedPostId] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        const postData: Post[] = await data.json()
        setProducts(postData)
      } catch (err) {
        alert('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="container">
        
        <Dropdown 
          label="Products" 
          items={products} 
          value={selectedPostId} 
          onValueChange={(value, item) => {
            setSelectedPostId(value);
            setSelectedProduct(item)
          }}
          loading={loading}
        />
        
        <div className="items-info">
          <div >
            {selectedProduct 
            ? <>
                <table className="table-auto border border-white text-white w-full max-w-md">
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
                      <td className="border border-white px-4 py-2">{selectedProduct.userId}</td>
                      <td className="border border-white px-4 py-2">{selectedProduct.id}</td>
                      <td className="border border-white px-4 py-2">{selectedProduct.title}</td>
                      <td className="border border-white px-4 py-2">{selectedProduct.body}</td>
                  </tr>
                  </tbody>
                </table>
                </>
            : 'No product is yet selected'
            }
          </div>
        </div>
    </div>
  );
}
