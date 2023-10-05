import { FieldValues, UseFormRegister } from "react-hook-form";
import Image from "next/image";

interface IFormContentSelectProps {
  editMode: boolean;
  index: number;
  selectData: any;
  setSelectData: any;
  register: UseFormRegister<FieldValues>;
}

const FormContentSelect = ({
  editMode,
  index,
  selectData,
  setSelectData,
  register,
}: IFormContentSelectProps): JSX.Element => {
  const deleteInputForm = () => {
    const copySelectData = [...selectData];
    copySelectData.splice(index, 1);
    setSelectData(copySelectData);
  };

  return (
    <div className="h-n-xlg flex w-[85%] items-center  rounded-n-sm bg-n-light-gray ">
      <Image
        className="cursor-pointer"
        src="/images/dragging.svg"
        width={20}
        height={24}
        alt=""
        priority
      />
      <div className="w-[90%]">
        <input
          className="mx-n-sm w-full shrink-0 bg-inherit text-n-sm outline-none"
          type="text"
          placeholder="보기를 작성해주세요"
          {...register(`select_${index}`, {
            required: "보기를 작성해주세요.",
          })}
          disabled={!editMode}
          maxLength={18}
        />
      </div>
      {editMode && selectData.length > 1 ? (
        <div onClick={deleteInputForm}>
          <Image
            className="mx-n-sm cursor-pointer"
            src="/images/delete.svg"
            width={20}
            height={24}
            alt=""
            priority
          />
        </div>
      ) : null}
    </div>
  );
};

export default FormContentSelect;
