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
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex flex-col h-full w-full md:h-auto md:max-h-[80vh] overflow-y-auto md:w-[60%] md:gap-10  relative  md:px-10 px-5  md:py-10 py-5 modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
