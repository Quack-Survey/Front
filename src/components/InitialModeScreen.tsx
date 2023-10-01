interface IInitialModeScreenProps {
  innerText?: string;
  createTemplate: any;
}

const InitialModeScreen = ({
  innerText,
  createTemplate,
}: IInitialModeScreenProps): JSX.Element => {
  return (
    <div>
      <div
        onClick={createTemplate}
        className="flex h-screen w-screen min-w-[360px] cursor-pointer items-center justify-center bg-n-light-gray text-center font-[bold] text-n-xl text-n-gray"
      >
        {innerText}
      </div>
    </div>
  );
};

export default InitialModeScreen;
