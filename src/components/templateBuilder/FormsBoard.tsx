import { Form, Logic } from "@/types/mongooseType";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useUpdateForm } from "@/hooks/mutation/useUpdateForm";
import { read } from "@/constants/mode";
import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import Toast from "../Tost";

interface IFormsBoardProps {
  forms: Form[];
  newOrder: any;
  logics: any;
  templateOption: any;
  templateBuilderId: any;
  isFold: any;
  setModeName: any;
  modeName: any;
  createMutate: any;
}

const FormsBoard = ({
  forms,
  newOrder,
  logics,
  templateOption,
  templateBuilderId,
  isFold,
  setModeName,
  modeName,
  createMutate,
}: IFormsBoardProps): JSX.Element => {
  const [toastText, setToastText] = useState("");

  const { mutate: updateMutate } = useUpdateForm(
    "/form/order",
    templateBuilderId,
    "forms",
  );
  // 1. 일단 로직이 걸려있는지 확인 -> const existingIndex = logics.findIndex((item) => item.formId === draggableId)
  // 2. 있으면 해당 인덱스로 추출 -> logics[existingIndex]
  // 3. const formExistingIndex = forms.findIndex(item => item._id === appliedFormId)
  // 4 .  formExistingIndexd 이것이  destination.index 보다 작으면 오류띄우기
  // soruce의 dragId가

  // 일단 로직의 appliedFormId가

  // console.log(logics);
  // console.log(forms);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    console.log(destination);

    if (!destination) return;
    const logicExistingIndex = logics.findIndex(
      (logic: Logic) => logic.formId === draggableId,
    );
    if (logicExistingIndex !== -1) {
      const existingLogic = logics[logicExistingIndex];
      const formExistingIndex = forms.findIndex(
        (form) => form._id === existingLogic.appliedFormId,
      );
      if (formExistingIndex <= destination.index) {
        return setToastText(
          "로직이 걸려있어 해당폼보다 밑으로 갈 수 없습니다.",
        );
      }
    }

    const formsData: string[] | null = [];
    forms.forEach((form) => formsData.push(form._id));
    formsData.splice(source.index, 1);
    formsData.splice(destination?.index, 0, draggableId);
    updateMutate(formsData);
  };

  const onClose = () => {
    setToastText("");
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one">
          {(provided) => (
            <div
              className="mb-[60px] space-y-n-md"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {forms?.map((form: Form, i: number) => (
                <Draggable
                  key={form._id}
                  draggableId={form._id}
                  index={i}
                  isDragDisabled={modeName === read ? false : true}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <FormWrapper
                        index={i}
                        newOrder={newOrder}
                        logics={logics}
                        setToastText={setToastText}
                        templateOption={templateOption}
                        templateBuilderId={templateBuilderId}
                        form={form}
                        isFold={isFold}
                        setModeName={setModeName}
                        modeName={modeName}
                        createMutate={createMutate}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={onClose} editMode={false} />
      ) : null}
    </>
  );
};

export default React.memo(FormsBoard);
