interface IInitialModeScreenProps {
  innerText?: string;
}

const InitialModeScreen = ({
  innerText,
}: IInitialModeScreenProps): JSX.Element => {
  return (
    <div>
      <div className="flex h-screen w-screen min-w-[360px] items-center justify-center bg-n-light-gray text-center font-[bold] text-n-xl text-n-gray">
        {innerText}
      </div>
    </div>
  );
};

export default InitialModeScreen;
