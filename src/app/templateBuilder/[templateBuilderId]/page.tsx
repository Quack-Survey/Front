"use client";

import { NextPage } from "next";
import { useState } from "react";
import { read } from "@/constants/mode";
import TemplateWrapper from "@/components/templateBuilder/TemplateWrapper";
import SavePreserveBar from "@/components/SavePreserveBar";
import FloatingFormButtonCollection from "@/components/FloatingFormButtonCollection";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";

const TemplateBuilder: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("");

  const onOption = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <SavePreserveBar onOption={onOption} />
      <TemplateWrapper
        isOpen={isOpen}
        onOption={onOption}
        mode={mode}
        setMode={setMode}
      />
      <FloatingFormButtonCollection isOpen={isOpen} />
      {mode === read || mode === "" ? <ToolbarInitialClickedCase /> : null}
    </>
  );
};

export default TemplateBuilder;
