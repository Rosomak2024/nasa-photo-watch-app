export default function Modal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div
      className="modal"
      onClick={onClose}
    >
      <h2>{photo.title}</h2>

      <img
        src={photo.url}
        alt={photo.title}
        onClick={(e) => e.stopPropagation()}
      />

      <p>{photo.explanation}</p>
    </div>
  );
}