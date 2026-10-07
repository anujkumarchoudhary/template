"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Link from "next/link";
import AdminAuthGuard from "./AdminAuthGuard";

// import { BaseURL } from "../baseUrl";

import axios from "axios";

import { FaCircleUser } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import {
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdLogout,
} from "react-icons/md";

import { categoryConfig, menuData, Notifications } from "./data/data";
import logo from '../../public/vercel.svg'

import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(Notifications);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "read") return n.isRead;
    return true;
  });

  const groupedNotifications = filteredNotifications.reduce(
    (acc: any, curr) => {
      if (!acc[curr.type]) acc[curr.type] = [];
      acc[curr.type].push(curr);
      return acc;
    },
    {},
  );

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${"BaseURL"}contact`);

      console.log("📦 API DATA:", res.data);

      const data = res.data.data || [];

      const filtered = data.filter((item: any) => item.isRead === false);

      setEnquiries(filtered);
    } catch (error) {
      console.log("❌ FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL API CALL
  ========================== */

  useEffect(() => {
    fetchEnquiries();
  }, [refresh]);

  /* =========================
     REALTIME SOCKET UPDATE
  ========================== */

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 w-full py-4 px-10 bg-white flex items-center justify-between z-50 shadow-sm">
        <div
          onClick={() => router.push("/admin")}
          className="flex cursor-pointer gap-6"
        >
          <Image
            src={logo}
            alt="Logo"
            width={140}
            height={50}
            className=""
          />
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={` ${isOpen ? "left-66.5" : "left-26.5"
              }    cursor-pointer p-2 flex items-center justify-center active:scale-95 transition-all duration-300`}
          >
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft size={25} />
            ) : (
              <MdKeyboardDoubleArrowRight size={25} />
            )}
          </div>
          <div className="rounded-full w-100 bg-[#f8f8f8] border border-black/10 flex items-center overflow-hidden transition-all duration-300">
            <input
              type="text"
              placeholder={"Search..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none px-5 py-3"
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="relative group pb-2">
            <div className="relative cursor-pointer p-2 rounded-full bg-green-100">
              <FaRegBell
                size={25}
                onClick={() => setOpen((prev) => !prev)}
                className="text-green-600 z-50"
              />

              {enquiries.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px] w-fit h-fit font-bold flex items-center justify-center py-0.5 px-2 rounded-full">
                  {enquiries.length > 9 ? "9+" : enquiries.length}
                </span>
              )}

              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-primary/30 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                <div className="flex items-center gap-2">
                  <FaRegBell className="text-xl" />
                  <h2 className="font-semibold text-xl">Notification</h2>
                </div>

                <div className="flex gap-2 my-3">
                  {["all", "unread", "read"].map((tab, index) => (
                    <button
                      aria-label={`read ${index + 1}`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs rounded-full ${activeTab === tab
                        ? "bg-black text-white"
                        : "bg-gray-200"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* List */}
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {Object.entries(groupedNotifications).map(
                    ([type, items]: any) => {
                      const config =
                        categoryConfig[type as keyof typeof categoryConfig];

                      return (
                        <div key={type}>
                          <p
                            className="text-xs font-semibold mb-2"
                            style={{ color: config.color }}
                          >
                            {config.label} ({items.length})
                          </p>

                          <div className="space-y-2">
                            {items.map((n: any) => (
                              <div
                                key={n.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                                style={
                                  !n.isRead
                                    ? { backgroundColor: config.bg }
                                    : {}
                                }
                              >
                                <div
                                  className="w-8 h-8 flex items-center justify-center rounded-full"
                                  style={{
                                    backgroundColor: config.bg,
                                    color: config.color,
                                  }}
                                >
                                  {config.icon}
                                </div>

                                <div className="flex-1">
                                  <p className="text-sm">{n.text}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                    <FaClock size={12} />
                                    <p className="text-xs text-gray-400">
                                      {n.time}
                                    </p>
                                  </div>
                                </div>

                                <div
                                  onMouseEnter={() => setHoveredId(n.id)}
                                  onMouseLeave={() => setHoveredId(null)}
                                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                                >
                                  {hoveredId === n.id ? (
                                    <span
                                      onClick={() => removeNotification(n.id)}
                                    >
                                      ✕
                                    </span>
                                  ) : (
                                    !n.isRead && (
                                      <span
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                          backgroundColor: config.color,
                                        }}
                                      ></span>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    },
                  )}

                  {Object.keys(groupedNotifications).length === 0 && (
                    <p className="text-center text-gray-400 text-sm">
                      No notifications
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group pb-2">
            <div className="flex gap-2">
              <div className="rounded-full bg-orange-100 p-2">
                <BiUser size={25} className="text-orange-600 cursor-pointer" />
              </div>
              <p className=" font-semibold py-1 my-auto">
                {userData?.name?.split(" ")[0]}
              </p>
            </div>

            <div className="absolute right-0 mt-1 w-60 bg-white rounded-2xl border border-secondary/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible     transition-all duration-200">
              <div className="px-4 pt-4 text-center">
                <FaCircleUser className="text-5xl text-primary mx-auto" />
                <p className="text-sm font-semibold py-1">{userData?.name}</p>
                <p className="text-xs text-gray-500">{userData?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-4 px-3 cursor-pointer hover:text-red-600 font-semibold transition"
              >
                <div className="flex gap-2 items-center justify-center">
                  {isOpen && "Logout"}
                  <MdLogout size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-[5.4rem]">
        {/* Sidebar */}
        <aside
          className={`
          fixed left-0 flex flex-col justify-between
          transition-all duration-300 ease-in-out shadow-md
          ${isOpen ? "w-68" : "w-24"}
          h-[calc(100vh-4rem)]
          bg-white py-4 pr-4 z-10
        `}
        >
          {/* ================= MENU ================= */}
          <div>
            {menuData.map((menu: any, idx) => {
              const hasChildren = !!menu.children;

              const isActive =
                (menu.path && pathname === menu.path) ||
                (menu.path !== "/admin" && pathname.startsWith(menu.path)) ||
                (hasChildren &&
                  menu.children.some((sub: any) =>
                    pathname.startsWith(sub.path),
                  ));

              const isOpenMenu = openMenu === menu.label;

              /* ================= CLICK HANDLER ================= */
              const handleClick = () => {
                if (hasChildren) {
                  setOpenMenu(isOpenMenu ? null : menu.label);
                }
              };

              return (
                <div key={idx}>
                  {/* ================= ITEM ================= */}

                  {hasChildren ? (
                    /* ===== PARENT (NO LINK, ONLY TOGGLE) ===== */
                    <div
                      onClick={handleClick}
                      className={`
                      relative cursor-pointer rounded-r-full mb-2
                      transition-all duration-300
                      ${isOpen ? "py-2 px-4" : "py-2 flex justify-center"}
                      ${isActive ? "text-white" : "text-gray-600 hover:text-black"}
                    `}
                    >
                      {/* ACTIVE BG */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-r-full bg-linear-to-r from-primary/90 to-primary backdrop-blur-md border border-white/20 shadow-md" />
                      )}

                      {/* HOVER BG */}
                      {!isActive && (
                        <span className="absolute inset-0 rounded-r-full bg-white/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition border border-white/20" />
                      )}

                      {/* CONTENT */}
                      <div
                        className={`relative flex items-center z-10 ${isOpen ? "justify-between" : "justify-center"
                          }`}
                      >
                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`p-2 rounded-full ${isActive
                              ? "bg-white/20 text-white"
                              : "text-gray-500"
                              }`}
                          >
                            {menu.icon}
                          </span>

                          {isOpen && (
                            <p className="font-medium tracking-wide">
                              {menu.label}
                            </p>
                          )}
                        </div>

                        {/* RIGHT ARROW */}
                        {hasChildren && isOpen && (
                          <span
                            className={`
                            transition-transform duration-300 text-sm
                            ${isOpenMenu ? "rotate-180" : ""}
                          `}
                          >
                            <MdKeyboardArrowDown size={20} />
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* ===== NORMAL LINK ===== */
                    <Link
                      href={menu.path}
                      className={`
                      relative block rounded-r-full mb-2
                      transition-all duration-300
                      ${isOpen ? "py-2 px-4" : "py-2 flex justify-center"}
                      ${isActive ? "text-white" : "text-gray-600 hover:text-black"}
                    `}
                    >
                      {/* ACTIVE BG */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-r-full bg-linear-to-r from-primary/90 to-primary backdrop-blur-md border border-white/20 shadow-md" />
                      )}

                      {/* HOVER BG */}
                      {!isActive && (
                        <span className="absolute inset-0 rounded-r-full bg-white/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition border border-white/20" />
                      )}

                      {/* CONTENT */}
                      <div
                        className={`relative flex items-center z-10 ${isOpen ? "gap-3" : "justify-center"
                          }`}
                      >
                        <span
                          className={`p-2 rounded-full ${isActive
                            ? "bg-white/20 text-white"
                            : "text-gray-500"
                            }`}
                        >
                          {menu.icon}
                        </span>

                        {isOpen && (
                          <p className="font-medium tracking-wide">
                            {menu.label}
                          </p>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* ================= SUBMENU ================= */}
                  {hasChildren && isOpenMenu && isOpen && (
                    <div className="ml-0 w-[80%] mb-1 space-y-1">
                      {menu.children.map((sub: any, i: any) => {
                        const isSubActive = pathname === sub.path;

                        return (
                          <Link
                            key={i}
                            href={sub.path}
                            className={`
            relative block rounded-r-full transition-all  duration-300
            py-3 pl-8 pr-4 text-[28px]
            ${isSubActive ? "text-white" : "text-gray-600 hover:text-black"}
          `}
                          >
                            {/* ACTIVE BG */}
                            {isSubActive && (
                              <span className="absolute inset-0  rounded-r-full bg-linear-to-r from-primary/80 to-primary backdrop-blur-md border border-white/20 shadow-md" />
                            )}

                            {/* HOVER BG */}
                            {!isSubActive && (
                              <span className="absolute inset-0 rounded-r-full bg-white/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition border border-white/20" />
                            )}

                            {/* CONTENT */}
                            <div className="relative z-10 flex items-center gap-3">
                              {/* SMALL DOT ICON (like indicator) */}
                              <span
                                className={`
                w-2 h-2 rounded-full
                ${isSubActive ? "bg-white" : "bg-gray-400"}
              `}
                              />

                              <span className="text-[1rem] font-medium tracking-wide">
                                {sub.label}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ================= SETTINGS ================= */}
          <button
            aria-label="Settings"
            className="mb-4 py-3 px-3 rounded-md bg-blue-100 hover:bg-red-100 hover:text-red-600 font-semibold transition"
          >
            <div className="flex gap-3 items-center justify-center">
              <IoSettingsOutline size={20} />
              {isOpen && "Settings"}
            </div>
          </button>
        </aside>

        {/* Main Content */}
        <main
          className={`bg-slate-50 ${isOpen ? "ml-68" : "ml-24"} w-full h-full transition-all duration-300 p-6`}
        >
          <AdminAuthGuard>{children}</AdminAuthGuard>
        </main>
      </div>
    </div>
  );
}