import { FieldValues, UseFormRegister, useFormContext } from "react-hook-form";
import { IFormValues } from "./FormWrapper";
import Image from "next/image";

interface IFormContentSelectProps {
  editMode: boolean;
  formIndex: number;
  index: number;
  fieldsLength: number;
  field: any;
  setFormsStateData: any;
  setFocusNumber: any;
  register: UseFormRegister<IFormValues>;
  remove: (index?: number | number[]) => void;
}

const FormContentSelect = ({
  editMode,
  formIndex,
  index,
  fieldsLength,
  field,
  setFormsStateData,
  setFocusNumber,
  register,
  remove,
}: IFormContentSelectProps): JSX.Element => {
  const deleteInputForm = () => {
    remove(index);
    setFormsStateData((prev: any) => {
      const copyFormsStateData = JSON.parse(JSON.stringify(prev));
      copyFormsStateData[formIndex].select.splice(index, 1);
      return copyFormsStateData;
    });
  };

  const handleFocusNumber = () => {
    setFocusNumber(index);
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
          {...register(`select.${index}`, {
            required: "보기를 작성해주세요.",
          })}
          onFocus={handleFocusNumber}
          disabled={!editMode}
          maxLength={18}
        />
      </div>
      {editMode && fieldsLength > 1 ? (
        <button type="button" onClick={deleteInputForm}>
          <Image
            className="mx-n-sm cursor-pointer"
            src="/images/delete.svg"
            width={20}
            height={24}
            alt=""
            priority
          />
        </button>
      ) : null}
    </div>
  );
};

export default FormContentSelect;
