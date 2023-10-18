"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import NextPreviousButton from "@/components/NextPreviousButton";
import Image from "next/image";
import Toast from "@/components/Tost";

const SettingLogicSelect: NextPage = (): JSX.Element => {
  const { templateId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({});
  const [isSelected, setIsSelected] = useState<boolean[]>([]);
  const [toastText, setToastText] = useState("");

  const handleIsSelected = (index: number) => {
    setIsSelected((prev) => {
      const copyIsSelected = [...prev];
      copyIsSelected.splice(index, 1, !isSelected[index]);
      return copyIsSelected;
    });
  };

  const onLeftClick = () => {
    router.back();
  };

  const onRightClick = () => {
    const existingIndex = isSelected.findIndex((item) => item === true);
    if (existingIndex !== -1) {
      const selector = isSelected
        .map((item, i) => (item ? form.select[i] : undefined))
        .filter((item) => item !== undefined);

      router.push(`/logic/${templateId}/${form._id}/form?selector=${selector}`);
    } else {
      setToastText("보기를 선택해주세요.");
    }
  };

  const onClose = () => {
    setToastText("");
  };

  useEffect(() => {
    if (!searchParams.get("type") || !searchParams.get("form")) {
      router.replace(`/logic/${templateId}`);
    } else {
      setForm((prev: any) => {
        return { ...prev, ...JSON.parse(searchParams.get("form") as string) };
      });

      setIsSelected((prev) => {
        const copyIsSelected = [...prev];
        const newIsSelected = Array(
          JSON.parse(searchParams.get("form") as string).select.length,
        ).fill(false);
        copyIsSelected.push(...newIsSelected);
        return copyIsSelected;
      });
    }
  }, []);

  return (
    <div>
      <div className="fixed top-0 flex h-[56px] w-full min-w-[360px] items-center justify-center border-b border-solid border-n-light-gray bg-n-white">
        <div className="flex gap-n-sm">{form.title}</div>
      </div>
      <div className="m-auto mt-[56px] flex h-[100px] w-[250px]">
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-black p-1.5">
            <Image src="/images/type.svg" alt="" height={18} width={18} />
          </div>
          <div className="h-1 w-full bg-n-light-black"></div>
        </div>
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-black p-1.5">
            <Image src="/images/check.svg" alt="" height={18} width={18} />
          </div>
          <div className="h-1 w-full bg-n-light-gray"></div>
        </div>
        <div className="flex items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-gray p-1.5">
            <Image src="/images/link.svg" alt="" height={18} width={18} />
          </div>
        </div>
      </div>
      <p className="text-center text-n-xl font-bold">
        로직 적용할 항목을 선택하세요
      </p>
      <div className="m-n-lg flex flex-col gap-n-sm">
        {form?.select?.map((item: string, i: number) => {
          return (
            <div
              key={i}
              className={`h-[42px] w-full cursor-pointer rounded-n-md border border-n-gray p-n-sm ${
                isSelected[i]
                  ? "bg-n-light-gray text-n-gray"
                  : "bg-white text-black"
              }`}
              onClick={() => handleIsSelected(i)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <NextPreviousButton
        modeName={"double"}
        buttonText={["이전", "다음"]}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={onClose} />
      ) : null}
    </div>
  );
};

export default SettingLogicSelect;
