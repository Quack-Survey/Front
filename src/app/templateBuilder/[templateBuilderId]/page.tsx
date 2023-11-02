"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState } from "react";
import { read } from "@/constants/mode";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import TemplateWrapper from "@/components/templateBuilder/TemplateWrapper";
import SavePreserveBar from "@/components/SavePreserveBar";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";

const TemplateBuilder: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { templateBuilderId } = useParams();
  const [toastMsg, setToastMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFold, setIsFold] = useState(false);
  const [modeName, setModeName] = useState(read);

  const onNavigateHome = () => {
    router.push("/home");
  };

  const onOption = () => {
    setIsOpen((prev) => !prev);
  };

  const onFoldingAll = () => {
    setIsFold((prev) => !prev);
  };

  const onSave = () => {
    setToastMsg("템플릿 저장이 완료되었습니다.");
  };

  const onClose = () => {
    setToastMsg("");

    if (toastMsg === "옵션 저장이 완료되었습니다") {
      setIsOpen((prev) => !prev);
    } else {
      router.push("/home");
    }
  };

  return (
    <>
      <SavePreserveBar
        onOption={onOption}
        modeName={modeName}
        onSave={onSave}
        onNavigateHome={onNavigateHome}
      />
      <TemplateWrapper
        templateBuilderId={templateBuilderId}
        isOpen={isOpen}
        onOption={onOption}
        modeName={modeName}
        setModeName={setModeName}
        isFold={isFold}
        setToastMsg={setToastMsg}
      />
      {modeName === read ? (
        <ToolbarInitialClickedCase
          modeName={modeName}
          isFold={isFold}
          onFoldingAll={onFoldingAll}
        />
      ) : null}
      {toastMsg !== "" ? (
        <Toast editMode={true} toastText={toastMsg} onClose={onClose} />
      ) : null}
    </>
  );
};

export default TemplateBuilder;
