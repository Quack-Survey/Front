import FloatingFormButton from "./FloatingFormButton";

const FloatingFormButtonCollection = ({
  toolPart,
  isBlocked,
}: IFloatingFormButtonCollectionProps): JSX.Element => {
  return (
    <div className="fixed right-[18px] bottom-[67px] w-[50px] h-[181px] ">
      {toolPart.modeName === "initial" ? (
        <div className="flex gap-n-md">
          <FloatingFormButton
            onClick={toolPart.onCreateSingle}
            imageName={"single"}
            size={18}
          ></FloatingFormButton>
          <FloatingFormButton
            onClick={toolPart.onCreatePlural}
            imageName={"plural"}
            size={24}
          ></FloatingFormButton>
          <FloatingFormButton
            onClick={toolPart.onCreateDescription}
            imageName={"description"}
            size={24}
          ></FloatingFormButton>
        </div>
      ) : (
        <div className="flex flex-col gap-n-md">
          <FloatingFormButton
            onClick={toolPart.onDuplicate}
            imageName={"duplicate"}
            size={18}
          ></FloatingFormButton>
          <FloatingFormButton
            onClick={toolPart.onDelete}
            imageName={"trash"}
            size={24}
          ></FloatingFormButton>
          <FloatingFormButton
            onClick={toolPart.onCreateLogic}
            isBlocked={isBlocked}
            imageName={"logic"}
            size={24}
          ></FloatingFormButton>
        </div>
      )}
    </div>
  );
};

export default FloatingFormButtonCollection;
