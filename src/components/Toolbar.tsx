import ToolbarTypeCase from "./ToolbarTypingCase";
import ToolbarInitialCase from "./ToolbarOtherCase";

const Toolbar = ({ toolCollection, modeName }: IToolbarProps): JSX.Element => {
  return (
    <div>
      {modeName === "type" ? (
        <ToolbarTypeCase toolPart={toolCollection} />
      ) : (
        <div>
          {Object.keys(toolCollection).length > 1 ? (
            <ToolbarInitialCase toolPart={toolCollection} modeName={modeName} />
          ) : (
            <div className="fixed bottom-[0px] flex justify-end gap-n-md items-center min-w-[360px] w-full h-[49px] bg-n-light-black p-n-md"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
