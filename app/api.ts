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

export const fixWrongCode = async(wrongcode: string, suggestion: string) =>{
  try{
    const response = await api.post("/fix/wrong/code",{wrongcode, suggestion})
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const testDataUpload = async(formdata: FormData) =>{
  try{
    const response = await api.post("/analyzeCodeWithCriteria",formdata,{
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
  }catch(error){
    console.log(error);
    throw error;
  }
}