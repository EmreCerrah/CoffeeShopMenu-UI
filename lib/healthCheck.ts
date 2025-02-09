// const API_BASE_URL = process.env.BASE_URL;
// const BACKEND_URL = API_BASE_URL+"/actuator/health";

import MenuService from "@/services/MenuService";

export async function checkServerHealth() {
    try {
        const response = MenuService.getAllParentCategories()
        if (!response) {
            throw new Error(`HTTP Error:`);
        }
        console.log("✅ Backend çalışıyor:", response);
        // return data;
    } catch (error) {
        console.error("❌ Backend çalışmıyor:", error);
    }
}