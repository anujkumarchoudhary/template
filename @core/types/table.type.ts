import React from "react";

// 🔹 Your data type
export type Category = {
  _id: string;
  name: string;
  description: string;
};

// 🔹 Column type (generic)
export type Column<T> = {
  key: keyof T | "actions";
  label?: string;
  span?: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
};

// 🔹 Table props
export type DynamicTableProps<T> = {
  isAdd?:boolean;
  columns: any[];
  data: T[];
  loading?: boolean;
  headingText?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  pagination?: boolean;
  itemsPerPage?: number;
  handleClick?: () => void;

  // 👉 ADD THESE
  isAction?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export type IBlogColumn = {
  _id: string;
  postTitle: string;
  slug: string;
  createdAt: string;
  category?: {
    name: string;
  };
  seo?: {
    metaDescription?: string;
  };
};
export type IServiceColumn = {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  category?: {
    name: string;
  };
  seo?: {
    metaDescription?: string;
  };
}

export type IEnquiryColumn = {
  _id: string;
  postTitle: string;
  slug: string;
  createdAt: string;
  category?: {
    name: string;
  };
  seo?: {
    metaDescription?: string;
  };
};

export type IProductColumn = {
  _id: string;
  name: string;
  slug: string;

  featuredImage: string;
  images?: string[];

  description?: string;

  category: string; // currently ID (not populated)
  subCategory?: string[];

  pricePerUnit: number;
  pricingType: "perWord" | "perUnit";

  stock: number;
  status: "active" | "inactive";

  tags?: string[];
  keywords?: string[];

  minimumQuantity?: number;
  minimumWords?: number;

  isFreeProduct: boolean;

  metaTitle?: string;
  metaDescription?: string;
  canonicalLink?: string;

  priority?: number;

  formId?: string;

  createdAt: string;
  updatedAt: string;

  createdBy?: string;
  updatedBy?: string;
};

export type IOrder = {
  _id: string;
  id: string;
  user: string;
  amount: string;
  status: string;
};
