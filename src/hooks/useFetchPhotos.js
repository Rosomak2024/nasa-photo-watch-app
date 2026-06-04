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

        const apiKey = import.meta.env.VITE_NASA_API_KEY;

        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=12`
        );

        if (!res.ok) {
          throw new Error(`NASA API responded with ${res.status}`);
        }

        const data = await res.json();

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