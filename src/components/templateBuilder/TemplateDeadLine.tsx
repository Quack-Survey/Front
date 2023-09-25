interface ITemplateDeadLineProps {}

const TemplateDeadLine = ({}: ITemplateDeadLineProps): JSX.Element => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-between items-center">
      <label className="text-n-lg" htmlFor="deadline">
        데드라인
      </label>
      <input
        className="border border-n-gray p-[2.5px] rounded-n-sm outline-none"
        id="deadline"
        type="date"
        min={today}
      />
    </div>
  );
};

export default TemplateDeadLine;
