const ToolTip = ({ isOpen, bottom, children, onCancel }: IToolTipProps) => {
  return (
    <div>
      <div
        className={
          isOpen
            ? "fixed left-0 top-0 h-screen w-screen z-100 flex justify-center items-center transition-opacity opacity-100"
            : "fixed left-0 top-0 h-screen w-screen z-100 flex justify-center items-center pointer-events-none opacity-0"
        }
      >
        <div
          className="md-[360px] w-full h-full bg-n-white absolute opacity-0"
          onClick={onCancel}
        />
        <div
          className={`fixed right-n-md bottom-[${bottom}px] p-n-sm bg-n-light-black max-w-[192px] rounded-n-md shadow-n-md`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
