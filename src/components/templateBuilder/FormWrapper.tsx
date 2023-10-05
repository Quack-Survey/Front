import { useState } from "react";
import { useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import FormTitle from "./FormTitle";
import FormOption from "./FormOption";
import FormContentText from "./FormContentText";
import FormContentSelectWrapper from "./FormContentSelectWrapper";
import Toast from "../Tost";
import FloatingFormButtonCollection from "../FloatingFormButtonCollection";

interface IFormWrapperProps {
  form: any;
  index: number;
  modeName: string;
  setModeName: any;
  setAllFormData: any;
}

const FormWrapper = ({
  form,
  index,
  modeName,
  setModeName,
  setAllFormData,
}: IFormWrapperProps): JSX.Element => {
  const [mode, setMode] = useState(read);
  const [updateActive, setUpdateActive] = useState(0);
  const [toastText, setToastText] = useState("");
  const { register, handleSubmit } = useForm();
  const { title, type, plural, option } = form.formData;
  const { select } = form.formContentData;
  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;

  // Fn

  const onValid = (data) => {
    setMode(read);
    setModeName(read);
    console.log(data);
  };

  const startPress = () => {
    if (editMode) return;
    setUpdateActive(Date.now());
  };

  const endPress = () => {
    if (editMode) return;

    const endTime = Date.now();
    const duration = endTime - updateActive;

    if (editModeName && duration > 500) {
      return setToastText("폼을 저장해주세요.");
    } else if (!editModeName && duration > 500) {
      if (title === "") {
        setMode(create);
        setModeName(create);
      } else {
        setMode(update);
        setModeName(update);
      }
      return;
    }
  };

  const onClose = () => {
    setToastText("");
  };

  const onDelete = () => {
    setAllFormData((prev: any) => {
      const copyAllFormData = [...prev];
      copyAllFormData.splice(index, 1);
      return copyAllFormData;
    });
    setMode(read);
    setModeName(read);
  };

  const onDuplicate = () => {
    setAllFormData((prev: any) => {
      const copyAllFormData = [...prev];
      copyAllFormData.push({
        ...form,
        formData: { ...form.formData, order: prev.length + 1 },
      });
      return copyAllFormData;
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className={`h-full w-[360px] flex-col border-l-[8px] bg-white ${
          plural ? "border-dotted" : ""
        } ${
          editMode ? "border-n-light-blue" : "cursor-pointer border-n-dark-gray"
        }`}
        onMouseDown={startPress}
        onMouseUp={endPress}
      >
        <div className="pb-n-xlg ml-n-sm pt-n-sm">
          <FormTitle register={register} index={index} editMode={editMode} />
          <div className={`flex ${"옵션 및 로직이 있으면" ? "" : "ml-n-xl"}`}>
            {"옵션 및 로직이 있으면" ? <FormOption /> : null}
            {type === "select" ? (
              <FormContentSelectWrapper
                editMode={editMode}
                register={register}
                select={select}
                setAllFormData={setAllFormData}
              />
            ) : (
              <FormContentText register={register} editMode={editMode} />
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
