import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./FormWrapper";
import Image from "next/image";

interface IFormRequiredCheckBoxProps {
  editMode: boolean;
  formId: string;
  onUpdateMode: () => void;
  register: UseFormRegister<IFormValues>;
}

const FormRequiredCheckBox = ({
  editMode,
  formId,
  onUpdateMode,
  register,
}: IFormRequiredCheckBoxProps): JSX.Element => {
  return (
    <div className="ml-n-sm flex items-center justify-between pt-[5px]">
      <label className="text-n-sm " htmlFor={formId}>
        <input
          className="mr-[4px]"
          {...register("required")}
          type="checkbox"
          disabled={!editMode}
          id={formId}
        />
        <span>필수응답</span>
      </label>
      <div
        className="mr-n-md flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded bg-n-blue opacity-80 duration-100 hover:opacity-100"
        onClick={onUpdateMode}
      >
        <Image
          src="/images/create.svg"
          width={30}
          height={30}
          priority={true}
          alt="수정"
        />
      </div>
    </div>
  );
};

export default FormRequiredCheckBox;
