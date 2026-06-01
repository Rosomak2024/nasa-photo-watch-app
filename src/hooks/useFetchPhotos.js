import { useEffect, useState } from "react";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API_KEY
          }&count=12`
        );

        // if resposne not ok  throw error
        if (!res.ok) {
          throw new Error(`NASA API responded with ${res.status}`);
        }

        const data = await res.json();

        // defensive check if no array throw error
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return {
    photos,
    loading,
    error,
  };
}