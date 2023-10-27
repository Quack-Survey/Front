import { useEffect, useState } from "react";
import { read } from "@/constants/mode";
import {
  defaultFormData,
  defaultPluralFormData,
  defaultTextFormData,
} from "@/constants/defaultValue";
import { deleteFetch, getFetch, postFetch, putFetch } from "@/utils/fetch/core";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form } from "@/types/mongooseType";
import { useCreateForm } from "@/hooks/mutation/useCreateForm";
import { useUpdateTemplate } from "@/hooks/mutation/useUpdateTemplate";
import { useGetLogics } from "@/hooks/queries/useGetLogics";
import { useGetForms } from "@/hooks/queries/useGetForms";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import FloatingFormButtonCollection from "@/components/FloatingFormButtonCollection";
import FormWrapper from "./FormWrapper";

interface ITemplateWrapperProps {
  templateBuilderId: string | string[];
  isOpen: boolean;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  isFold: boolean;
  onOption: () => void;
}

const TemplateWrapper = ({
  templateBuilderId,
  isOpen,
  onOption,
  modeName,
  isFold,
  setModeName,
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
  } = useForm({ mode: "onChange" });

  const { data: template, isLoading: isLoadingTemplate } = useQuery(
    [templateBuilderId],
    () => getFetch(`/template/one?templateId=${templateBuilderId}`),
  );

  const { data: templateOption, isLoading: isLoadingTemplateOption } = useQuery(
    [templateBuilderId, "templateOption"],
    () => getFetch(`/templateOption?templateId=${templateBuilderId}`),
  );
  const { data: logics, isLoading: logicsLoading } = useGetLogics(
    `/logic/all?templateId=${templateBuilderId}`,
    templateBuilderId,
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
    (tempalteOptionData: any) =>
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
    (tempalteOptionData: any) =>
      putFetch(
        `/templateOption?templateOptionId=${templateOption[0]._id}`,
        JSON.stringify(tempalteOptionData),
      ),
  );

  const { mutate: deleteTemplateOptionMutate } = useMutation((_id) =>
    deleteFetch(`/templateOption?templateOptionId=${_id}`),
  );

  // Fn
  const onValid = ({ deadline, targetNumber, formId, title, quater }: any) => {
    // onOption();
    const sum = quater?.reduce((acc, value) => acc + parseInt(value, 10), 0);

    if (quater && sum !== 100) {
      const errorMessage = "합이 100이 되게 해주세요.";
      setError("sum", { type: "manual", message: errorMessage });
      setTimeout(() => {
        clearErrors("sum");
      }, 3000);
      return;
    }

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

  const onCreateSingle = () => {
    createFormMutate({
      ...defaultFormData,
      order: newOrder,
      templateId: templateBuilderId,
    });
  };

  const onCreatePlural = () => {
    createFormMutate({
      ...defaultPluralFormData,
      order: newOrder,
      templateId: templateBuilderId,
    });
  };

  const onCreateDescription = () => {
    createFormMutate({
      ...defaultTextFormData,
      order: newOrder,
      templateId: templateBuilderId,
    });
  };

  // Effect
  useEffect(() => {
    if (!isLoadingForm && Array.isArray(forms)) {
      const order =
        forms?.length === 0 ? 1 : forms[forms?.length - 1].order + 1;
      setNewOrder(order);
    }
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
  }, [isLoadingTemplate]);

  return (
    <>
      <div className="mx-auto max-w-[360px] bg-n-light-gray">
        {!isLoadingTemplate ? (
          <TemplateDescriptionWrapper
            template={template}
            updateTemplateMutate={updateTemplateMutate}
            modeName={modeName}
            setModeName={setModeName}
          />
        ) : null}
        {!isLoadingForm && Array.isArray(forms) ? (
          <div className="mb-[60px] space-y-n-md">
            {forms?.map((form: Form, i: number) => (
              <FormWrapper
                key={form._id}
                index={i}
                newOrder={newOrder}
                logics={logics}
                templateOption={
                  !isLoadingTemplateOption ? templateOption[0] : null
                }
                templateBuilderId={templateBuilderId}
                form={form}
                isFold={isFold}
                setModeName={setModeName}
                modeName={modeName}
                createMutate={createFormMutate}
              />
            ))}
          </div>
        ) : null}
      </div>
      {modeName === read ? (
        <FloatingFormButtonCollection
          modeName={read}
          onCreateSingle={onCreateSingle}
          onCreatePlural={onCreatePlural}
          onCreateDescription={onCreateDescription}
          isOpen={isOpen}
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
    </>
  );
};

export default TemplateWrapper;
