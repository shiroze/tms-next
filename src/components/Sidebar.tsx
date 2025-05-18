"use client";

import Link from 'next/link';
// import { 
//   HomeIcon, 
//   CubeIcon, 
//   ArrowsRightLeftIcon,
//   DocumentChartBarIcon,
//   Cog6ToothIcon,
//   UsersIcon,
//   BuildingStorefrontIcon,
//   ClipboardDocumentListIcon,
//   TruckIcon,
//   ReceiptPercentIcon
// } from '@heroicons/react/24/outline';
import { useState } from 'react';

const menuItems = [
  { 
    name: 'Dashboard', 
    // icon: HomeIcon, 
    href: '/',
  },
  {
    name: 'Master',
    // icon: ClipboardDocumentListIcon,
    submenu: [
      {
        name: 'Products',
        // icon: CubeIcon,
        href: '/master/products',
      },
      {
        name: 'Business Partners',
        // icon: BuildingStorefrontIcon,
        href: '/master/partners',
      }
    ]
  },
  {
    name: 'Transaction',
    // icon: ArrowsRightLeftIcon,
    submenu: [
      {
        name: 'Purchase',
        // icon: TruckIcon,
        submenu: [
          { name: 'Purchase Orders', href: '/transaction/purchase/orders' },
          { name: 'Goods Receipt', href: '/transaction/purchase/receipts' },
          { name: 'Purchase Invoice', href: '/transaction/purchase/invoices' },
        ]
      },
      {
        name: 'Sales',
        // icon: ReceiptPercentIcon,
        submenu: [
          { name: 'Sales Orders', href: '/transaction/sales/orders' },
          { name: 'Delivery Orders', href: '/transaction/sales/delivery' },
          { name: 'Sales Invoice', href: '/transaction/sales/invoices' },
        ]
      }
    ]
  },
  { 
    name: 'Reports', 
    // icon: DocumentChartBarIcon, 
    href: '/reports' 
  },
  { 
    name: 'Users', 
    // icon: UsersIcon, 
    href: '/users' },
  { 
    name: 'Settings', 
    // icon: Cog6ToothIcon, 
    href: '/settings' 
  },
];

type MenuItem = {
  name: string;
  icon?: any;
  href?: string;
  submenu?: MenuItem[];
};

function MenuItemComponent({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const paddingLeft = `${depth * 1}rem`;

  if (item.submenu) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
          style={{ paddingLeft: `${paddingLeft + 1}rem` }}
        >
          {/* <item.icon className="w-5 h-5 mr-3" /> */}
          {item.name}
          <svg
            className={`w-4 h-4 ml-auto transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="bg-gray-50">
            {item.submenu.map((subItem) => (
              <MenuItemComponent key={subItem.name} item={subItem} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href || "#"}
        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        style={{ paddingLeft: `${paddingLeft + 1}rem` }}
      >
        {/* {item.icon && <item.icon className="w-5 h-5 mr-3" />} */}
        {item.name}
      </Link>
    </li>
  );
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-lg overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Stock Manager</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <MenuItemComponent key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}