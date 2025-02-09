import { Category, Product, ProductTierDTO } from "@/models/Models";

const API_BASE_URL = process.env.BASE_URL+"/api/v1";

class MenuService {
  static async fetchData<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }

  static async getAllCategories(): Promise<Category[]> {
    return await this.fetchData<Category[]>(`${API_BASE_URL}/categories`);
  }

  static async getAllParentCategories(): Promise<Category[]> {
    return await this.fetchData<Category[]>(`${API_BASE_URL}/categories/parent`);
  }

  static async getAllSubCategories(): Promise<Category[]> {
    return await this.fetchData<Category[]>(`${API_BASE_URL}/categories/sub`);
  }

  static async getCategoryById(id: string): Promise<Category> {
    return await this.fetchData<Category>(`${API_BASE_URL}/category/${id}`);
  }

  static async addCategory(category: Category): Promise<Category> {
    return await this.fetchData<Category>(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  }

  static async deleteCategory(id: string): Promise<void> {
    await this.fetchData<void>(`${API_BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async getAllProducts(): Promise<Product[]> {
    return await this.fetchData<Product[]>(`${API_BASE_URL}/products`);
  }

  static async getProductsByCatId(id: string): Promise<Product[]> {
    return await this.fetchData<Product[]>(`${API_BASE_URL}/product/orderTear/${id}`);
  }
  static async addProduct(product: Product): Promise<Product> {
    return await this.fetchData<Product>(`${API_BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  }
  static async updateProductById(id: string, product: Product): Promise<Product> {
    return await this.fetchData<Product>(`${API_BASE_URL}/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

  }

  static async updateProduct(product: Product): Promise<Product> {
    return await this.fetchData<Product>(`${API_BASE_URL}/product`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

  }
  static async updateTears(tierDTO: ProductTierDTO[]): Promise<ProductTierDTO[]> {
    return await this.fetchData<ProductTierDTO[]>(`${API_BASE_URL}/tiers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tierDTO),
    });

  }

  static async getProductById(id: string): Promise<Product> {
    return await this.fetchData<Product>(`${API_BASE_URL}/product/${id}`);
  }
 
  static async deleteProductById(id: string): Promise<void> {
    await this.fetchData<void>(`${API_BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default MenuService;
