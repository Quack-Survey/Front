"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { setTemplate } from "@/store/store";
import TemplateDescription from "./TemplateDescription";

interface ITemplateDescriptionWrapperProps {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const TemplateDescriptionWrapper = ({
  template,
  mode,
  setMode,
}: any): JSX.Element => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const stateData = useSelector((state) => state);
  console.log(stateData);

  const onValid: SubmitHandler<FieldValues> = (templateData) => {
    dispatch(setTemplate(templateData));
    setMode("read");
  };

  useEffect(() => {
    if (!template) {
      setMode("create");
    } else {
      setMode("read");
    }
  }, []);

  useEffect(() => {
    if (mode === "read") {
      setMode("update");
    }
  }, []);

  return (
    <TemplateDescription
      // title={template.title}
      // description={template.description}
      register={register}
      mode={mode}
      handleSubmit={handleSubmit}
      onValid={onValid}
    />
  );
};

export default TemplateDescriptionWrapper;
