"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFetch, postFetch } from "@/utils/fetch/core";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/types/mongooseType";
import { useForm } from "react-hook-form";
import ResponseTitle from "@/components/respondent/ResponseTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import RespondentFormWrapper from "@/components/respondent/RespondentFormWrapper";
import SubmitResponseButton from "@/components/SubmitResponseButton";

// useParams로 해당 url 을 가져와서 로딩

// 페이지 진입시 deadline이 넘어가면 기간이만료됐다고 라우팅하고 띄우기

const Respondent: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { templateId } = useParams();

  const [isDisabled, setIsDisabled] = useState<boolean[]>([]);
  const { data, isLoading } = useQuery(["respondent"], () =>
    getFetch(`/template/respondent?templateId=${templateId}`),
  );

  // const { data: complete } = useQuery(["respondentasdasdasd"], () =>
  //   getFetch(`/complete?templateId=${templateId}`),
  // );
  // console.log(complete);

  const { mutate } = useMutation(
    (response) =>
      postFetch(`/complete?templateId=${templateId}`, JSON.stringify(response)),
    {
      onSuccess: (data) => console.log(data),
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onChange" });

  const onValid = (respondentData: any) => {
    const respondentForms: any = Object.values(respondentData);

    const filterDisabledResponse = respondentForms.map(
      (response: string[] | string, i: number) => {
        if (isDisabled[i]) {
          return typeof response === "string" ? "" : [""];
        }
        return response;
      },
    );

    // const mutaionCheckedForm = isDisabled.map((disabled, i) => {
    //   // const check = checkedForm[i].findIndex((chec))
    //   if (disabled) {
    //     if (typeof checkedForms[i] === "string" && checkedForms[i] !== "") {
    //       return "";
    //     } else if (Array.isArray(checkedForms[i])) {
    //       const isCheckedRespondent = checkedForms[i].some(
    //         (item: any) => typeof item === "string",
    //       );
    //       return isCheckedRespondent ? true : checkedForms[i];
    //     }
    //   }
    //   return checkedForms[i];
    // });
    // console.log(res);
    const mutationResponseForms = filterDisabledResponse.map(
      (response: string[] | string, i: number) => {
        if (Array.isArray(response)) {
          const filterResponse = response.filter(
            (item) => typeof item === "string",
          );
          return filterResponse.length === 0 ? [""] : filterResponse;
        } else {
          return response;
        }
      },
    );

    const mutationResponse = data?.form?.map((formData: Form, i: number) => {
      return {
        formId: formData._id,
        response: mutationResponseForms[i],
      };
    });

    console.log(mutationResponse);

    mutate(mutationResponse);
    // console.log(data);
    // router.replace("/respondent/complete");
  };

  useEffect(() => {
    if (!isLoading) {
      setIsDisabled((prev) => {
        const copyIsDisabled = [...prev];
        const newIsDisabled = Array(data?.form?.length).fill(false);
        copyIsDisabled.push(...newIsDisabled);
        return copyIsDisabled;
      });
      // mutate();
    }
  }, [isLoading]);

  return (
    <main className="mb-[70px] mt-[60px]">
      {!isLoading ? (
        <>
          <ResponseTitle
            title={data?.template?.title}
            description={data?.template?.description}
          />
          <form onSubmit={handleSubmit(onValid)}>
            {data?.form?.map((formData: Form, i: number) => (
              <RespondentFormWrapper
                key={formData._id}
                index={i}
                logics={data?.logic}
                forms={data?.form}
                form={formData}
                isDisabled={isDisabled[i]}
                setIsDisabled={setIsDisabled}
                register={register}
                control={control}
              />
            ))}
            <SubmitResponseButton buttonText={"제출"} />
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
};

export default Respondent;
