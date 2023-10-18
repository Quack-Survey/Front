"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NextPreviousButton from "@/components/NextPreviousButton";

const SettingLogicType: NextPage = (): JSX.Element => {
  const { templateId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [logicType, setLogicType] = useState("");
  const [form, setForm] = useState<any>({});

  const logicTypeList = ["moving", "filter"];

  const handleLogicToggle = (type: string) => {
    if (type === "moving") {
      setLogicType("moving");
    } else {
      setLogicType("filter");
    }
  };

  useEffect(() => {
    if (!searchParams.get("form")) {
      router.replace(`/logic/${templateId}`);
    } else {
      setForm((prev: any) => {
        return { ...prev, ...JSON.parse(searchParams.get("form") as string) };
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
          <div className="h-1 w-full bg-n-light-gray"></div>
        </div>
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-gray p-1.5">
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
        적용할 로직 타입을 선택하세요
      </p>
      <div className="m-n-lg flex justify-center gap-n-md">
        {logicTypeList.map((type: string) => {
          return (
            <button
              key={type}
              className={`flex h-[145px] w-[145px] cursor-pointer items-center justify-center border border-n-gray ${
                logicType === type
                  ? "bg-n-light-gray text-n-gray"
                  : "bg-white text-black"
              } `}
              onClick={() => handleLogicToggle(type)}
            >
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`/images/${type}_${logicType === type ? "g" : "b"}.svg`}
                  priority
                  width={45}
                  height={45}
                  alt=""
                />
                {type === "moving" ? "이동로직" : "필터로직"}
              </div>
            </button>
          );
        })}
      </div>
      {logicType !== "" ? (
        <Link
          href={{
            pathname: "select",
            query: { type: logicType, form: searchParams.get("form") },
          }}
        >
          <NextPreviousButton modeName={"single"} buttonText={["다음"]} />
        </Link>
      ) : null}
    </div>
  );
};

export default SettingLogicType;
