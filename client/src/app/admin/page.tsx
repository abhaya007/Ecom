"use client";

import AdminHeader from "@/components/ui/AdminHeader";
import AdminSidebar from "@/components/ui/AdminSidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 12000, orders: 150 },
  { month: "Feb", sales: 15000, orders: 200 },
  { month: "Mar", sales: 18000, orders: 250 },
  { month: "Apr", sales: 22000, orders: 300 },
  { month: "May", sales: 25000, orders: 350 },

  { month: "Jun", sales: 28000, orders: 400 },
];

// API endpoint for products
const PRODUCTS_API = "http://localhost:8080/products";
const USERS_API = "http://localhost:8080/users"; 

const categoryData = [
  { name: "Electronics", value: 35, color: "#f8732c" },
  { name: "Fashion", value: 25, color: "#2a4458" },
  { name: "Home", value: 20, color: "#ffa500" },
  { name: "Sports", value: 15, color: "#4a90e2" },
  { name: "Books", value: 5, color: "#50e3c2" },
];

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    product: "Wireless Headphones",
    amount: "$89.99",
    status: "Delivered",
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    product: "Smart Watch",
    amount: "$199.99",
    status: "Processing",
  },
  {
    id: "#12347",
    customer: "Mike Johnson",
    product: "T-Shirt",
    amount: "$24.99",
    status: "Shipped",
  },
  {
    id: "#12348",
    customer: "Sarah Wilson",
    product: "Water Bottle",
    amount: "$19.99",
    status: "Pending",
  },
  {
    id: "#12349",
    customer: "David Brown",
    product: "Laptop Stand",
    amount: "$45.99",
    status: "Delivered",
  },
];

export default function AdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);    

  useEffect(() => {
    // Fetch product count from API
    fetch(PRODUCTS_API)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProductCount(data.products.length);
        } else {
          setProductCount(null);
        }
      })
      .catch(() => setProductCount(null));
    //fetch user count from API
    fetch(USERS_API)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.users)) {
          setUserCount(data.users.length);
        } else {
          setUserCount(null);
        }
      })
      .catch(() => setUserCount(null));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#2a4458]">Dashboard</h1>
            <div className="flex gap-3">
              <Link
                href="/admin/products"
                className="bg-[#f8732c] text-white px-4 py-2 rounded-lg hover:bg-[#e6672a] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>Add Product
              </Link>
              <Link
                href="/admin/categories"
                className="bg-[#2a4458] text-white px-4 py-2 rounded-lg hover:bg-[#1e3647] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-folder-add-line mr-2"></i>Add Category
              </Link>
              <Link
                href="/admin/users"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-user-add-line mr-2"></i>Add User
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Sales
                  </p>
                  <p className="text-2xl font-bold text-[#2a4458]">$128,450</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-[#f8732c]/10 rounded-full">
                  <i className="ri-money-dollar-circle-line text-[#f8732c] text-xl"></i>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                ↗ +12% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-[#2a4458]">1,847</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-[#f8732c]/10 rounded-full">
                  <i className="ri-shopping-cart-line text-[#f8732c] text-xl"></i>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                ↗ +8% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-[#2a4458]">
                    {productCount !== null ? productCount : "..."}
                  </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-[#f8732c]/10 rounded-full">
                  <i className="ri-shopping-bag-line text-[#f8732c] text-xl"></i>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                → +3% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-[#2a4458]">
                    {userCount !== null ? userCount : "..."}
                    </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-[#f8732c]/10 rounded-full">
                  <i className="ri-user-line text-[#f8732c] text-xl"></i>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                ↗ +18% from last month
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#2a4458] mb-4">
                Sales Overview
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#f8732c"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#2a4458] mb-4">
                Category Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#2a4458] mb-4">
                Monthly Orders
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#2a4458" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#2a4458] mb-4">
                Recent Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Order ID</th>
                      <th className="text-left py-2">Customer</th>
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{order.id}</td>
                        <td className="py-3">{order.customer}</td>
                        <td className="py-3">{order.product}</td>
                        <td className="py-3 font-medium">{order.amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
