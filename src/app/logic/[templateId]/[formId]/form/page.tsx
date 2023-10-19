"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import NextPreviousButton from "@/components/NextPreviousButton";
import LogicHeader from "@/components/logic/LogicHeader";
import LogicProcess from "@/components/logic/LogicProcess";
import Toast from "@/components/Tost";

const SettingLogicForm = (): JSX.Element => {
  const { templateId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [forms, setForms] = useState<any>([]);
  const [isSelectedForm, setIsSelectedForm] = useState<boolean[]>([]);
  const [toastText, setToastText] = useState("");

  const queryForm = JSON.parse(searchParams.get("form") as string);

  const { data, isLoading } = useQuery([templateId, "form"], () =>
    getFetch(`/form/all?templateId=${templateId}`),
  );

  const onLeftClick = () => {
    router.back();
  };

  const onRightClick = () => {
    const existingIndex = isSelectedForm.findIndex((item) => item === true);
    console.log(existingIndex);

    if (existingIndex !== -1) {
      router.push(
        `/logic/${templateId}/${queryForm._id}?appliedFormId=${JSON.stringify(
          forms[existingIndex],
        )}`,
      );
    } else {
      setToastText("문항을 선택해주세요.");
    }
  };

  const onClose = () => {
    setToastText("");
  };

  const handleIsSelectedForm = (index: number) => {
    setIsSelectedForm((prev) => {
      const initialCopyIsSelectedForm = prev.map(() => {
        return false;
      });
      initialCopyIsSelectedForm.splice(index, 1, !isSelectedForm[index]);
      return initialCopyIsSelectedForm;
    });
  };

  useEffect(() => {
    if (!searchParams.get("form") || !searchParams.get("selector")) {
      router.replace(`/logic/${templateId}`);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const ascendingOrderForm = data.filter(
        (form: any) => form.order > queryForm.order,
      );
      setForms((prev: any) => {
        const copyForms = [...prev];
        copyForms.push(...ascendingOrderForm);
        return copyForms;
      });
      setIsSelectedForm((prev) => {
        const copyIsSelectedForm = [...prev];
        const newIsSelectedForm = Array(ascendingOrderForm.length).fill(false);
        copyIsSelectedForm.push(...newIsSelectedForm);
        return copyIsSelectedForm;
      });
    }
  }, [isLoading]);

  return (
    <div>
      <LogicHeader title={queryForm?.title} />
      <LogicProcess
        modeName={"form"}
        createDescription={"링크될 문항을 설정하세요"}
      />
      <div className="mt-n-lg flex w-full flex-wrap justify-center gap-n-sm">
        {forms?.map((form: any, i: number) => {
          return (
            <div
              key={form._id}
              className={`flex h-[56px] w-[56px]  cursor-pointer items-center justify-center border border-n-gray ${
                isSelectedForm[i]
                  ? "bg-n-light-gray text-n-gray"
                  : "bg-n-white text-black"
              }`}
              onClick={() => handleIsSelectedForm(i)}
            >
              <div className="flex flex-col items-center justify-center text-n-xl">
                {queryForm?.order + i + 1}
              </div>
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

export default SettingLogicForm;
