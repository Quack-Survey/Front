"use client";

import Image from "next/image";
import DashboardLink from "./DashboardLink";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useModal from "@/hooks/useModal";
import DashboardSelectTemplate from "./DashboardSelectTemplate";
import { getFetch } from "@/utils/fetch/core";
import LoadingSpinner from "../../LoadingSpinner";

const DashboardNavigation = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const templateId = searchParams.get("templateId");
  const tempTemplateId = useRef(null);
  const [templateName, setTemplateName] = useState<string | null>(
    "템플릿이름이 표시됩니다",
  );
  const [isLoadging, setIsLoading] = useState<boolean>(true);
  const { ModalContainer, openModal } = useModal(() => {
    router.push(`${path}?templateId=${tempTemplateId.current}`, {
      scroll: false,
    });
  });

  useEffect(() => {
    if (templateId)
      (async () => {
        const res = await getFetch(`/template/one?templateId=${templateId}`);

        setIsLoading(false);
        setTemplateName(res.title);
      })();
    else {
      setIsLoading(false);
      setTemplateName("템플릿이름이 표시됩니다");
    }
  }, [templateId]);

  if (isLoadging) return <LoadingSpinner />;

  return (
    <div>
      <div className="justify-items-between fixed top-0 flex h-[93px] w-full flex-col items-center justify-between border-[1px] border-b border-b-n-gray bg-n-light-gray">
        <div
          className="mt-n-sm flex cursor-pointer items-center gap-n-sm text-center text-n-xs"
          onClick={openModal}
        >
          <Image
            className="bg-black"
            priority
            src={"/images/down.svg"}
            alt=""
            height={18}
            width={18}
          />
          {templateName}
        </div>
        <div className="flex">
          <DashboardLink
            to={`/dashboard/status${
              templateId ? `?templateId=${templateId}` : ""
            }`}
          >
            응답현황
          </DashboardLink>
          <DashboardLink
            to={`/dashboard/result${
              templateId ? `?templateId=${templateId}` : ""
            }`}
          >
            설문결과
          </DashboardLink>
        </div>
      </div>
      <ModalContainer>
        <DashboardSelectTemplate
          currentTemplateId={templateId}
          tempTemplateId={tempTemplateId}
        />
      </ModalContainer>
    </div>
  );
};

export default DashboardNavigation;
