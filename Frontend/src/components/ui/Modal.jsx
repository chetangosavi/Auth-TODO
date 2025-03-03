/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom';

const Modal = ({ children, open, setOpen }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="w-full h-full z-50 fixed top-0 left-0 flex items-center justify-center">
      <div 
        className="w-full h-full bg-black opacity-50 absolute top-0 left-0" 
        onClick={() => setOpen(false)}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
        <button 
          className="absolute top-2 right-2 bg-gray-200 px-3 py-1 rounded-full" 
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
