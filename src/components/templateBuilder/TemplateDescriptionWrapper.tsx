"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { create, update, read } from "@/constants/mode";
import { useMutation } from "@tanstack/react-query";
import { putFetch } from "@/utils/fetch/core";
import TemplateDescription from "./TemplateDescription";
import Toast from "../Tost";

export interface ITemplateData {
  title: string;
  description: string;
}

interface ITemplateDescriptionWrapperProps {
  templateBuilderId: string;
  templateStateData: ITemplateData;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  setTemplateStateData: React.Dispatch<React.SetStateAction<ITemplateData>>;
}

const TemplateDescriptionWrapper = ({
  templateBuilderId,
  templateStateData,
  modeName,
  setModeName,
  setTemplateStateData,
}: any): JSX.Element => {
  const [mode, setMode] = useState("");
  const [toastText, setToastText] = useState("");
  const [updateActive, setUpdateActive] = useState(0);
  const { register, handleSubmit } = useForm();
  const editMode = mode === create || mode === update;
  const editModeName = modeName === create || modeName === update;

  const { mutate } = useMutation((templateData: ITemplateData) =>
    putFetch(
      `/template?templateId=${templateBuilderId}`,
      JSON.stringify(templateData),
    ),
  );

  // Fn
  const onValid: SubmitHandler<FieldValues> = ({ title, description }) => {
    mutate({ title, description });
    setTemplateStateData((prev: ITemplateData) => {
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
      setMode(update);
      setModeName(update);
    }
  };

  const onClose = () => {
    setToastText("");
  };

  // Effect
  useEffect(() => {
    if (templateStateData.title === "") {
      setMode(update);
      setModeName(update);
    } else {
      setMode(read);
      setModeName(read);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateStateData.title]);

  return (
    <div onMouseDown={startPress} onMouseUp={endPress}>
      <TemplateDescription
        title={templateStateData.title}
        description={templateStateData.description}
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
