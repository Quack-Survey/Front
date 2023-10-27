import { useState, useEffect } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { IFormValues } from "./FormWrapper";
import Image from "next/image";
import ToolbarTypeCase from "../ToolbarTypingCase";
import FormContentSelect from "./FormContentSelect";

interface IFormContentSelectWrapperProps {
  index: number;
  select: string[];
  editMode: boolean;
  register: UseFormRegister<IFormValues>;
  setFocus: any;
  getValues: any;
  control: Control<IFormValues | any>;
}

const FormContentSelectWrapper = ({
  index,
  editMode,
  register,
  setFocus,
  getValues,
  control,
}: IFormContentSelectWrapperProps): JSX.Element => {
  const [focusNumber, setFocusNumber] = useState(0);

  const { fields, append, remove } = useFieldArray({
    name: "select",
    control: control,
  });

  const createInputForm = () => {
    append("");
  };

  const onDuplicate = () => {
    const previousSelect = getValues().select;
    const duplicateLastInput = previousSelect[previousSelect.length - 1];
    append(duplicateLastInput);
  };

  const onFocusUp = () => {
    setFocus(`select.${focusNumber - 1}`, { shouldSelect: true });
  };

  const onFocusDown = () => {
    setFocus(`select.${focusNumber + 1}`, { shouldSelect: true });
  };

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, []);

  return (
    <>
      <div className="w-full space-y-n-sm pb-n-md ">
        {fields?.map((field, i) => (
          <FormContentSelect
            key={field.id}
            remove={remove}
            field={field}
            setFocusNumber={setFocusNumber}
            fieldsLength={fields.length}
            editMode={editMode}
            register={register}
            formIndex={index}
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
          onFocusUp={onFocusUp}
          onFocusDown={onFocusDown}
          onDuplicate={onDuplicate}
          onEnter={createInputForm}
          modeName="form"
        />
      ) : null}
    </>
  );
};

export default FormContentSelectWrapper;
