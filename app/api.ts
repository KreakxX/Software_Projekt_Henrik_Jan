 import axios from "axios";


const api = axios.create({
  baseURL: 'http://localhost:8000'
});


export const askGeminiforCodeReview = async() =>{
  try{
    const response = await api.get("/test")
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}