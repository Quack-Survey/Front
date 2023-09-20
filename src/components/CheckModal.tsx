const CheckModal = ({
  onCancel,
  onConfirm,
  isOpen,
  modalText,
  buttonText,
}: ICheckModalProps): JSX.Element => {
  return (
    <div
      className={
        isOpen
          ? "fixed left-0 top-0 h-screen w-screen z-100 flex justify-center items-center transition-opacity opacity-100"
          : "fixed left-0 top-0 h-screen w-screen z-100 flex justify-center items-center pointer-events-none opacity-0"
      }
    >
      <div
        className="min-w-[360px] w-full h-full bg-n-black absolute opacity-30"
        onClick={onCancel}
      />
      <div className="modal relative z-1 bg-n-white p-n-md rounded-n-lg w-auto min-w-[313px] shadow-n-md h-[142px]">
        <div className="h-full flex flex-col items-stretch gap-n-md text-n-lg">
          <p className="flex justify-center items-center text-center h-[94px]">
            {modalText}
          </p>
          <div className="text-center leading-[40px] bg-n-blue w-100% h-[40px] rounded-n-lg text-n-white">
            <button className="min-w-[115px]" onClick={onConfirm}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
