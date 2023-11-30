interface IDashboardDescriptionProps {
  textResults: [index: string][] | [string, number][];
}

const DashboardTextResult = ({
  textResults,
}: IDashboardDescriptionProps): JSX.Element => {
  return (
    <div className="flex max-h-[200px] w-full flex-col gap-n-xs overflow-scroll pb-[20px]">
      {textResults
        ? textResults[0]?.map((text, index) => (
            <div
              key={index}
              className="w-full rounded-n-sm bg-n-light-gray px-n-md py-n-xs text-n-sm"
            >
              {text}
            </div>
          ))
        : ""}
    </div>
  );
};

export default DashboardTextResult;
