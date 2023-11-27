import { Form, Logic } from "@/types/mongooseType";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface IRespondentFormSelectBoxProps {
  form: Form;
  forms: Form[];
  text: string;
  logic?: Logic;
  index: number;
  formIndex: number;
  isChecked: boolean[];
  isDisabled: (boolean | null)[];
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<(boolean | null)[][]>>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const RespondentFormSelectBox = ({
  form,
  forms,
  text,
  logic,
  index,
  formIndex,
  isChecked,
  isDisabled,
  setIsChecked,
  setIsDisabled,
  getValues,
  setValue,
  register,
}: IRespondentFormSelectBoxProps): JSX.Element => {
  const { _id: id, plural, select, required } = form;
  const inititalIsChecked = isChecked.map(() => false);

  const handleIsSingleChecked = (i: number) => {
    const mutationIsChecked = isChecked.map(
      (value: boolean, isCheckedIndex) => {
        return isCheckedIndex === i ? text : false;
      },
    );
    if (!isChecked[i]) {
      setValue(`form${formIndex + 1}`, mutationIsChecked);
    } else {
      setValue(`form${formIndex + 1}`, inititalIsChecked);
    }

    if (logic) {
      const isChoiceLogic = getValues(`form${formIndex + 1}`).some(
        (value: any) => logic.selector.includes(value) === true,
      );
      const existingIndex = forms.findIndex(
        (item) => item._id === logic.appliedFormId,
      );
      if (isChoiceLogic) {
        setIsDisabled((prev) => {
          const copyIsDisabled = JSON.parse(JSON.stringify(prev));
          const appliedLogic = copyIsDisabled.findIndex(
            (item: any) => item.includes(formIndex) === true,
          );
          if (appliedLogic !== -1) return copyIsDisabled;
          if (logic.type === "filter") {
            copyIsDisabled[existingIndex].push(formIndex);
            return copyIsDisabled;
          } else {
            copyIsDisabled.forEach((item: any, i: number) => {
              return formIndex < i && i < existingIndex
                ? item.push(formIndex)
                : item;
            });
            return copyIsDisabled;
          }
        });
      } else {
        setIsDisabled((prev) => {
          const copyIsDisabled = JSON.parse(JSON.stringify(prev));
          const appliedLogic = copyIsDisabled.some((item: any) =>
            item.includes(formIndex),
          );
          if (!appliedLogic) return copyIsDisabled;
          if (logic.type === "filter") {
            const filterCopyIsDisabled = copyIsDisabled[existingIndex].filter(
              (item: any) => item !== formIndex,
            );
            copyIsDisabled.splice(existingIndex, 1, filterCopyIsDisabled);
            return copyIsDisabled;
          } else {
            const mapCopyIsDisabled = copyIsDisabled.map(
              (item: any, i: number) => {
                const filterItem = item.filter(
                  (value: any) => value !== formIndex,
                );
                return formIndex < i && i < existingIndex ? filterItem : item;
              },
            );
            return mapCopyIsDisabled;
          }
        });
      }
    }

    setIsChecked((prev) => {
      const copyIsChecked = [...prev].map(() => {
        return false;
      });
      copyIsChecked.splice(i, 1, !prev[i]);
      return copyIsChecked;
    });
  };

  const handleIsPluralChecked = (i: number) => {
    const checkedLength = isChecked.filter((item: boolean) => item === true);

    if (logic) {
      const isChoiceLogic = getValues(`form${formIndex + 1}`).some(
        (value: any) => logic.selector.includes(value) === true,
      );
      const existingIndex = forms.findIndex(
        (item) => item._id === logic.appliedFormId,
      );
      if (isChoiceLogic) {
        setIsDisabled((prev) => {
          const copyIsDisabled = JSON.parse(JSON.stringify(prev));
          const appliedLogic = copyIsDisabled.findIndex(
            (item: any) => item.includes(formIndex) === true,
          );

          if (appliedLogic !== -1) return copyIsDisabled;
          if (logic.type === "filter") {
            copyIsDisabled[existingIndex].push(formIndex);
            return copyIsDisabled;
          } else {
            copyIsDisabled.forEach((item: any, i: number) => {
              return formIndex < i && i < existingIndex
                ? item.push(formIndex)
                : item;
            });
            return copyIsDisabled;
          }
        });
      } else {
        setIsDisabled((prev) => {
          const copyIsDisabled = JSON.parse(JSON.stringify(prev));
          const appliedLogic = copyIsDisabled.some((item: any) =>
            item.includes(formIndex),
          );
          if (!appliedLogic) return copyIsDisabled;
          if (logic.type === "filter") {
            const filterCopyIsDisabled = copyIsDisabled[existingIndex].filter(
              (item: any) => item !== formIndex,
            );
            copyIsDisabled.splice(existingIndex, 1, filterCopyIsDisabled);
            return copyIsDisabled;
          } else {
            const mapCopyIsDisabled = copyIsDisabled.map(
              (item: any, i: number) => {
                const filterItem = item.filter(
                  (value: any) => value !== formIndex,
                );
                return formIndex < i && i < existingIndex ? filterItem : item;
              },
            );
            return mapCopyIsDisabled;
          }
        });
      }
    }

    if (isChecked[i]) {
      setIsChecked((prev) => {
        const copyIsChecked = [...prev];
        copyIsChecked.splice(i, 1, !isChecked[i]);
        return copyIsChecked;
      });
      return;
    }

    if (checkedLength.length >= 3) return;
    setIsChecked((prev) => {
      const copyIsChecked = [...prev];
      copyIsChecked.splice(i, 1, !isChecked[i]);
      return copyIsChecked;
    });
  };

  const handleValidate = () => {
    if (isDisabled.length !== 0) return;
    if (!required) return;
    const respondentForms: any[] = Object.values(getValues());
    const checkRespondentForms = respondentForms[formIndex];
    const someCheckRespondentForms = checkRespondentForms.some(
      (item: boolean | string) => typeof item === "string",
    );
    if (!someCheckRespondentForms) {
      return "본 문항에 응답해주세요!";
    }
  };

  return (
    <div className="ml-8 mr-2">
      <div
        className={`h-n-xlg flex w-[85%] items-center  rounded-n-sm  ${
          isChecked[index] ? "bg-n-light-blue text-white" : "bg-n-light-gray"
        }`}
      >
        <div className="flex w-full">
          <label
            htmlFor={`${id}_select_${index}`}
            className="mx-n-sm w-full shrink-0 cursor-pointer bg-inherit py-[5px] text-n-sm outline-none"
          >
            {text}
          </label>
          <input
            className="cursor-pointer"
            id={`${id}_select_${index}`}
            type="checkbox"
            value={text}
            checked={isChecked[index] || false}
            {...register(`form${formIndex + 1}[${index}]`, {
              onChange() {
                if (plural) {
                  handleIsPluralChecked(index);
                } else {
                  handleIsSingleChecked(index);
                }
              },
              validate: handleValidate,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default RespondentFormSelectBox;
// setIsDisabled((prev) => {
//   const copyIsDisabled = [...prev];
//   if (logic.type === "filter") {
//     copyIsDisabled.splice(existingIndex, 1, true);
//     return copyIsDisabled;
//   } else {
//     const newCopyIsDisabled = prev.map((item: boolean, i: number) => {
//       return formIndex < i && i < existingIndex ? true : false;
//     });
//     return newCopyIsDisabled;
//   }
// });
