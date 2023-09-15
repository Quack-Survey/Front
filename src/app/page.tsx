"use client";

import Navigation from "@/components/Navigation";
import CheckModal from "@/components/CheckModal";
import { useState } from "react";
import Toast from "@/components/Tost";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const onCancel = () => {
    setIsOpen(false);
  };
  return (
    <h1>
      Test2
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        버튼
      </button>
      <CheckModal
        isOpen={isOpen}
        title="테스트"
        onCancel={onCancel}
        onConfirm={() => {
          setIsOpen(false);
        }}
      ></CheckModal>
      <Toast toastMsg={"저장되었습니다!"} onClose={() => {}}></Toast>
      <Navigation></Navigation>
    </h1>
  );
}
