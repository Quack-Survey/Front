interface IInputModalProps {
  isOpen: boolean;
  children: JSX.Element;
  submitText: string;
  onCancel: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onSubmit: () => void;
}

const InputModal = ({
  isOpen,
  children,
  submitText,
  onCancel,
  onSubmit,
}: IInputModalProps): JSX.Element => {
  return (
    <div
      className={
        isOpen
          ? "z-100 fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-100 transition-opacity"
          : "z-100 pointer-events-none fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-0"
      }
    >
      <div
        className="md-[360px] absolute h-full w-full bg-n-black opacity-30"
        onClick={onCancel}
      />
      <div className="modal z-1 relative flex h-auto w-auto min-w-[280px] flex-col bg-white ">
        <form onSubmit={onSubmit}>
          <div className="h-full w-full p-n-lg">{children}</div>
          <div className="flex h-[52px] w-full items-center justify-around border border-t-n-light-gray px-n-lg text-n-md">
            <button
              type="button"
              onClick={onCancel}
              className="px-n-xs text-n-gray"
            >
              취소
            </button>
            <button type="submit" className="px-n-sm text-n-blue">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
