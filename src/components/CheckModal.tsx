import styles from "@/components/commonComponents.module.css";

interface ICheckModalProps {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const CheckModal = ({
  onCancel,
  onConfirm,
  isOpen,
  title,
}: ICheckModalProps): JSX.Element => {
  return (
    <div className={isOpen ? styles.modalwrapper : styles.modalwrapper_hid}>
      <div className={styles.grayshadow} onClick={onCancel} />
      <div className="modal relative z-1 bg-white p-[16px] rounded-[8px] w-[313px] shadow-24dp h-[142px]">
        <div className="h-full flex flex-col items-stretch gap-[16px] text-lg">
          <p className="flex justify-center items-center text-center h-[94px]">
            {title}
          </p>
          <div className="text-center leading-[40px] bg-[#788ef5] w-100% h-[40px] rounded-[10px] text-white">
            <button className="min-w-[115px]" onClick={onConfirm}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
