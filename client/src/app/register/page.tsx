"use client";

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Eye, 
  EyeOff, 
  ShoppingBag, 
  Mail, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  ShoppingCart,
  Truck,
  Package,
  Gift,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', { email: values.email });
      // Here you would typically make an API call to register the user
      alert('Registration successful! Please check your email for verification.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-blue-400 rounded-full blur-xl"></div>
      </div>

      {/* Floating Ecommerce Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Area */}
        <div className="absolute top-16 left-16 animate-bounce opacity-30" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <ShoppingCart className="w-8 h-8 text-orange-400" />
        </div>
        
        <div className="absolute top-24 left-32 animate-pulse opacity-25" style={{ animationDelay: '1s' }}>
          <Package className="w-6 h-6 text-blue-400" />
        </div>

        <div className="absolute top-12 left-1/4 animate-bounce opacity-20" style={{ animationDelay: '2.5s', animationDuration: '4s' }}>
          <Gift className="w-7 h-7 text-orange-300" />
        </div>

        <div className="absolute top-20 right-24 animate-bounce opacity-30" style={{ animationDelay: '2s', animationDuration: '4s' }}>
          <Truck className="w-8 h-8 text-blue-400" />
        </div>

        <div className="absolute top-40 right-16 animate-pulse opacity-25" style={{ animationDelay: '0.5s' }}>
          <ShoppingBag className="w-6 h-6 text-orange-400" />
        </div>

        <div className="absolute top-8 right-1/3 animate-bounce opacity-20" style={{ animationDelay: '3.2s', animationDuration: '3.5s' }}>
          <CreditCard className="w-7 h-7 text-blue-300" />
        </div>

        <div className="absolute top-36 right-1/4 animate-pulse opacity-25" style={{ animationDelay: '1.8s' }}>
          <Package className="w-5 h-5 text-orange-300" />
        </div>

        {/* Middle Left Area */}
        <div className="absolute top-1/2 left-8 animate-bounce opacity-30" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
          <CreditCard className="w-8 h-8 text-blue-400" />
        </div>

        <div className="absolute top-1/3 left-20 animate-pulse opacity-25" style={{ animationDelay: '2.5s' }}>
          <ShoppingCart className="w-6 h-6 text-orange-400" />
        </div>

        <div className="absolute top-2/5 left-12 animate-bounce opacity-20" style={{ animationDelay: '4.2s', animationDuration: '4.8s' }}>
          <Truck className="w-7 h-7 text-blue-300" />
        </div>

        <div className="absolute top-3/5 left-24 animate-pulse opacity-25" style={{ animationDelay: '3.8s' }}>
          <Gift className="w-5 h-5 text-orange-300" />
        </div>

        {/* Middle Right Area */}
        <div className="absolute top-1/2 right-8 animate-bounce opacity-30" style={{ animationDelay: '3s', animationDuration: '4.5s' }}>
          <ShoppingBag className="w-8 h-8 text-orange-400" />
        </div>

        <div className="absolute top-2/3 right-20 animate-pulse opacity-25" style={{ animationDelay: '1.8s' }}>
          <Package className="w-6 h-6 text-blue-400" />
        </div>

        <div className="absolute top-1/3 right-12 animate-bounce opacity-20" style={{ animationDelay: '5s', animationDuration: '3.8s' }}>
          <ShoppingCart className="w-7 h-7 text-orange-300" />
        </div>

        <div className="absolute top-3/5 right-28 animate-pulse opacity-25" style={{ animationDelay: '2.2s' }}>
          <CreditCard className="w-5 h-5 text-blue-300" />
        </div>

        {/* Bottom Area */}
        <div className="absolute bottom-24 left-24 animate-bounce opacity-30" style={{ animationDelay: '2.2s', animationDuration: '3.8s' }}>
          <Truck className="w-8 h-8 text-blue-400" />
        </div>

        <div className="absolute bottom-16 right-32 animate-pulse opacity-25" style={{ animationDelay: '0.8s' }}>
          <Package className="w-6 h-6 text-orange-400" />
        </div>

        <div className="absolute bottom-32 left-1/3 animate-bounce opacity-20" style={{ animationDelay: '1.2s', animationDuration: '4.2s' }}>
          <Gift className="w-7 h-7 text-blue-300" />
        </div>

        <div className="absolute bottom-40 right-1/4 animate-pulse opacity-25" style={{ animationDelay: '3.5s' }}>
          <ShoppingCart className="w-5 h-5 text-orange-300" />
        </div>

        <div className="absolute bottom-12 left-1/4 animate-bounce opacity-20" style={{ animationDelay: '4.5s', animationDuration: '3.2s' }}>
          <CreditCard className="w-6 h-6 text-blue-300" />
        </div>

        <div className="absolute bottom-28 right-1/3 animate-pulse opacity-25" style={{ animationDelay: '1.5s' }}>
          <ShoppingBag className="w-5 h-5 text-orange-300" />
        </div>

        {/* Center scattered elements */}
        <div className="absolute top-1/4 left-1/3 animate-bounce opacity-20" style={{ animationDelay: '4s', animationDuration: '5s' }}>
          <Truck className="w-5 h-5 text-orange-300" />
        </div>

        <div className="absolute top-3/4 right-1/3 animate-pulse opacity-25" style={{ animationDelay: '2.8s' }}>
          <Package className="w-4 h-4 text-blue-300" />
        </div>

        <div className="absolute top-1/5 left-2/3 animate-bounce opacity-20" style={{ animationDelay: '3.5s', animationDuration: '4.3s' }}>
          <Gift className="w-5 h-5 text-blue-300" />
        </div>

        <div className="absolute top-4/5 left-1/2 animate-pulse opacity-25" style={{ animationDelay: '1.3s' }}>
          <ShoppingCart className="w-4 h-4 text-orange-300" />
        </div>

        <div className="absolute top-2/5 right-2/3 animate-bounce opacity-20" style={{ animationDelay: '5.2s', animationDuration: '3.7s' }}>
          <CreditCard className="w-5 h-5 text-blue-300" />
        </div>

        <div className="absolute top-3/5 left-3/5 animate-pulse opacity-25" style={{ animationDelay: '4.8s' }}>
          <ShoppingBag className="w-4 h-4 text-orange-300" />
        </div>

        {/* Additional small scattered elements */}
        <div className="absolute top-1/6 right-1/5 animate-bounce opacity-15" style={{ animationDelay: '6s', animationDuration: '4.5s' }}>
          <Package className="w-4 h-4 text-blue-200" />
        </div>

        <div className="absolute top-5/6 left-1/5 animate-pulse opacity-20" style={{ animationDelay: '2.5s' }}>
          <Truck className="w-4 h-4 text-orange-200" />
        </div>

        <div className="absolute top-1/8 left-3/4 animate-bounce opacity-15" style={{ animationDelay: '7s', animationDuration: '3.3s' }}>
          <Gift className="w-4 h-4 text-blue-200" />
        </div>

        <div className="absolute top-7/8 right-3/4 animate-pulse opacity-20" style={{ animationDelay: '3.3s' }}>
          <ShoppingCart className="w-4 h-4 text-orange-200" />
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-20 hidden lg:block">
        <div className="flex items-center space-x-2 text-blue-600/20">
          <ShoppingBag className="w-8 h-8" />
          <div className="w-16 h-1 bg-blue-600/20 rounded"></div>
        </div>
      </div>
      <div className="absolute bottom-20 right-20 hidden lg:block">
        <div className="flex items-center space-x-2 text-orange-500/20">
          <div className="w-16 h-1 bg-orange-500/20 rounded"></div>
          <ShoppingBag className="w-8 h-8" />
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KHARID</h1>
          <p className="text-gray-600">Your Premium Shopping Destination</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Join thousands of happy customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`pl-10 ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      {errors.email && touched.email ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      ) : values.email && !errors.email ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      ) : null}
                    </div>
                    <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        className={`pl-10 pr-10 ${errors.password && touched.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
                    {values.password && !errors.password && (
                      <div className="text-xs text-green-600 mt-1">Strong password ✓</div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className={`pl-10 pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600 mt-1" />
                    {values.confirmPassword && !errors.confirmPassword && values.password === values.confirmPassword && (
                      <div className="text-xs text-green-600 mt-1">Passwords match ✓</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  {/* Terms and Conditions */}
                  <p className="text-xs text-gray-600 text-center mt-4">
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              Free Shipping
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              Easy Returns
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}