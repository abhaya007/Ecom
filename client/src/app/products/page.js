"use client"

import { useState } from "react"
import { Package, Upload, DollarSign, Hash, Tag, Building2, FileText, Eye, Plus } from "lucide-react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    sku: "",
    images: "",
    isPublished: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const productData = {
      ...form,
      images: form.images
        ? form.images
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
        : [],
    }

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/products", productData)
      alert("Product added successfully!")
      setForm({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        sku: "",
        images: "",
        isPublished: false,
      })
    } catch (err) {
      alert("Error adding product")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Beauty",
    "Automotive",
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg border-0" style={{ backgroundColor: "#ffffff" }}>
        <CardHeader className="pb-6" style={{ backgroundColor: "#2a4458" }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: "#f8732c" }}>
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Add New Product</CardTitle>
              <CardDescription className="text-gray-200">Create a new product for your store inventory</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: "#2a4458" }}
              >
                <Tag className="h-4 w-4" />
                Product Name
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: "#2a4458" }}
              >
                <FileText className="h-4 w-4" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c] min-h-[100px]"
                required
              />
            </div>

            {/* Brand and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="brand"
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "#2a4458" }}
                >
                  <Building2 className="h-4 w-4" />
                  Brand
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "#2a4458" }}
                >
                  <Package className="h-4 w-4" />
                  Category
                </Label>
                <Select onValueChange={(value) => handleSelectChange("category", value)} required>
                  <SelectTrigger className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price, Stock, and SKU Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "#2a4458" }}
                >
                  <DollarSign className="h-4 w-4" />
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="stock"
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "#2a4458" }}
                >
                  <Hash className="h-4 w-4" />
                  Stock
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sku"
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "#2a4458" }}
                >
                  <Tag className="h-4 w-4" />
                  SKU
                </Label>
                <Input
                  id="sku"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="Enter SKU"
                  className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label
                htmlFor="images"
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: "#2a4458" }}
              >
                <Upload className="h-4 w-4" />
                Product Images
              </Label>
              <Input
                id="images"
                name="images"
                value={form.images}
                onChange={handleChange}
                placeholder="Enter image URLs separated by commas"
                className="border-gray-300 focus:border-[#f8732c] focus:ring-[#f8732c]"
              />
              <p className="text-xs text-gray-500">Add multiple image URLs separated by commas</p>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 border">
              <Checkbox
                id="isPublished"
                name="isPublished"
                checked={form.isPublished}
                onCheckedChange={(checked) => handleSelectChange("isPublished", checked)}
                className="data-[state=checked]:bg-[#f8732c] data-[state=checked]:border-[#f8732c]"
              />
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" style={{ color: "#2a4458" }} />
                <Label
                  htmlFor="isPublished"
                  className="text-sm font-medium cursor-pointer"
                  style={{ color: "#2a4458" }}
                >
                  Publish product immediately
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white font-semibold text-base hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#f8732c" }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Product...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Product
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct
