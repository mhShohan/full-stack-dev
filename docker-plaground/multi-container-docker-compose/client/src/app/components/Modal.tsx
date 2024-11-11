
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // Modal title
  children: React.ReactNode; // Content to render inside the modal
  footer?: React.ReactNode; // Optional footer content
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md" />
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg p-6 relative z-10 w-96">
        {/* Close Button in Top Right */}
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400 transition duration-300"
          onClick={onClose}
          aria-label="Close"
        >
          &times; {/* Unicode character for the cross icon */}
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        
        {/* Dynamic Content */}
        <div className="mb-4">{children}</div>

        {/* Optional Footer */}
        {footer && (
          <div className="mt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
