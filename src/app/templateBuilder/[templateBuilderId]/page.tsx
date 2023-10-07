"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState } from "react";
import { read } from "@/constants/mode";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import TemplateWrapper from "@/components/templateBuilder/TemplateWrapper";
import SavePreserveBar from "@/components/SavePreserveBar";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";

const TemplateBuilder: NextPage = () => {
  const { templateBuilderId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [foldMode, setFoldMode] = useState(false);
  const [modeName, setModeName] = useState(read);

  const { data, isLoading, error } = useQuery([templateBuilderId], () =>
    getFetch(`/template/properties?templateId=${templateBuilderId}`),
  );

  const onOption = () => {
    setIsOpen((prev) => !prev);
  };

  const onFoldingAll = () => {
    setFoldMode((prev) => !prev);
  };

  return (
    <>
      <SavePreserveBar onOption={onOption} modeName={modeName} />
      {isLoading ? null : (
        <TemplateWrapper
          templateBuilderId={templateBuilderId}
          rawTemplateData={data}
          isOpen={isOpen}
          onOption={onOption}
          modeName={modeName}
          setModeName={setModeName}
          foldMode={foldMode}
        />
      )}
      {modeName === read ? (
        <ToolbarInitialClickedCase
          modeName={modeName}
          foldMode={foldMode}
          onFoldingAll={onFoldingAll}
        />
      ) : null}
    </>
  );
};

export default TemplateBuilder;
