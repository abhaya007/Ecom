"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type Category = {
  _id?: string;
  id?: string | number;
  name: string;
  description?: string;
  status?: string;
  productCount?: number;
};
import axios from "axios";
import { toast } from "sonner";
import AdminSidebar from "@/components/ui/AdminSidebar";
import AdminHeader from "@/components/ui/AdminHeader";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
};

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  // Fetch categories for dropdown
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []));
  }, []);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    image: "",
    isPublished: false,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products");
        setProducts(res.data.products);
      } catch (err) {
        toast.error("Failed to fetch products");
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Add or update product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: formData.status,
      image:
        formData.image ||
        `https://readdy.ai/api/search-image?query=generic%20product%20placeholder%20on%20white%20background%2C%20product%20photography%20style%2C%20clean%20minimal%20aesthetic&width=100&height=100&orientation=squarish&ts=${Date.now()}`,
    };

    try {
      if (editingProduct) {
        // PATCH: update product
        const res = await axios.patch(
          `http://localhost:8080/products/${editingProduct._id}`,
          payload
        );
        setProducts(
          products.map((p) =>
            p._id === res.data.product._id ? res.data.product : p
          )
        );
        toast.success("Product updated successfully");
        setEditingProduct(null);
      } else {
        // POST: add product
        const res = await axios.post("http://localhost:8080/products", payload);
        setProducts([...products, res.data.product]);
        toast.success("Product added successfully");
      }

      setShowAddForm(false);
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        status: "Active",
        image: "",
        isPublished: false,
      });
    } catch (err) {
      toast.error("Failed to submit product");
      console.error(err);
    }
  };

  // Edit handler
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: "",
      brand: "",
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      image: product.image || "",
      isPublished: false,
    });
    setShowAddForm(true);
  };

  // Delete handler
  const handleDelete = async (_id: string) => {
    try {
      const res = await axios.delete(`http://localhost:8080/products/${_id}`);
      setProducts(res.data.products);
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  // Status color helper
  const getStatusColor = (status: string): string => {
    const statusColorMap: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      "out of stock": "bg-red-100 text-red-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return statusColorMap[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2a4458]">Products</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#f8732c] text-white px-4 py-2 rounded-lg hover:bg-[#e6672a] transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>Add Product
            </button>
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-[#2a4458] mb-4">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8732c]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    {categories.length > 0 ? (
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8732c]"
                        required
                      >
                        {categories.map((cat) => (
                          <option value={cat.name} key={cat._id || cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        type="button"
                        onClick={() => router.push("/admin/categories")}
                        className="w-full px-3 py-2 border border-dashed border-[#f8732c] rounded-lg text-[#f8732c] hover:bg-[#f8732c] hover:text-white transition-colors"
                      >
                        Add Category
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8732c]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8732c]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8732c] pr-8"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8732c]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#f8732c] text-white py-2 rounded-lg hover:bg-[#e6672a] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {editingProduct ? "Update" : "Add"} Product
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProduct(null);
                        setFormData({
                          name: "",
                          description: "",
                          brand: "",
                          category: "",
                          price: "",
                          stock: "",
                          status: "Active",
                          image: "",
                          isPublished: false,
                        });
                      }}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={
                              typeof product.image === "string" &&
                              product.image.trim() !== ""
                                ? product.image.trim()
                                : `https://readdy.ai/api/search-image?query=generic%20product%20placeholder%20on%20white%20background%2C%20product%20photography%20style%2C%20clean%20minimal%20aesthetic&width=100&height=100&orientation=squarish&ts=${
                                    product._id || ""
                                  }`
                            }
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover mr-3 border border-gray-200 bg-white"
                            style={{
                              minWidth: 64,
                              minHeight: 64,
                              maxWidth: 64,
                              maxHeight: 64,
                            }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              // Only set fallback if the image is not already the fallback
                              const fallback = `https://readdy.ai/api/search-image?query=generic%20product%20placeholder%20on%20white%20background%2C%20product%20photography%20style%2C%20clean%20minimal%20aesthetic&width=100&height=100&orientation=squarish&ts=${
                                product._id || ""
                              }`;
                              if (!target.dataset.fallback) {
                                target.src = fallback;
                                target.dataset.fallback = "true";
                              }
                            }}
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(product);
                            }}
                            className="text-[#f8732c] hover:text-[#2a4458] focus:text-[#2a4458] cursor-pointer p-2 md:p-3 transition-colors hover:animate-wiggle"
                            style={{ lineHeight: 0 }}
                          >
                            <i
                              className="ri-edit-line"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product._id);
                            }}
                            className="text-red-600 hover:text-[#2a4458] focus:text-[#2a4458] cursor-pointer p-2 md:p-3 transition-colors hover:animate-wiggle"
                            style={{ lineHeight: 0 }}
                          >
                            <i
                              className="ri-delete-bin-line"
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Product Details Modal as Form Overlay */}
                  {selectedProduct && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                      onClick={() => setSelectedProduct(null)}
                    >
                      <div
                        className="bg-white p-10 rounded-2xl w-full max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h2 className="text-2xl font-bold text-[#2a4458] mb-6">
                          Product Details
                        </h2>
                        <div className="flex gap-10">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <img
                              src={
                                typeof selectedProduct.image === "string" &&
                                selectedProduct.image.trim() !== ""
                                  ? selectedProduct.image.trim()
                                  : `https://readdy.ai/api/search-image?query=generic%20product%20placeholder%20on%20white%20background%2C%20product%20photography%20style%2C%20clean%20minimal%20aesthetic&width=100&height=100&orientation=squarish&ts=${
                                      selectedProduct._id || ""
                                    }`
                              }
                              alt={selectedProduct.name}
                              className="w-56 h-56 object-cover rounded-xl border border-gray-200 bg-white"
                              onError={(e) => {
                                const target = e.currentTarget;
                                const fallback = `https://readdy.ai/api/search-image?query=generic%20product%20placeholder%20on%20white%20background%2C%20product%20photography%20style%2C%20clean%20minimal%20aesthetic&width=100&height=100&orientation=squarish&ts=${
                                  selectedProduct._id || ""
                                }`;
                                if (!target.dataset.fallback) {
                                  target.src = fallback;
                                  target.dataset.fallback = "true";
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center text-lg">
                            <div className="mb-4">
                              <span className="font-semibold">Name:</span>{" "}
                              {selectedProduct.name}
                            </div>
                            <div className="mb-4">
                              <span className="font-semibold">Category:</span>{" "}
                              {selectedProduct.category}
                            </div>
                            <div className="mb-4">
                              <span className="font-semibold">Price:</span> $
                              {selectedProduct.price}
                            </div>
                            <div className="mb-4">
                              <span className="font-semibold">Stock:</span>{" "}
                              {selectedProduct.stock}
                            </div>
                            <div className="mb-4">
                              <span className="font-semibold">Status:</span>{" "}
                              {selectedProduct.status}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="mt-10 px-6 py-3 bg-[#f8732c] text-white rounded-lg hover:bg-[#e6672a] transition-colors w-full text-lg"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
