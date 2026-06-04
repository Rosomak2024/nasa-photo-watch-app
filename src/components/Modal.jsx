export default function Modal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">{photo.title}</h2>

        <img
          className="modal-image"
          src={photo.url}
          alt={photo.title}
        />

        <p className="modal-description">
          {photo.explanation}
        </p>
      </div>
    </div>
  );
}