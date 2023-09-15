import styles from "@/components/commonComponents.module.css";

interface IInputModalProps {
  isOpen: boolean;
  child: JSX.Element;
  onCancel: () => void;
  onSubmit: () => void;
}

const InputModal = ({
  isOpen,
  child,
  onCancel,
  onSubmit,
}: IInputModalProps): JSX.Element => {
  return (
    <div className={isOpen ? styles.modalwrapper : styles.modalwrapper_hid}>
      <div className={styles.grayshadow} onClick={onCancel} />
      <div className="flex flex-col modal relative z-1 w-[280px] bg-white ">
        <form onSubmit={onSubmit}>
          <div className="p-[24px] w-[100%] h-[100%]">{child}</div>
          <div className="flex flex-row justify-between items-center px-[24px] h-[52px] w-[100%] border border-t-[#e0e0e0] text-base">
            <button onClick={onCancel} className="px-[8px] text-[#bebebe]">
              취소
            </button>
            <button type="submit" className="px-[8px] text-[#788ef5]">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
