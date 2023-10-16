import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import { useMutation } from "@tanstack/react-query";
import { deleteFetch, postFetch, putFetch } from "@/utils/fetch/core";
import FormTitle from "./FormTitle";
import FormOption from "./FormOption";
import FormContentText from "./FormContentText";
import FormContentSelectWrapper from "./FormContentSelectWrapper";
import Toast from "../Tost";
import FloatingFormButtonCollection from "../FloatingFormButtonCollection";

export interface IFormValues {
  title: string;
  select: string[];
}

interface IFormWrapperProps {
  formStateData: any;
  templateOption: any;
  templateBuilderId: string | string[];
  index: number;
  newOrder: number;
  formsStateData: any;
  modeName: string;
  foldMode: boolean;
  setModeName: any;
  setFormsStateData: any;
}

const FormWrapper = ({
  formStateData,
  templateOption,
  index,
  newOrder,
  templateBuilderId,
  formsStateData,
  modeName,
  foldMode,
  setModeName,
  setFormsStateData,
}: IFormWrapperProps): JSX.Element => {
  const [mode, setMode] = useState(read);
  const [updateActive, setUpdateActive] = useState(0);
  const [toastText, setToastText] = useState("");
  const {
    _id,
    title,
    type,
    plural,
    select,
    isQuater: formIsQuater,
  } = formStateData;
  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;

  const { register, handleSubmit, getValues, control, setFocus } =
    useForm<IFormValues>({
      defaultValues: { title, select },
    });

  const { mutate: createMutate } = useMutation((formData: any) =>
    postFetch("/form", JSON.stringify(formData)),
  );

  const { mutate: updateMutate } = useMutation((formData: any) =>
    putFetch(`/form?formId=${_id}`, JSON.stringify(formData)),
  );

  const { mutate: deleteMutate } = useMutation((_id: any) =>
    deleteFetch(`/form?formId=${_id}`),
  );

  // Fn
  const onValid = (formData: any) => {
    updateMutate(
      {
        title: formData.title,
        select: [...formData.select],
      },
      {
        onSuccess: () => {
          setFormsStateData((prev: any) => {
            const copyFormsStateData = JSON.parse(JSON.stringify(prev));
            copyFormsStateData.splice(index, 1, {
              ...prev[index],
              title: formData.title,
              select: [...formData.select],
              type: type,
            });
            return copyFormsStateData;
          });
          setMode(read);
          setModeName(read);
        },
      },
    );
  };

  const startPress = () => {
    if (editMode) return;
    if (foldMode) {
      return setToastText("접기를 풀어주세요.");
    }
    setUpdateActive(Date.now());
  };

  const endPress = () => {
    if (editMode) return;
    if (foldMode) return;

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
    deleteMutate(_id, {
      onSuccess: () => {
        setFormsStateData((prev: any) => {
          const copyFormData = [...prev];
          copyFormData.splice(index, 1);
          return copyFormData;
        });
        setMode(read);
        setModeName(read);
      },
    });
  };

  const onDuplicate = () => {
    const copiedForm = getValues();

    createMutate(
      {
        title: copiedForm.title,
        select: [...copiedForm.select],
        plural,
        type,
        order: newOrder,
        templateId: templateBuilderId,
      },
      {
        onSuccess: (data) => {
          setFormsStateData((prev: any) => {
            const copyFormData = [...prev];
            copyFormData.push({ ...data });
            return copyFormData;
          });
        },
      },
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className={` w-[360px] flex-col border-l-[8px] bg-white ${
          foldMode ? "h-[50px] overflow-hidden" : "h-full"
        } ${plural ? "border-dotted" : ""} ${
          editMode ? "border-n-light-blue" : "cursor-pointer border-n-dark-gray"
        }`}
        onMouseDown={startPress}
        onMouseUp={endPress}
      >
        <div className="pb-n-xlg ml-n-sm pt-n-sm">
          <FormTitle
            title={title}
            register={register}
            index={index}
            editMode={editMode}
          />
          <div className={`flex ${"옵션 및 로직이 있으면" ? "" : "ml-n-xl"}`}>
            {"옵션 및 로직이 있으면" ? <FormOption /> : null}
            {type === "select" ? (
              <FormContentSelectWrapper
                index={index}
                editMode={editMode}
                register={register}
                setFocus={setFocus}
                getValues={getValues}
                control={control}
                select={select}
                setFormsStateData={setFormsStateData}
              />
            ) : (
              <FormContentText editMode={editMode} />
            )}
          </div>
        </div>
      </form>
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={onClose} editMode={editMode} />
      ) : null}
      {editMode ? (
        <FloatingFormButtonCollection
          modeName={update}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ) : null}
    </>
  );
};

export default FormWrapper;
