import { Form } from "@/types/mongooseType";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useUpdateForm } from "@/hooks/mutation/useUpdateForm";
import { read } from "@/constants/mode";
import FormWrapper from "./FormWrapper";
import React from "react";

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
  const { mutate: updateMutate } = useUpdateForm(
    "/form/order",
    templateBuilderId,
    "forms",
  );

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    const formsData: string[] | null = [];
    forms.forEach((form) => formsData.push(form._id));
    formsData.splice(source.index, 1);
    formsData.splice(destination?.index, 0, draggableId);
    updateMutate(formsData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one">
        {(provided) => (
          <div
            className="mb-[60px] space-y-n-md"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {forms?.map((form: Form, i: number) => (
              <Draggable key={form._id} draggableId={form._id} index={i}>
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
  );
};

export default React.memo(FormsBoard);
