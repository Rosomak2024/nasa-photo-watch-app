export default function Modal({ selectedPhoto, setSelectedPhoto }) {
    return (
      <div
        className="modal"
        onClick={() => setSelectedPhoto(null)}
      >
        <h2>{selectedPhoto.title}</h2>
  
        <img
          src={selectedPhoto.url}
          alt={selectedPhoto.title}
          onClick={(e) => e.stopPropagation()}
        />
  
        <p>{selectedPhoto.explanation}</p>
      </div>
    );
  }