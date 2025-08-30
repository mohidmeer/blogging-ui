import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: { "Content-Type": "application/json" },
});

// FIX 

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("blogger-api-auth-token");

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log("No token found, proceeding without Authorization header.");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const apiService = {
    async Login(data: any) {
        try {
            const res = await axiosClient.post('/login', data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    },
    async Register(data:any){
        try {
            const res = await axiosClient.post('/register', data)
            return res.data
        } catch (error) {
            console.log(error)
        }

    } ,
    async GetAllSchedules(): Promise<{ success: boolean; schedules: Schedule[] }> {
        try {
            const response = await axiosClient.get("/schedule");

            console.log(response);

            if (response.data.success && Array.isArray(response.data.schedules)) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error fetching schedules:", error);
            throw new Error(error.response?.data?.message || "Failed to fetch schedules.");
        }
    },
    async DeleteSchedule(id: string): Promise<{ success: boolean }> {

       
        try {
            const response = await axiosClient.delete(`/schedule/${id}`, );

        

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to delete schedule.");
        }
    },
    async RunSchedule(id: string): Promise<{ success: boolean }> {

       
        try {
            const response = await axiosClient.get(`/schedule/${id}/run`, );

        

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to delete schedule.");
        }
    },    
    async StopSchedule(id: string): Promise<{ success: boolean }> {

       
        try {
            const response = await axiosClient.get(`/schedule/${id}/stop`, );

        

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to delete schedule.");
        }
    },
    async AddCredits(data: { quantity: number }) {
        try {
            const response = await axiosClient.post("/credits", data, );

            return response.data; // Return the API response
        } catch (error: any) {
            console.error("Error adding credits:", error);
            throw new Error(error.response?.data?.message || "Failed to add credits.");
        }
    },
    async ShowCredits(): Promise<{ success: boolean; credits: number }> {
        try {
            const response = await axiosClient.get("/credits", );

            if (response.data.success && typeof response.data.credits === "number") {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error fetching credits:", error);
            throw new Error(error.response?.data?.message || "Failed to fetch credits.");
        }
    },
    async AddSchedule(data: any): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await axiosClient.post("/schedule", data, );

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || "Failed to add schedule.");
            }
        } catch (error: any) {
            console.error("Error adding schedule:", error);
            throw new Error(error.response?.data?.message || "An error occurred while adding the schedule.");
        }
    },
    async UpdateSchedule(id: string, data: any): Promise<{ success: boolean }> {
        try {
            const response = await axiosClient.put(`/schedule/${id}`, data, );
    
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    }

}


// Define the Schedule type
interface Schedule {
    _id: string; // Ensure _id is included
    title: string;
    schedule: string; // e.g., "daily"
    time: string; // e.g., "8:00 AM"
    active: boolean; // e.g., true/false
}