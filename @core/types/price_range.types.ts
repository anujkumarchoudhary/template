export interface IPriceRange {
  _id?: string;
  label: string; // "$25,000 - $50,000"
  min: number;
  max: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}