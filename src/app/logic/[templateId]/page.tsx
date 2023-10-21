"use client";

import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/types/mongooseType";
import { useGetLogics } from "@/hooks/queries/useGetLogics";
import { useGetForms } from "@/hooks/queries/useGetForms";
import NextPreviousButton from "@/components/NextPreviousButton";
import LogicList from "@/components/logic/LogicList";

const LogicManagement: NextPage = (): JSX.Element => {
  const { templateId } = useParams();
  const router = useRouter();

  const { data: forms, isLoading: formsLoading } = useGetForms(
    `/form/all?templateId=${templateId}`,
    templateId,
    0,
  );

  const { data: logics, isLoading: logicsLoading } = useGetLogics(
    `/logic/all?templateId=${templateId}`,
    templateId,
    0,
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
          ? forms?.map((form: Form, i: number) => (
              <LogicList
                key={`${form._id} i`}
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
