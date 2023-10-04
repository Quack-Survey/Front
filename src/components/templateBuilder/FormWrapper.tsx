import { useState, useEffect } from "react";
import { create, update, read } from "@/constants/mode";
import FormTitle from "./FormTitle";
import FormOption from "./FormOption";
import FormContentSelect from "./FormContentSelect";
import FormContentText from "./FormContentText";
import ToolbarTypeCase from "../ToolbarTypingCase";
import Toast from "../Tost";

interface IFormWrapperProps {
  form: any;
  modeName: string;
  setModeName: any;
  setAllFormData: any;
}

const FormWrapper = ({
  form,
  modeName,
  setModeName,
  setAllFormData,
}: IFormWrapperProps): JSX.Element => {
  const [mode, setMode] = useState(read);
  const [updateActive, setUpdateActive] = useState(0);
  const [toastText, setToastText] = useState("");
  const { title, type, plural, order, option } = form.formData;
  const { select } = form.formContentData;
  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;
  // 전체는 수정모드이고 해당폼은 읽기모드이면 editModeName && !editMode
  // Fn
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

  return (
    <>
      <form
        className={`h-full w-[360px] flex-col border-l-[8px] bg-white ${
          plural ? "border-dotted" : ""
        } ${editMode ? "border-n-light-blue" : "border-n-dark-gray"}`}
        onMouseDown={startPress}
        onMouseUp={endPress}
      >
        <div className="pb-n-xlg ml-n-sm pt-n-sm">
          <FormTitle order={order} editMode={editMode} />
          <div className={`flex ${"옵션 및 로직이 있으면" ? "" : "ml-n-xl"}`}>
            {"옵션 및 로직이 있으면" ? <FormOption /> : null}
            {type === "select" ? (
              <FormContentSelect
                editMode={editMode}
                select={select}
                setAllFormData={setAllFormData}
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
    </>
  );
};

export default FormWrapper;
