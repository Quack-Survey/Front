import { useState } from "react";
import { useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import { useRouter } from "next/navigation";
import { useDeleteForm } from "@/hooks/mutation/useDeleteForm";
import { useUpdateForm } from "@/hooks/mutation/useUpdateForm";
import { Form, Logic, templateOption } from "@/types/mongooseType";
import FormTitle from "./FormTitle";
import FormOption from "./FormOption";
import FormContentText from "./FormContentText";
import FormContentSelectWrapper from "./FormContentSelectWrapper";
import Toast from "../Tost";
import FloatingFormButtonCollection from "../FloatingFormButtonCollection";
import FormRequiredCheckBox from "./FormRequiredCheckBox";

export interface IFormValues {
  title: string;
  select: string[];
  required: boolean;
}

interface IFormWrapperProps {
  form: Form;
  templateOption: templateOption;
  logics: Logic[];
  templateBuilderId: string | string[];
  index: number;
  newOrder: number;
  modeName: string;
  isFold: boolean;
  setModeName: any;
  createMutate: any;
}

const FormWrapper = ({
  form,
  templateOption,
  logics,
  index,
  newOrder,
  templateBuilderId,
  modeName,
  isFold,
  setModeName,
  createMutate,
}: IFormWrapperProps): JSX.Element => {
  const router = useRouter();
  const [mode, setMode] = useState(read);
  const [updateActive, setUpdateActive] = useState(0);
  const [toastText, setToastText] = useState("");
  const { _id, title, type, plural, select, required } = form;

  const isTemplateOption = templateOption?.formId === _id;
  const isLogic =
    logics?.findIndex((logic) => logic?.formId === _id) === -1 ? false : true;

  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;

  const { register, handleSubmit, getValues, control, setFocus } =
    useForm<IFormValues>({
      defaultValues: { title, select, required },
    });

  const { mutate: updateMutate } = useUpdateForm(
    `/form?formId=${_id}`,
    templateBuilderId,
    "forms",
  );

  const { mutate: deleteMutate } = useDeleteForm(
    `/form?formId=${_id}`,
    templateBuilderId,
    "forms",
  );

  // Fn
  const onValid = (formData: any) => {
    updateMutate({
      title: formData.title,
      select: [...formData.select],
      required: formData.required,
    });
    setMode(read);
    setModeName(read);
  };

  const startPress = () => {
    if (editMode) return;
    if (isFold) {
      return setToastText("접기를 풀어주세요.");
    }
    setUpdateActive(Date.now());
  };

  const endPress = () => {
    if (editMode) return;
    if (isFold) return;

    const endTime = Date.now();
    const duration = endTime - updateActive;

    if (editModeName && duration > 500) {
      return setToastText("폼을 저장해주세요.");
    } else if (!editModeName && duration > 500) {
      setMode(update);
      setModeName(update);
    }
  };

  const onClose = () => {
    setToastText("");
  };

  const onDelete = () => {
    if (isLogic || isTemplateOption) {
      setMode(read);
      setModeName(read);
      return setToastText("로직 및 옵션을 먼저 삭제해주세요.");
    }
    deleteMutate(_id);
    setMode(read);
    setModeName(read);
  };

  const onDuplicate = () => {
    const copiedForm = getValues();
    createMutate({
      title: copiedForm.title,
      select: [...copiedForm.select],
      plural,
      type,
      order: newOrder,
      templateId: templateBuilderId,
    });
  };

  const onCreateLogic = () => {
    router.push(`/logic/${templateBuilderId}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className={`w-[360px] flex-col border-l-[8px] bg-white ${
          isFold ? "h-[70px] overflow-hidden" : "h-full"
        } ${plural ? "border-dotted" : ""} ${
          editMode ? "border-n-light-blue" : "cursor-pointer border-n-dark-gray"
        }`}
        onMouseDown={startPress}
        onMouseUp={endPress}
      >
        <FormRequiredCheckBox
          register={register}
          editMode={editMode}
          formId={form._id}
        />
        <div className="pb-n-xlg ml-n-sm pt-n-sm">
          <FormTitle
            title={title}
            register={register}
            index={index}
            editMode={editMode}
          />
          <div
            className={`flex ${isTemplateOption || isLogic ? "" : "ml-n-xl"}`}
          >
            {isTemplateOption || isLogic ? (
              <FormOption
                editMode={editMode}
                isLogic={isLogic}
                isTemplateOption={isTemplateOption}
              />
            ) : null}
            {type === "select" ? (
              <FormContentSelectWrapper
                isLogicAndTemplateOption={isLogic || isTemplateOption}
                setToastText={setToastText}
                index={index}
                editMode={editMode}
                register={register}
                setFocus={setFocus}
                getValues={getValues}
                control={control}
                select={select}
              />
            ) : (
              <FormContentText editMode={editMode} />
            )}
          </div>
        </div>
      </form>
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={onClose} editMode={false} />
      ) : null}
      {editMode ? (
        <FloatingFormButtonCollection
          modeName={update}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onCreateLogic={onCreateLogic}
        />
      ) : null}
    </>
  );
};

export default FormWrapper;
