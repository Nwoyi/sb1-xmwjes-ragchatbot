import React from 'react';
import { CreditCard, User, Bell, Shield } from 'lucide-react';

export default function Settings() {
  const sections = [
    {
      title: 'Account',
      icon: <User className="h-6 w-6" />,
      fields: [
        { label: 'Name', value: 'John Doe', type: 'text' },
        { label: 'Email', value: 'john@example.com', type: 'email' }
      ]
    },
    {
      title: 'Subscription',
      icon: <CreditCard className="h-6 w-6" />,
      fields: [
        { label: 'Current Plan', value: 'Pro', type: 'text', readonly: true },
        { label: 'Usage', value: '45/100 pages', type: 'text', readonly: true }
      ]
    },
    {
      title: 'Notifications',
      icon: <Bell className="h-6 w-6" />,
      fields: [
        { label: 'Email Notifications', type: 'checkbox', checked: true },
        { label: 'Processing Updates', type: 'checkbox', checked: true }
      ]
    },
    {
      title: 'Security',
      icon: <Shield className="h-6 w-6" />,
      fields: [
        { label: 'Two-Factor Authentication', type: 'checkbox', checked: false },
        { label: 'Change Password', type: 'button', action: 'Change' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="rounded-md bg-blue-100 dark:bg-blue-900 p-3">
                    {React.cloneElement(section.icon, {
                      className: 'h-6 w-6 text-blue-600 dark:text-blue-400'
                    })}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    {field.type === 'checkbox' ? (
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          defaultChecked={field.checked}
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"></label>
                      </div>
                    ) : field.type === 'button' ? (
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        {field.action}
                      </button>
                    ) : (
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        readOnly={field.readonly}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}