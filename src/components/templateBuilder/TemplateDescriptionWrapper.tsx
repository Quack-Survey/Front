"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFetch, putFetch } from "@/utils/fetch/core";
import TemplateDescription from "./TemplateDescription";
import Toast from "../Tost";
import { useUpdateTemplate } from "@/hooks/mutation/useUpdateTemplate";
import { Template } from "@/types/mongooseType";

export interface ITemplateData {
  title: string;
  description: string;
}

interface ITemplateDescriptionWrapperProps {
  template: Template;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  updateTemplateMutate: any;
}

const TemplateDescriptionWrapper = ({
  template,
  modeName,
  setModeName,
  updateTemplateMutate,
}: ITemplateDescriptionWrapperProps): JSX.Element => {
  const [mode, setMode] = useState("");
  const [toastText, setToastText] = useState("");
  const [updateActive, setUpdateActive] = useState(0);

  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;

  const { register, handleSubmit } = useForm();

  // Fn
  const onValid: SubmitHandler<FieldValues> = ({ title, description }) => {
    updateTemplateMutate({ title, description });
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
      setMode(update);
      setModeName(update);
    }
  };

  const onClose = () => {
    setToastText("");
  };

  // Effect
  useEffect(() => {
    if (template?.title === "") {
      setMode(update);
      setModeName(update);
    } else {
      setMode(read);
      setModeName(read);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template.title]);

  return (
    <div onMouseDown={startPress} onMouseUp={endPress}>
      <TemplateDescription
        title={template.title}
        description={template.description}
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
