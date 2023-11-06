import { Form, Logic } from "@/types/mongooseType";
import RespondentFormTitle from "./RespondentFormTitle";
import RespondentFormSelectBox from "./RespondentFormSelectBox";
import RespondentFormTextBox from "./RespondentFormTextBox";

interface IRespondentFormWrapperProps {
  form: Form;
  logics: Logic[];
  index: number;
}
// ${plural ? "border-dotted" : ""}
// : "cursor-pointer border-n-dark-gray"
const RespondentFormWrapper = ({
  form,
  logics,
  index,
}: IRespondentFormWrapperProps): JSX.Element => {
  const { title, plural, required, select, type } = form;

  return (
    <div
      className={`mb-3 h-full w-[360px] flex-col border-l-[8px] border-n-light-blue bg-white py-2`}
    >
      <div className="flex">
        {/* {required ? (
          // 만약 disabled 처리되면 필수응답 텍스트 안보이게
          <div className="mb-3 ml-3 text-n-xs">( 필수응답 )</div>
        ) : null} */}
        {plural ? (
          <div className="mb-3 ml-3 text-n-xs">( 모두선택 )</div>
        ) : null}
      </div>
      <RespondentFormTitle title={title} index={index} />
      {type === "select" ? (
        <div className="space-y-n-sm">
          {select?.map((text: string, i) => (
            <RespondentFormSelectBox key={i} text={text} />
          ))}
        </div>
      ) : (
        <RespondentFormTextBox />
      )}
    </div>
  );
};

export default RespondentFormWrapper;
