import React, { useEffect } from "react";

interface Modal {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContainer: React.FC<Modal> = ({
  children,
  isOpen,
  onClose,
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-y-auto rounded-[2.5rem] bg-white shadow-2xl md:h-auto md:max-h-[90vh] md:w-[650px] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content Area */}
        <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
};
