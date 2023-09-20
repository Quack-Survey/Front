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
          ? "fixed left-0 top-0 h-screen w-screen z-100 flex justify-center items-center transition-opacity opacity-100"
          : "fixed left-0 top-0 h-screen w-screen z-100 flex justify-center items-center pointer-events-none opacity-0"
      }
    >
      <div
        className="md-[360px] w-full h-full bg-n-black absolute opacity-30"
        onClick={onCancel}
      />
      <div className="modal flex flex-col relative z-1 min-w-[280px] h-auto w-auto bg-white ">
        <form onSubmit={onSubmit}>
          <div className="p-n-lg w-full h-full">{children}</div>
          <div className="flex flex-row justify-between items-center px-n-lg h-[52px] w-full border border-t-n-light-gray text-n-md">
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
