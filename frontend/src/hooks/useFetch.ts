import { useState, useEffect } from 'react';
import { IMovie } from '../models/Movie';

export const useFetch = (url: string, favoriteMovie: boolean, method: string) => {
  const [datas, setDatas] = useState<IMovie[] | null>(null);
  const [data, setData] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<{} | null>(null);

  const postData = (postData: IMovie) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    })    
  }

  const updateData = (updatedData: IMovie) => { 
    setOptions({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })    
  }

  const deleteData = () => {
    setOptions({
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchDatas = async (fetchOptions: any | null) => {
      setLoading(true);
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
        
        if(!res.ok) throw new Error(res.statusText);

        const jsonDatas = await res.json();
        // console.log("jsonDatas", jsonDatas);

        if(favoriteMovie === true) {
          setLoading(false);
          setDatas(jsonDatas.filter((data: IMovie) => data.isFavorite === favoriteMovie));
          setError(null);
        } else {
          setLoading(false);
          setDatas(jsonDatas);
          setData(jsonDatas);
          setError(null);
        }
      } catch (err: any) {
        if(err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setLoading(false);
          setError('Service indisponible !');
        }
      }
    }

    if(method === "GET") fetchDatas(null)
    if(method === "POST" && options) fetchDatas(options)
    if(method === "PUT" && options) fetchDatas(options)
    if(method === "DELETE" && options) fetchDatas(options)    
    
    // Clean up
    return () => controller.abort()
  }, [url, favoriteMovie, method, options])

  return { datas, data, loading, error, deleteData, postData, updateData };
}
