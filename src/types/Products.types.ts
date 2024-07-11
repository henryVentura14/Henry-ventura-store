export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string | string[];
  rating: Rating;
}

export interface CreateEditFormProps {
  onClose: () => void;
  product?: any;
  disabled?: boolean;
}

export interface DeleteConfirmationProps {
  productId: number;
  onClose: () => void;
  onDelete?: () => void;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  srcImg?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
  modalContent: React.ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
