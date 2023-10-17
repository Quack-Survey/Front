"use client";

import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import { useParams, useRouter } from "next/navigation";
import NextPreviousButton from "@/components/NextPreviousButton";
import LogicList from "@/components/logic/LogicList";

const LogicManagement: NextPage = (): JSX.Element => {
  const { templateId } = useParams();
  const router = useRouter();

  const { data: forms, isLoading: formsLoading } = useQuery([templateId], () =>
    getFetch(`/form/all?templateId=${templateId}`),
  );

  const { data: logics, isLoading: logicsLoading } = useQuery(
    [templateId, "logics"],
    () => getFetch(`/logic/?templateId=${templateId}`),
  );

  const onSingleClick = () => {
    router.push(`/templateBuilder/${templateId}`);
  };

  return (
    <div>
      <div className="fixed top-0 flex w-full min-w-[360px] flex-col items-center justify-center border-n-light-gray bg-n-black p-n-md text-n-white">
        <span className="text-n-lg">로직설정</span>
      </div>
      <div className="mt-[80px] space-y-n-md">
        {!formsLoading && Array.isArray(forms)
          ? forms?.map((form: any, i: number) => (
              <LogicList
                key={form._id}
                index={i}
                form={form}
                logics={logics}
                logicsLoading={logicsLoading}
                templateId={templateId}
              />
            ))
          : null}
      </div>
      <NextPreviousButton
        modeName={"single"}
        buttonText={["취소"]}
        onSingleClick={onSingleClick}
      />
    </div>
  );
};

export default LogicManagement;
