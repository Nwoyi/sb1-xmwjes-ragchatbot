import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Document Processing',
      description: 'Upload PDFs, DOCXs, and text files for instant analysis'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Natural Conversations',
      description: 'Chat naturally with your documents using AI-powered responses'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Storage',
      description: 'Your documents are encrypted and stored securely'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Answers',
      description: 'Get accurate answers from your documents in seconds'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['20 pages per month', 'Basic chat support', 'Standard processing speed'],
      cta: 'Get Started'
    },
    {
      name: 'Pro',
      price: '$29',
      features: ['100 pages per month', 'Priority support', 'Faster processing', 'Advanced analytics'],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited pages', '24/7 support', 'Custom integration', 'Dedicated account manager'],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Chat with your documents</span>
              <span className="block text-blue-600 dark:text-blue-400">Get instant answers</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Upload your documents and start asking questions. Our AI will help you find the information you need instantly.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Powerful features for document analysis
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                          {React.cloneElement(feature.icon, {
                            className: 'h-6 w-6 text-white'
                          })}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  plan.highlighted
                    ? 'ring-2 ring-blue-600 bg-white dark:bg-gray-800'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">per month</p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md">
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}