 import axios from "axios";
import { data } from "framer-motion/client";


const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const databaseAPI = axios.create({
  baseURL: 'http://localhost:8080/Database'
});

export const fixWrongCode = async(wrongcode: string, suggestion: string) =>{
  try{
    const response = await api.post("/fix/wrong/code",{wrongcode, suggestion})
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const testDataUpload = async (title: string, studentname: string,file: File, pdfFile: File) => {   
  try {     
    const formData = new FormData();
    formData.append('title', title)
    formData.append('studentname', studentname)
    formData.append('file', file);
    formData.append('pdfFile', pdfFile);
    

    const response = await api.post("/analyzeCodeWithCriteria", formData, {       
      headers: {         
        "Content-Type": "multipart/form-data",       
      },     
    });     
    return response.data;     
  } catch (error) {     
    console.error(error);     
    throw error;   
  } 
};

export const getAllCodeReviews = async() =>{
  try{
    const response = await databaseAPI.get("/get/all/codeReviews")
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const deleteCodeReviewById = async(id: number) =>{
  try{
    await databaseAPI.delete(`/delete/by/${id}`)
    window.location.reload()
  }catch(error){
    console.log(error);
    throw error;
  }}
