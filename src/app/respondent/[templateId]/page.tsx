"use client";

import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import { useParams } from "next/navigation";
import { Form } from "@/types/mongooseType";
import ResponseTitle from "@/components/respondent/ResponseTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import RespondentFormWrapper from "@/components/respondent/RespondentFormWrapper";
import SubmitResponseButton from "@/components/SubmitResponseButton";

// useParams로 해당 url 을 가져와서 로딩

const Respondent: NextPage = (): JSX.Element => {
  const { templateId } = useParams();

  const { data, isLoading, error } = useQuery(["respondent"], () =>
    getFetch(`/template/respondent?templateId=${templateId}`),
  );

  return (
    <main className="mb-[70px] mt-[60px]">
      {!isLoading ? (
        <>
          <ResponseTitle
            title={data?.template?.title}
            description={data?.template?.description}
          />
          {data?.form?.map((formData: Form, i: number) => (
            <RespondentFormWrapper
              key={formData._id}
              index={i}
              logics={data?.logic}
              form={formData}
            />
          ))}
          {/* {isLoading ? (
              <div className="h-screen w-full py-7 text-center">loading...</div>
            ) : (
              forms.map((form, idx) => {
                return form.type === "text" ? (
                  <DescriptiveResponse
                    key={form._id}
                    id={form._id}
                    order={form.order}
                    title={form.title}
                    iserror={!!errors[form._id]}
                    {...register(form._id, { required: true })}
                  ></DescriptiveResponse>
                ) : form.plural ? (
                  <MultipleResponse
                    key={form._id}
                    id={form._id}
                    order={form.order}
                    title={form.title}
                    options={formContents[idx].select}
                    iserror={!!errors[form._id]}
                    {...register(form._id, { required: true })}
                  ></MultipleResponse>
                ) : (
                  <SingleResponse
                    key={form._id}
                    id={form._id}
                    order={form.order}
                    title={form.title}
                    options={formContents[idx].select}
                    iserror={!!errors[form._id]}
                    {...register(form._id, { required: true })}
                  ></SingleResponse>
                );
              })
            )}
            <div className="flex">
              <FooterRefreshButton
                onClick={onClickRefresh}
              ></FooterRefreshButton>
              <FooterSubmitButton></FooterSubmitButton>
            </div> */}
        </>
      ) : (
        <LoadingSpinner />
      )}
      <SubmitResponseButton modeName={""} buttonText={"제출"} />
    </main>
  );
};

export default Respondent;
