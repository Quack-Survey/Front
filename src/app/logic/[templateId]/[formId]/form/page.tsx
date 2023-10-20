"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFetch, postFetch } from "@/utils/fetch/core";
import NextPreviousButton from "@/components/NextPreviousButton";
import LogicHeader from "@/components/logic/LogicHeader";
import LogicProcess from "@/components/logic/LogicProcess";
import Toast from "@/components/Tost";

const SettingLogicForm = (): JSX.Element => {
  const { templateId, formId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [forms, setForms] = useState<any>([]);
  const [isSelectedForm, setIsSelectedForm] = useState<boolean[]>([]);
  const [toastText, setToastText] = useState("");

  const form = JSON.parse(searchParams.get("form") as string);
  const selector = JSON.parse(searchParams.get("selector") as string);
  const type = searchParams.get("type");

  const { data, isLoading } = useQuery([templateId, "form"], () =>
    getFetch(`/form/all?templateId=${templateId}`),
  );

  const { mutate } = useMutation((logicData: any) =>
    postFetch("/logic", JSON.stringify(logicData)),
  );

  const onLeftClick = () => {
    router.back();
  };

  const onRightClick = () => {
    const existingIndex = isSelectedForm.findIndex((item) => item === true);
    if (existingIndex !== -1) {
      mutate(
        {
          type,
          selector,
          formId,
          templateId,
          appliedFormId: forms[existingIndex]._id,
        },
        {
          onSuccess: () => {
            setToastText("저장을 성공했습니다");
            setTimeout(() => {
              router.push(
                `/logic/${templateId}/${form._id}?form=${searchParams.get(
                  "form",
                )}`,
              );
            }, 3000);
          },
          onError: () => {
            setToastText("저장을 실패했습니다.");
          },
        },
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
    if (!searchParams.get("form") || !selector || !type) {
      router.replace(`/logic/${templateId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const ascendingOrderForm = data.filter(
        (rawForm: any) => rawForm.order > form?.order,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
      <LogicHeader title={form?.title} />
      <LogicProcess
        modeName={"form"}
        createDescription={"링크될 문항을 설정하세요"}
      />
      <div className="mt-n-lg flex w-full flex-wrap justify-center gap-n-sm">
        {forms?.map((formData: any, i: number) => {
          return (
            <div
              key={formData._id}
              className={`flex h-[56px] w-[56px]  cursor-pointer items-center justify-center border border-n-gray ${
                isSelectedForm[i]
                  ? "bg-n-light-gray text-n-gray"
                  : "bg-n-white text-black"
              }`}
              onClick={() => handleIsSelectedForm(i)}
            >
              <div className="flex flex-col items-center justify-center text-n-xl">
                {form?.order + i + 1}
              </div>
            </div>
          );
        })}
      </div>
      <NextPreviousButton
        modeName={"double"}
        buttonText={["이전", "저장"]}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
      {toastText !== "" ? (
        <Toast
          editMode={toastText === "저장을 성공했습니다" ? true : false}
          toastText={toastText}
          onClose={onClose}
        />
      ) : null}
    </div>
  );
};

export default SettingLogicForm;
