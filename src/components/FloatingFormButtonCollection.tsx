import FloatingFormButton from "./FloatingFormButton";

interface IFloatingFormButtonCollectionProps {
  onCreateSingle?: () => void; //[initial Mode]
  onCreatePlural?: () => void;
  onCreateDescription?: () => void;
  onDuplicate?: () => void; //[clicked Mode]
  onDelete?: () => void;
  onCreateLogic?: () => void;
  modeName: string; // initial | clicked
  isBlocked?: boolean;
  isOpen: boolean;
}

const FloatingFormButtonCollection = ({
  modeName,
  isBlocked,
  isOpen,
  onCreateSingle,
  onCreatePlural,
  onCreateDescription,
  onDuplicate,
  onDelete,
  onCreateLogic,
}: IFloatingFormButtonCollectionProps): JSX.Element => {
  return (
    <div
      className={`fixed bottom-[67px] right-[18px] h-[181px] w-[50px] ${
        isOpen ? "-z-10" : ""
      }`}
    >
      {true ? (
        <div className="flex flex-col gap-n-md">
          <FloatingFormButton
            onClick={onCreateSingle}
            imageName={"single"}
            imageSize={18}
          ></FloatingFormButton>
          <FloatingFormButton
            onClick={onCreatePlural}
            imageName={"plural"}
            imageSize={24}
          ></FloatingFormButton>
          <FloatingFormButton
            onClick={onCreateDescription}
            imageName={"description"}
            imageSize={24}
          ></FloatingFormButton>
        </div>
      ) : (
        <div>
          {modeName === "clicked" &&
          onDuplicate &&
          onDelete &&
          onCreateLogic ? (
            <div className="flex flex-col gap-n-md">
              <FloatingFormButton
                onClick={onDuplicate}
                imageName={"duplicate_black"}
                imageSize={18}
              ></FloatingFormButton>
              <FloatingFormButton
                onClick={onDelete}
                imageName={"trash"}
                imageSize={24}
              ></FloatingFormButton>
              <FloatingFormButton
                onClick={onCreateLogic}
                isBlocked={isBlocked}
                imageName={"logic"}
                imageSize={24}
              ></FloatingFormButton>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingFormButtonCollection;

// modeName === "initial" &&
//       onCreateSingle &&
//       onCreatePlural &&
//       onCreateDescription
