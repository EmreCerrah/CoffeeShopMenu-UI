import { User } from "@/models/Models";

const API_BASE_URL = process.env.BASE_URL;
const API_BASE_AUTH = API_BASE_URL+"/api/auth";
const API_BASE_SECRET = API_BASE_URL+"/api/secret";

class AuthService {
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
  static setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // expire time
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`; // Cookie save
  }

  static getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  static async register (): Promise<boolean> {
    return await this.fetchData<boolean>(`${API_BASE_URL}/`);
  }

  static async Login(username:string,password :string): Promise<boolean> {
    const user = await this.fetchData<User>(`${API_BASE_AUTH}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (user && user.accessToken) {
      this.setCookie('auth_token', user.accessToken, 1); // store for 1 day
      console.log('User logged in:', user);
      return true;
    }
    return false;
  }

  static async Logout(): Promise<boolean> {
   // Cookie'yi temizle
   document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
   return true;
  }

  static async getCurrentUser (): Promise<boolean> {
    const token = this.getCookie('auth_token');
    if (!token) {
      console.error('Token not found in cookies.');
      return false;
    }
    return await this.fetchData<boolean>(`${API_BASE_SECRET}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
    });
}

}

export default AuthService;
