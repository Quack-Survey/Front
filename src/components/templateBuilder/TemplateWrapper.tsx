import { useEffect, useState } from "react";
import { read } from "@/constants/mode";
import { deleteFetch, getFetch, postFetch, putFetch } from "@/utils/fetch/core";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCreateForm } from "@/hooks/mutation/useCreateForm";
import { useUpdateTemplate } from "@/hooks/mutation/useUpdateTemplate";
import { useGetForms } from "@/hooks/queries/useGetForms";
import LoadingSpinner from "../LoadingSpinner";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import FloatingFormButtonCollection from "@/components/FloatingFormButtonCollection";
import FormsBoard from "./FormsBoard";

export interface IOptionForm {
  deadline?: string;
  targetNumber?: string;
  formId: string;
  title?: string;
  quater?: string[];
  sum?: string;
}

interface ITemplateOptionData {
  quater: string[];
  formId: string;
}

interface ITemplateWrapperProps {
  isOpen: boolean;
  isFold: boolean;
  templateBuilderId: string | string[];
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  setToastMsg: React.Dispatch<React.SetStateAction<string>>;
  onOption: () => void;
}

const TemplateWrapper = ({
  isOpen,
  isFold,
  templateBuilderId,
  modeName,
  setToastMsg,
  setModeName,
  onOption,
}: ITemplateWrapperProps): JSX.Element => {
  const queryClient = useQueryClient();
  const [newOrder, setNewOrder] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    resetField,
  } = useForm<IOptionForm>({ mode: "onChange" });

  const { data: template, isLoading: isLoadingTemplate } = useQuery(
    [templateBuilderId],
    () => getFetch(`/template/one?templateId=${templateBuilderId}`),
  );

  const { data: templateOption, isLoading: isLoadingTemplateOption } = useQuery(
    [templateBuilderId, "templateOption"],
    () => getFetch(`/templateOption?templateId=${templateBuilderId}`),
  );
  const { data: logics, isLoading: logicsLoading } = useQuery(
    [templateBuilderId, "templateLogics"],
    () => getFetch(`/logic/all?templateId=${templateBuilderId}`),
  );

  const { data: forms, isLoading: isLoadingForm } = useGetForms(
    `/form/all?templateId=${templateBuilderId}`,
    templateBuilderId,
  );

  const { mutate: createFormMutate } = useCreateForm(
    "/form",
    templateBuilderId,
    "forms",
  );

  const { mutate: createTemplateOptionMutate } = useMutation(
    (tempalteOptionData: ITemplateOptionData) =>
      postFetch(
        `/templateOption?templateId=${templateBuilderId}`,
        JSON.stringify(tempalteOptionData),
      ),
  );

  const { mutate: updateTemplateMutate } = useUpdateTemplate(
    `/template?templateId=${templateBuilderId}`,
    templateBuilderId,
  );

  const { mutate: updateTemplateOptionMutate } = useMutation(
    (tempalteOptionData: ITemplateOptionData) =>
      putFetch(
        `/templateOption?templateOptionId=${templateOption[0]._id}`,
        JSON.stringify(tempalteOptionData),
      ),
  );

  const { mutate: deleteTemplateOptionMutate } = useMutation((_id) =>
    deleteFetch(`/templateOption?templateOptionId=${_id}`),
  );

  // Fn
  const onValid = ({
    deadline,
    targetNumber,
    formId,
    title,
    quater,
  }: IOptionForm) => {
    const sum = quater?.reduce((acc, value) => acc + parseInt(value, 10), 0);

    if (quater && sum !== 100) {
      const errorMessage = "합이 100이 되게 해주세요.";
      setError("sum", { type: "manual", message: errorMessage });
      setTimeout(() => {
        clearErrors("sum");
      }, 3000);
      return;
    }
    setToastMsg("옵션 저장이 완료되었습니다");

    updateTemplateMutate({
      deadline: deadline !== "" ? deadline : null,
      targetNumber: targetNumber ? targetNumber : 0,
    });

    if (!quater && templateOption.length === 0) {
      return;
    }

    if (quater && templateOption.length === 0) {
      createTemplateOptionMutate(
        {
          quater: [...quater],
          formId,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries([
              templateBuilderId,
              "templateOption",
            ]);
          },
        },
      );
    }

    if (templateOption.length !== 0 && !quater) {
      return deleteTemplateOptionMutate(templateOption[0]._id, {
        onSuccess: () => {
          return queryClient.invalidateQueries([
            templateBuilderId,
            "templateOption",
          ]);
        },
      });
    }

    if (templateOption.length !== 0 && quater) {
      updateTemplateOptionMutate(
        {
          quater: [...quater],
          formId,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries([
              templateBuilderId,
              "templateOption",
            ]);
          },
        },
      );
    }
  };

  const onCreateForm = (type: string, plural: boolean) => {
    createFormMutate(
      {
        title: "",
        order: newOrder,
        templateId: templateBuilderId,
        type,
        plural,
      },
      {
        onSuccess: (res) => {
          if (res?.title === "") return setNewOrder(res?.order + 1);
        },
      },
    );
  };

  // Effect
  useEffect(() => {
    if (!isLoadingForm && Array.isArray(forms)) {
      const order =
        forms?.length === 0 ? 1 : forms[forms?.length - 1].order + 1;
      setNewOrder(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingForm]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isLoadingTemplate) {
      if (!(template._id === templateBuilderId)) {
        router.replace("/home");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingTemplate]);

  return (
    <>
      <div className="mx-auto max-w-[360px]">
        {!isLoadingTemplate ? (
          <TemplateDescriptionWrapper
            template={template}
            updateTemplateMutate={updateTemplateMutate}
            modeName={modeName}
            setModeName={setModeName}
          />
        ) : (
          <LoadingSpinner />
        )}
        {!isLoadingForm && Array.isArray(forms) ? (
          <FormsBoard
            forms={forms}
            newOrder={newOrder}
            logics={logics}
            templateOption={!isLoadingTemplateOption ? templateOption[0] : null}
            templateBuilderId={templateBuilderId}
            isFold={isFold}
            setModeName={setModeName}
            modeName={modeName}
            createMutate={createFormMutate}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {modeName === read ? (
        <FloatingFormButtonCollection
          modeName={read}
          onCreateForm={onCreateForm}
        />
      ) : null}
      <InputModal
        handleSubmit={handleSubmit}
        onValid={onValid}
        isOpen={isOpen}
        onCancel={onOption}
        submitText="저장"
      >
        {isOpen ? (
          <TemplateOption
            template={template}
            templateOption={!isLoadingTemplateOption ? templateOption[0] : null}
            register={register}
            setValue={setValue}
            errors={errors}
            resetField={resetField}
            forms={forms}
          />
        ) : (
          <></>
        )}
      </InputModal>
      <div className="fixed left-0 top-0 -z-50 h-screen w-full bg-n-light-gray"></div>
    </>
  );
};

export default TemplateWrapper;
