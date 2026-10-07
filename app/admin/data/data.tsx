import { IoLayers } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { MdCategory, MdRoomPreferences } from "react-icons/md";

import {
  HiClipboardDocument,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUser,
} from "react-icons/hi2";
import { GoArrowSwitch } from "react-icons/go";

export const menuData = [
  { label: "Dashboard", path: "/admin", icon: <RiDashboardFill size={20} /> },
  {
    label: "Sales",
    icon: <PiShoppingCartSimple size={20} />,
    children: [
      {
        label: "Products",
        path: "/admin/product",
        icon: <IoLayers size={20} />,
      },
      {
        label: "Orders",
        path: "/admin/order",
      },
      {
        label: "Payments",
        path: "/admin/sales/payments",
      },
      {
        label: "Invoices",
        path: "/admin/sales/invoices",
      },
    ],
  },
  { label: "Blog", path: "/admin/blog", icon: <FaBlog size={20} /> },
  { label: "Redirects", path: "/admin/redirect", icon: <GoArrowSwitch size={20} /> },

  {
    label: "Service Meta",
    path: "/admin/service-meta",
    icon: <FaServicestack size={20} />,
  },
  {
    label: "Case Study",
    path: "/admin/case-study",
    icon: <HiClipboardDocument size={20} />,
  },
  {
    label: "Category",
    path: "/admin/category",
    icon: <MdCategory size={20} />,
  },

  // ✅ SALES (with submenu)
  {
    label: "Notifications",
    path: "/admin/notification",
    icon: <IoMdNotifications size={20} />,
  },
  {
    label: "Enquiry",
    path: "/admin/enquiry",
    icon: <AiOutlineQuestionCircle size={20} />,
  },
  {
    label: "Preference",
    icon: <MdRoomPreferences size={20} />,
    children: [
      {
        label: "Templates",
        path: "/admin/preferences",
      },
      {
        label: "Global settings",
        path: "#",
      },
    ],
  },
];

export const Notifications = [
  {
    id: 1,
    type: "user",
    text: "User A created account",
    time: "2 min ago",
    isRead: false,
  },
  {
    id: 2,
    type: "user",
    text: "User B updated profile",
    time: "5 min ago",
    isRead: false,
  },
  {
    id: 3,
    type: "order",
    text: "Order #1234 placed",
    time: "10 min ago",
    isRead: false,
  },
  {
    id: 4,
    type: "order",
    text: "Order #5678 delivered",
    time: "30 min ago",
    isRead: true,
  },
  {
    id: 5,
    type: "enquiry",
    text: "New enquiry received",
    time: "1 hour ago",
    isRead: true,
  },
];

export const categoryConfig = {
  user: {
    label: "Users",
    icon: <HiOutlineUser />,
    iconBg: "bg-purple-100",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  order: {
    label: "Orders",
    icon: <PiShoppingCartSimple />,
    iconBg: "bg-green-100",
    color: "#16A34A",
    bg: "#F0FDF4",
  },
  enquiry: {
    label: "Enquiries",
    icon: <HiOutlineChatBubbleLeftRight />,
    iconBg: "bg-blue-100",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
};