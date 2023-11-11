import { useEffect, useState } from "react";
import { Form, Logic } from "@/types/mongooseType";
import RespondentFormTitle from "./RespondentFormTitle";
import RespondentFormSelectBox from "./RespondentFormSelectBox";
import RespondentFormTextBox from "./RespondentFormTextBox";

interface IRespondentFormWrapperProps {
  form: Form;
  forms: Form[];
  logics: Logic[];
  index: number;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean[]>>;
  getValues: any;
  register: any;
}
const RespondentFormWrapper = ({
  form,
  forms,
  logics,
  index,
  isDisabled,
  setIsDisabled,
  getValues,
  register,
}: IRespondentFormWrapperProps): JSX.Element => {
  const { title, plural, required, select, type } = form;

  const logicIndex = logics.findIndex(
    (logic: Logic) => logic.formId === form._id,
  );

  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  useEffect(() => {
    setIsChecked((prev) => {
      const copyIsSelected = [...prev];
      const newIsSelected = Array(select?.length).fill(false);
      copyIsSelected.push(...newIsSelected);
      return copyIsSelected;
    });
  }, []);

  return (
    <div
      className={`mb-3 h-full w-[360px] flex-col border-l-[8px]  bg-white py-2 ${
        isDisabled ? " border-n-gray" : "border-n-light-blue"
      }`}
    >
      <div className="flex">
        {required && !isDisabled ? (
          <span className="mb-3 ml-3 text-n-xs">( 필수항목 )</span>
        ) : null}
        {plural && !isDisabled ? (
          <span className="mb-3 ml-3 text-n-xs">( 모두선택 )</span>
        ) : null}
      </div>
      <RespondentFormTitle
        isDisabled={isDisabled}
        title={title}
        index={index}
      />
      {!isDisabled ? (
        <>
          {type === "select" ? (
            <div className="space-y-n-sm">
              {select?.map((text: string, i) => (
                <RespondentFormSelectBox
                  key={i}
                  logic={logicIndex === -1 ? undefined : logics[logicIndex]}
                  form={form}
                  forms={forms}
                  text={text}
                  index={i}
                  formIndex={index}
                  isChecked={isChecked}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  setIsChecked={setIsChecked}
                  getValues={getValues}
                  register={register}
                />
              ))}
            </div>
          ) : (
            <RespondentFormTextBox
              formIndex={index}
              required={required}
              isDisabled={isDisabled}
              getValues={getValues}
              register={register}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default RespondentFormWrapper;
