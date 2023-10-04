"use client";

import { NextPage } from "next";
import { useState } from "react";
import { read } from "@/constants/mode";
import TemplateWrapper from "@/components/templateBuilder/TemplateWrapper";
import SavePreserveBar from "@/components/SavePreserveBar";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";

const TemplateBuilder: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modeName, setModeName] = useState(read);

  const onOption = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <SavePreserveBar onOption={onOption} modeName={modeName} />
      <TemplateWrapper
        isOpen={isOpen}
        onOption={onOption}
        modeName={modeName}
        setModeName={setModeName}
      />
      {modeName === read ? <ToolbarInitialClickedCase /> : null}
    </>
  );
};

export default TemplateBuilder;
