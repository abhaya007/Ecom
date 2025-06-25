"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Heart, 
  Menu,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  Package,
  Gift,
  Zap,
  Award,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';


const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: 249,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviews: 89,
    badge: "New"
  },
  {
    id: 3,
    name: "Professional Camera Lens",
    price: 599,
    originalPrice: 799,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 67,
    badge: "Limited"
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 449,
    originalPrice: 599,
    image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 156,
    badge: "Popular"
  }
];

const categories = [
  { name: "Electronics", icon: Zap, count: "2,500+ items" },
  { name: "Fashion", icon: Heart, count: "1,800+ items" },
  { name: "Home & Garden", icon: Package, count: "3,200+ items" },
  { name: "Sports", icon: Award, count: "950+ items" },
  { name: "Books", icon: Gift, count: "5,600+ items" },
  { name: "Beauty", icon: Star, count: "1,200+ items" }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Verified Buyer",
    content: "Amazing quality products and super fast delivery. Cartmandu has become my go-to shopping destination!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    name: "Michael Chen",
    role: "Premium Member",
    content: "Excellent customer service and great prices. The product quality exceeded my expectations.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    name: "Emily Davis",
    role: "Regular Customer",
    content: "Love the user-friendly interface and the wide variety of products. Highly recommended!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

export default function HomePage() {
  const {email} = useSelector(state=> state.user);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const heroSlides = [
    {
      title: "Summer Sale Extravaganza",
      subtitle: "Up to 70% off on selected items",
      description: "Discover amazing deals on electronics, fashion, and home essentials",
      image: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Shop Now"
    },
    {
      title: "New Arrivals Collection",
      subtitle: "Fresh styles, latest trends",
      description: "Explore our curated selection of premium products",
      image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Explore"
    },
    {
      title: "Premium Quality Guaranteed",
      subtitle: "Excellence in every product",
      description: "Shop with confidence - quality assured, satisfaction guaranteed",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800",
      cta: "Learn More"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-white">
      {email}
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Cartmandu" width={40} height={40} />
                <span className="text-4xl font-bold text-[#2a4458]">Cartmandu</span>
              </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  className="w-full pl- pr-12 py-3 border-2 rounded-md focus:ring-2 focus:ring-[#f8732c] focus:border-transparent"
                />
                <Button 
                  size="sm" 
                  className="absolute inset-y-1 right-1 my-auto h-[32px] w-[34px] bg-[#f8732c] hover:bg-[#e6661f] text-white "
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center text-[#2a4458] hover:text-[#f8732c]  relative">
                <ShoppingCart className="w-5 h-5 mr-1" />
                <span className="hidden sm:inline">Cart</span>
                <Badge className="absolute -top-2 -right-2 bg-[#f8732c] text-white text-xs px-1.5 py-0.5 rounded-full">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm" className="hidden md:flex items-center text-[#2a4458] hover:text-[#f8732c]">
                <Heart className="w-5 h-5 mr-1" />
                <span>Wishlist</span>
              </Button>
              <Button variant="ghost" size="sm" className="hidden md:flex items-center text-[#2a4458] hover:text-[#f8732c]">
                <User className="w-5 h-5 mr-1" />
                <span>Account</span>
              </Button>

              <Link href="/register">
                <Button variant="outline" size="sm" className="hidden md:flex items-center text-[#f8732c] border-[#f8732c] hover:bg-[#f8732c] hover:text-white">
                  <UserPlus className="w-4 h-4 mr-1" />
                  <span>Sign Up</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-[#2a4458] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="hover:text-[#f8732c] transition-colors font-medium">
                  Home
                </Link>
                <Link href="/categories" className="hover:text-[#f8732c] transition-colors">
                  Categories
                </Link>
                <Link href="/deals" className="hover:text-[#f8732c] transition-colors">
                  Today's Deals
                </Link>
                <Link href="/new-arrivals" className="hover:text-[#f8732c] transition-colors">
                  New Arrivals
                </Link>
                <Link href="/brands" className="hover:text-[#f8732c] transition-colors">
                  Brands
                </Link>
                <Link href="/contact" className="hover:text-[#f8732c] transition-colors">
                  Contact
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              {heroSlides[currentSlide].title}
            </h2>
            <p className="text-xl mb-2 text-[#f8732c] font-semibold">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 text-gray-200">
              {heroSlides[currentSlide].description}
            </p>
            <Button 
              size="lg" 
              className="bg-[#f8732c] hover:bg-[#e6661f] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {heroSlides[currentSlide].cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-[#f8732c]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center text-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#f8732c] rounded-full flex items-center justify-center mr-4">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a4458]">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#2a4458] rounded-full flex items-center justify-center mr-4">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a4458]">Easy Returns</h3>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#f8732c] rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a4458]">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% protected</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#2a4458] rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a4458]">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a4458] mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of products across different categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-[#f8732c]">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#f8732c] to-[#ff8c42] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#2a4458] mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#2a4458] mb-4">Featured Products</h2>
              <p className="text-gray-600">Handpicked products just for you</p>
            </div>
            <Button variant="outline" className="border-[#f8732c] text-[#f8732c] hover:bg-[#f8732c] hover:text-white">
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-[#f8732c] text-white">
                    {product.badge}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#2a4458] mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-[#2a4458]">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  <Button className="w-full bg-[#f8732c] hover:bg-[#e6661f] text-white">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#2a4458] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
            </p>
            <div className="max-w-md mx-auto flex">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white text-gray-900 border-0 rounded-l-lg"
              />
              <Button className="bg-[#f8732c] hover:bg-[#e6661f] text-white px-6 rounded-r-lg rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a4458] mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-[#f8732c] transition-colors duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-[#2a4458]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2a4458] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#f8732c] to-[#ff8c42] rounded-lg flex items-center justify-center mr-3">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Cartmandu</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Your trusted online shopping destination for quality products at unbeatable prices.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce Street, City, State 12345</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-[#f8732c] transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#f8732c] transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-[#f8732c] transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-[#f8732c] transition-colors">Blog</Link></li>
                <li><Link href="/press" className="hover:text-[#f8732c] transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-[#f8732c] transition-colors">Help Center</Link></li>
                <li><Link href="/returns" className="hover:text-[#f8732c] transition-colors">Returns</Link></li>
                <li><Link href="/shipping" className="hover:text-[#f8732c] transition-colors">Shipping Info</Link></li>
                <li><Link href="/track" className="hover:text-[#f8732c] transition-colors">Track Order</Link></li>
                <li><Link href="/size-guide" className="hover:text-[#f8732c] transition-colors">Size Guide</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/privacy" className="hover:text-[#f8732c] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#f8732c] transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-[#f8732c] transition-colors">Cookie Policy</Link></li>
                <li><Link href="/accessibility" className="hover:text-[#f8732c] transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Cartmandu. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">We accept:</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-gray-800 font-bold">VISA</div>
                <div className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-gray-800 font-bold">MC</div>
                <div className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-gray-800 font-bold">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}