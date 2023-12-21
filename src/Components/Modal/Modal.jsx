import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(
    <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {children}
    </div>,
    document.getElementById("checkout")
  );
}

export { Modal };
