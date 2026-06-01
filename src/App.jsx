import { useState } from "react";
import PhotoCard from "./components/PhotoCard";
import Modal from "./components/Modal";
import useFetchPhotos from "./hooks/useFetchPhotos";
import Spinner from "./components/Spinner";

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <input
       type="text"
       placeholder="Search NASA photos..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPhotos.length === 0 && (
      <h2>No photos found.</h2>
      )}
      <div className="gallery">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.date}
            photo={photo}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      {selectedPhoto && (
        <Modal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </main>
  );
}

export default App;
