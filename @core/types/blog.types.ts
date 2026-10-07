export interface Blog {
  _id: string;
  slug: string;
  postTitle: string;
  postDescription: string;
  featuredImage: string;
  excerpt: string;
  createdAt: string;
  category: {
    name: string;
  };
  seo: {
    metaDescription: string;
  };
  user: {
    name: string;
  };
}

export interface PaginationObject {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IProps {
  data: Blog[];
  pagination: PaginationObject;
  message?: string;
}