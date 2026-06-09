import { useState } from "react";
import PhotoCard from "./components/PhotoCard";
import Modal from "./components/Modal";
import useFetchPhotos from "./hooks/useFetchPhotos";
import Spinner from "./components/Spinner";

function App() {
  const { photos, loading, error,fetchAgain } = useFetchPhotos();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }
  
  if (error) {
    return (
      <div className="error-message">
        <h2>NASA API is currently unavailable.</h2>
        <p>{error}</p>
  
        <button className="retry-button" onClick={fetchAgain}>
          Try Again
        </button>
      </div>
    );
  }


  return (
    <main className="app-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search NASA photos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      {filteredPhotos.length === 0 && (
        <h2 className="empty-state">No photos found.</h2>
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
