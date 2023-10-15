import { useEffect, useState } from "react";
import { read } from "@/constants/mode";
import {
  defaultFormData,
  defaultPluralFormData,
  defaultTextFormData,
} from "@/constants/defaultValue";
import { deleteFetch, postFetch, putFetch } from "@/utils/fetch/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import InputModal from "@/components/InputModal";
import TemplateDescriptionWrapper from "./TemplateDescriptionWrapper";
import TemplateOption from "./TemplateOption";
import FloatingFormButtonCollection from "@/components/FloatingFormButtonCollection";
import FormWrapper from "./FormWrapper";

interface ITemplateWrapperProps {
  templateBuilderId: string | string[];
  rawTemplateData?: any;
  isOpen: boolean;
  modeName: string;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  foldMode: boolean;
  onOption: () => void;
}

const TemplateWrapper = ({
  templateBuilderId,
  rawTemplateData,
  isOpen,
  onOption,
  modeName,
  foldMode,
  setModeName,
}: ITemplateWrapperProps): JSX.Element => {
  const queryClient = useQueryClient();
  const { template, form, templateOption, logic } = rawTemplateData;
  const [templateStateData, setTemplateStateData] = useState<any>({});
  const [formsStateData, setFormsStateData] = useState<any>([]);
  const newOrder =
    formsStateData.length === 0
      ? 1
      : formsStateData[formsStateData.length - 1].order + 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm({ mode: "onChange" });

  const { mutate: createFormMutate } = useMutation((formData: any) =>
    postFetch("/form", JSON.stringify(formData)),
  );

  const { mutate: createTemplateOptionMutate } = useMutation(
    (tempalteOptionData: any) =>
      postFetch(
        `/templateOption?templateId=${templateBuilderId}`,
        JSON.stringify(tempalteOptionData),
      ),
  );

  const { mutate: updateTemplateMutate } = useMutation((templateData: any) =>
    putFetch(
      `/template?templateId=${templateBuilderId}`,
      JSON.stringify(templateData),
    ),
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

  const onValid = ({ deadLine, targetNumber, quater }: any) => {
    const isQuaterFormsStateData = formsStateData.filter(
      (form: any) => form.isQuater === true,
    );
    // const sum = quater?.reduce((acc, value) => acc + parseInt(value, 10), 0);

    // if (sum !== 100) {
    //   const errorMessage = "합이 100이 되게 해주세요.";
    //   setError("sum", { type: "manual", message: errorMessage });
    //   return;
    // }
    console.log(targetNumber);

    updateTemplateMutate(
      {
        deadLine: deadLine !== "" ? deadLine : null,
        targetNumber: targetNumber ? targetNumber : 0,
      },
      {
        onSuccess: () => {
          return queryClient.invalidateQueries([`${templateBuilderId}`]);
        },
      },
    );

    if (!quater && templateOption.length === 0) {
      return;
    }

    if (quater && templateOption.length === 0) {
      createTemplateOptionMutate(
        {
          quater: [...quater],
          formId: isQuaterFormsStateData[0]._id,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries([`${templateBuilderId}`]);
          },
        },
      );
    }

    if (templateOption.length !== 0 && !quater) {
      return deleteTemplateOptionMutate(templateOption[0]._id, {
        onSuccess: () => {
          return queryClient.invalidateQueries([`${templateBuilderId}`]);
        },
      });
    }

    if (templateOption.length !== 0 && quater) {
      updateTemplateOptionMutate(
        {
          quater: [...quater],
          formId: isQuaterFormsStateData[0]._id,
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries([`${templateBuilderId}`]);
          },
        },
      );
    }
  };

  const onCreateSingle = () => {
    createFormMutate(
      {
        ...defaultFormData,
        order: newOrder,
        templateId: templateBuilderId,
      },
      {
        onSuccess: (data) => {
          setFormsStateData((prev: any) => {
            const copyFormsStateData = [...prev];
            copyFormsStateData.push({ ...data });
            return copyFormsStateData;
          });
        },
      },
    );
  };

  const onCreatePlural = () => {
    createFormMutate(
      {
        ...defaultPluralFormData,
        order: newOrder,
        templateId: templateBuilderId,
      },
      {
        onSuccess: (data) => {
          setFormsStateData((prev: any) => {
            const copyFormsStateData = [...prev];
            copyFormsStateData.push({ ...data });
            return copyFormsStateData;
          });
        },
      },
    );
  };

  const onCreateDescription = () => {
    createFormMutate(
      {
        ...defaultTextFormData,
        order: newOrder,
        templateId: templateBuilderId,
      },
      {
        onSuccess: (data) => {
          setFormsStateData((prev: any) => {
            const copyFormsStateData = [...prev];
            copyFormsStateData.push({ ...data });
            return copyFormsStateData;
          });
        },
      },
    );
  };

  useEffect(() => {
    setTemplateStateData((prev) => {
      return {
        ...prev,
        ...template,
      };
    });
    if (formsStateData.length === 0) {
      setFormsStateData((prev: any) => {
        const copyFormsStateData = [...prev];
        copyFormsStateData.push(...form);
        return copyFormsStateData;
      });
    } else {
      setFormsStateData((prev: any) => {
        const copyFormsStateData = JSON.parse(JSON.stringify(prev));
        const ascendingOrder = copyFormsStateData.sort(
          (a: any, b: any) => a.order - b.order,
        );
        return ascendingOrder;
      });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <>
      <div className="mx-auto max-w-[360px] bg-n-light-gray">
        <TemplateDescriptionWrapper
          templateBuilderId={templateBuilderId}
          templateStateData={templateStateData}
          modeName={modeName}
          setModeName={setModeName}
          setTemplateStateData={setTemplateStateData}
        />
        <div className="mb-[60px] space-y-n-md">
          {formsStateData?.map((formStateData: any, i: any) => (
            <FormWrapper
              key={formStateData._id}
              index={i}
              newOrder={newOrder}
              formsStateData={formsStateData}
              templateOption={templateOption}
              templateBuilderId={templateBuilderId}
              formStateData={formStateData}
              foldMode={foldMode}
              setModeName={setModeName}
              setFormsStateData={setFormsStateData}
              modeName={modeName}
            />
          ))}
        </div>
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
            quater={templateOption[0]?.quater}
            register={register}
            errors={errors}
            resetField={resetField}
            formsStateData={formsStateData}
          />
        ) : (
          <></>
        )}
      </InputModal>
    </>
  );
};

export default TemplateWrapper;
