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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-y-auto rounded-[2.5rem] bg-white shadow-2xl md:h-auto md:max-h-[90vh] md:w-[650px] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content Area */}
        <div className="px-6 py-8 md:px-12 md:py-10">
          {children}
        </div>

        {/* Footer info - Cleaned up text (No underscores) */}
        <div className="mt-auto bg-gray-50/50 px-10 py-4 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-300">
            Secure Session Active • End to End Anonymous
          </p>
        </div>
      </div>
    </div>
  );
};