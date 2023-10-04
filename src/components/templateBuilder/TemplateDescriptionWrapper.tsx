"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import TemplateDescription from "./TemplateDescription";
import Toast from "../Tost";

interface ITemplateData {
  title: string;
  description: string;
}

interface ITemplateDescriptionWrapperProps {
  template: ITemplateData;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  setTemplateData: React.Dispatch<React.SetStateAction<ITemplateData>>;
}

const TemplateDescriptionWrapper = ({
  template,
  modeName,
  setModeName,
  setTemplateData,
}: any): JSX.Element => {
  const [mode, setMode] = useState("");
  const [toastText, setToastText] = useState("");
  const [updateActive, setUpdateActive] = useState(0);
  const { register, handleSubmit } = useForm();
  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;

  // Fn
  const onValid: SubmitHandler<FieldValues> = ({ title, description }) => {
    setTemplateData((prev: ITemplateData) => {
      return { ...prev, title, description };
    });
    setMode(read);
    setModeName(read);
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
      // if(title === "")
      setMode(update);
      setModeName(update);
    }
  };

  const onClose = () => {
    setToastText("");
  };

  // Effect
  useEffect(() => {
    if (!template) {
      setMode(create);
    } else {
      setMode(read);
    }
  }, []);

  return (
    <div onMouseDown={startPress} onMouseUp={endPress}>
      <TemplateDescription
        // title={template.title}
        // description={template.description}
        register={register}
        handleSubmit={handleSubmit}
        onValid={onValid}
        editMode={editMode}
      />
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={onClose} editMode={editMode} />
      ) : null}
    </div>
  );
};

export default TemplateDescriptionWrapper;
