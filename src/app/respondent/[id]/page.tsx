"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getFetch, postFetch, patchFetch } from "@/utils/fetch/core";
import DescriptiveResponse from "@/components/respondent/DescriptiveResponse";
import SingleResponse from "@/components/respondent/SingleResponse";
import MultipleResponse from "@/components/respondent/MultipleResponse";
import ResponseTitle from "@/components/respondent/ResponseTitle";
import FooterSubmitButton from "@/components/respondent/FooterSubmitButton";
import FooterRefreshButton from "@/components/respondent/FooterRefreshButton";

// 필터로직은 해당 문항을 안보여주는거고
// 이동은 해당문항으로 점프(그 번호까지 모든걸 스킵)

interface ITemplate {
  _id: string;
  bookMark: boolean;
  title: string;
  description: string;
}
interface IForm {
  _id: string;
  plural: boolean;
  bookMark: boolean;
  title: string;
  order: number;
  type: "text" | "select";
}
interface IFormContent {
  _id: string;
  select: string[];
}
interface IComplete {
  _id: string;
  state: 0 | 1;
  templateId: string;
}

const PREVENT_INFINTE_KEY = "unfinished";

const Respondent = () => {
  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [forms, setForms] = useState<IForm[] | []>([]);
  const [formContents, setFormContents] = useState<IFormContent[] | []>([]);
  const [complete, setComplete] = useState<IComplete | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const { id } = params;

  const router = useRouter();

  useEffect(() => {
    if (typeof id === "string") {
      getForms(id);
    }
  }, [id]);

  // TODO: templateId 없는거 => 404 오케이
  // TODO: templateId 유효하지 못한거 => 얘도 404
  // => 이상하게 해결...

  const getDummyComplete = async (templateId: string) => {
    const dummyCompleteRes = await postFetch(
      `/complete?templateId=${templateId}`,
    );
    setComplete({ ...dummyCompleteRes });
  };
  const getForms = async (id: string) => {
    try {
      const templateRes = await getFetch(
        `/template/properties?templateId=${id}`,
      );

      if (templateRes.error) router.push("notfound");

      const { form, formContent, template } = templateRes;
      setForms([...form]);
      setFormContents([...formContent]);
      setTemplate(template[0]);
      setIsLoading(false);
      preventPostInfiniteDummy(template[0]._id);
    } catch (err) {
      console.log(err);
    }
  };

  const preventPostInfiniteDummy = (id: string) => {
    const arrDummy = localStorage.getItem(PREVENT_INFINTE_KEY);
    if (arrDummy) {
      const temp = JSON.parse(arrDummy);
      if (temp.includes(id)) return;
      temp.push(id);
      localStorage.setItem(PREVENT_INFINTE_KEY, JSON.stringify(temp));
      getDummyComplete(id);
    } else {
      localStorage.setItem(PREVENT_INFINTE_KEY, JSON.stringify([id]));
    }
  };

  // TODO: 클리어 로컬스토리지
  const clearLocalStorage = () => {};

  const onSubmitResponse = async (formData: { [key: string]: string }) => {
    // TODO: 설문 답변 요청보낼 때, 로딩...
    const responses = [];
    for (const [formId, response] of Object.entries(formData)) {
      responses.push({ formId, response });
    }
    const completeId = complete?._id;
    const submitRes = await patchFetch(
      `/complete/${completeId}`,
      JSON.stringify({ responses }),
    );
    if (submitRes.state) {
      router.push("complete");
    } else {
      alert("무언가가 잘못되어 요청이 안됨...이럴때는 어떠케?");
    }
  };

  const onClickRefresh = () => {
    router.refresh();
  };
  return (
    <main className="mt-n-lg pt-n-2xl">
      {template ? (
        <ResponseTitle
          title={template.title}
          description={template.description}
        ></ResponseTitle>
      ) : null}
      <form onSubmit={handleSubmit(onSubmitResponse)}>
        {isLoading ? (
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
          <FooterRefreshButton onClick={onClickRefresh}></FooterRefreshButton>
          <FooterSubmitButton></FooterSubmitButton>
        </div>
      </form>
    </main>
  );
};

export default Respondent;
