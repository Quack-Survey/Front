"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useGetLogics } from "@/hooks/queries/useGetLogics";
import LogicFormSelectList from "@/components/logic/LogicFormSelectList";
import NextPreviousButton from "@/components/NextPreviousButton";
import Image from "next/image";

const LogicFormManagement: NextPage = (): JSX.Element => {
  const { templateId, formId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = JSON.parse(searchParams.get("form") as string);

  const { data: logic, isLoading } = useGetLogics(
    `/logic?formId=${formId}`,
    formId,
  );

  const onLeftClick = () => {
    router.push(`/logic/${templateId}?formId=${formId}`);
  };

  const onRightClick = () => {
    router.push(`/logic/${templateId}?formId=${formId}`);
  };

  useEffect(() => {
    if (!form) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen bg-n-light-gray">
      <div className="fixed top-0 z-50 flex w-full min-w-[360px] flex-col items-center justify-center border-b border-solid border-n-light-gray bg-n-black p-n-xs text-n-white">
        <div className="my-n-md flex">
          <Image src="/images/logo_black.png" alt="" width={50} height={32} />
          <Image
            src="/images/quack_survey_black.png"
            alt=""
            width={200}
            height={32}
          />
        </div>
        <div className="flex h-[48px] gap-n-sm">{form?.title}</div>
      </div>
      {!isLoading ? (
        <div className="mt-[117px] flex h-full min-h-[445px] flex-col gap-n-sm bg-n-light-gray">
          {form?.select.map((select: string, i: number) => {
            return (
              <LogicFormSelectList
                key={i}
                select={select}
                form={form}
                selector={logic?.selector}
                order={i}
                type={logic?.type!}
                logic={logic}
                templateId={templateId}
              />
            );
          })}
        </div>
      ) : null}
      <NextPreviousButton
        modeName={"double"}
        buttonText={["취소", "확인"]}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </div>
  );
};

export default LogicFormManagement;
