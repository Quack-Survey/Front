"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import TemplateDescription from "./TemplateDescription";

interface ITemplateData {
  title: string;
  description: string;
}

interface ITemplateDescriptionWrapperProps {
  template: ITemplateData;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  setTemplateData: React.Dispatch<React.SetStateAction<ITemplateData>>;
}

const TemplateDescriptionWrapper = ({
  template,
  setModeName,
  setTemplateData,
}: any): JSX.Element => {
  const [mode, setMode] = useState("");
  const [updateActive, setUpdateActive] = useState(0);
  const { register, handleSubmit } = useForm();
  const editMode = mode === create || mode === update;

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

    if (mode === read && duration > 1000) {
      setMode(update);
      setModeName(update);
    }
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
    </div>
  );
};

export default TemplateDescriptionWrapper;
