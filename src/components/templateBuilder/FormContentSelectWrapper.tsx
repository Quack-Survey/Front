import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Image from "next/image";
import ToolbarTypeCase from "../ToolbarTypingCase";
import FormContentSelect from "./FormContentSelect";

interface IFormContentSelectWrapperProps {
  select: string[];
  editMode: boolean;
  setAllFormData: any;
  register: UseFormRegister<FieldValues>;
}

const FormContentSelectWrapper = ({
  select,
  editMode,
  setAllFormData,
  register,
}: IFormContentSelectWrapperProps): JSX.Element => {
  const [selectData, setSelectData] = useState([...select]);

  const createInputForm = () => {
    const copySelectData = [...selectData];
    copySelectData.push("");
    setSelectData(copySelectData);
  };

  const onDuplicate = () => {
    const copySelectData = [...selectData];
    copySelectData.push(selectData[selectData.length - 1]);
    setSelectData(copySelectData);
  };

  return (
    <>
      <div className="w-full space-y-n-sm pb-n-md ">
        {selectData?.map((a, i) => (
          <FormContentSelect
            key={i}
            selectData={selectData}
            setSelectData={setSelectData}
            editMode={editMode}
            register={register}
            index={i}
          />
        ))}
        {editMode ? (
          <button
            type="button"
            className="h-n-xlg flex w-[85%] cursor-pointer items-center  justify-center rounded-n-sm bg-n-light-gray"
            onClick={createInputForm}
          >
            <Image
              src="/images/plus.svg"
              width={24}
              height={24}
              alt=""
              priority
            />
          </button>
        ) : null}
      </div>
      {editMode ? (
        <ToolbarTypeCase
          onDuplicate={onDuplicate}
          onEnter={createInputForm}
          modeName="form"
        />
      ) : null}
    </>
  );
};

export default FormContentSelectWrapper;
