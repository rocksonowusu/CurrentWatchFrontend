import axios from 'axios';

const API_BASE_URL = 'http://10.232.62.63:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export async function submitPhoneNumber(email: string, phoneNumber:string){
    try {
        const response = await api.post('onboarding/phone-verification/',{
            email,
            phone_number:phoneNumber
        });
        return response.data;
    } catch (error:any){
        const errorMessage = error?.response?.data?.error || 'Failed to verify phone number';
        throw new Error(errorMessage);
    }
}


