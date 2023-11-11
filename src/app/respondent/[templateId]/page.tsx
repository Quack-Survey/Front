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
import Toast from "@/components/Toast";

const Respondent: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { templateId } = useParams();

  const [isDisabled, setIsDisabled] = useState<boolean[]>([]);
  const [toastText, setToastText] = useState("");

  const { data, isLoading } = useQuery(["respondent"], () =>
    getFetch(`/template/respondent?templateId=${templateId}`),
  );

  const { mutate } = useMutation(
    (response) =>
      postFetch(`/complete?templateId=${templateId}`, JSON.stringify(response)),
    {
      onSuccess: () => router.replace("/respondent/complete"),
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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

    mutate(mutationResponse);
  };

  const onInValid = () => {
    setToastText("필수문항에 응답해주세요!");
  };

  const onClose = () => {
    setToastText("");
  };

  useEffect(() => {
    if (!isLoading) {
      if (data?.template.deadline) {
        const deadlineDate = new Date(data?.template.deadline);
        const todayDate = new Date();
        if (deadlineDate < todayDate) {
          return router.replace("/respondent/notfound");
        }
      }
      setIsDisabled((prev) => {
        const copyIsDisabled = [...prev];
        const newIsDisabled = Array(data?.form?.length).fill(false);
        copyIsDisabled.push(...newIsDisabled);
        return copyIsDisabled;
      });
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
          <form onSubmit={handleSubmit(onValid, onInValid)}>
            {data?.form?.map((formData: Form, i: number) => (
              <RespondentFormWrapper
                key={formData._id}
                index={i}
                logics={data?.logic}
                forms={data?.form}
                form={formData}
                isDisabled={isDisabled[i]}
                setIsDisabled={setIsDisabled}
                getValues={getValues}
                register={register}
              />
            ))}
            <SubmitResponseButton buttonText={"제출"} />
          </form>
        </>
      ) : (
        <LoadingSpinner />
      )}
      {toastText !== "" ? (
        <Toast editMode={false} toastText={toastText} onClose={onClose} />
      ) : null}
    </main>
  );
};

export default Respondent;
