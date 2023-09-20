interface ICheckModalProps {
  isOpen: boolean;
  modalText: string;
  buttonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

interface IFloatingFormButtonProps {
  onCreateSingle: () => void; //인자 필요시 수정필요
  onCreatePlural: () => void; //인자 필요시 수정필요
  onCreateDescription: () => void; //인자 필요시 수정필요
}

interface IInputModalProps {
  isOpen: boolean;
  children: JSX.Element;
  submitText: string;
  onCancel: () => void;
  onSubmit: () => void;
}

interface ILogoBarProps {
  modeName: string; //light dark
}

interface IsingleCaseTool {
  buttonText: string;
  onClick: () => void;
}

interface IdoubleCaseTool {
  buttonText: string[];
  onLeftClick: () => void;
  onRightClick: () => void;
}

interface INextPreviousButtonProps {
  modeName: string;
  toolPart: IsingleCaseTool | IdoubleCaseTool;
}

interface IsavePreservetool {
  onBackward: () => void;
  onOption: () => void;
  onWorkstorage: () => void;
  onLocalsave: () => void;
  onSave: () => void;
}

interface ISavePreserveProps {
  isTyping: boolean;
  toolPart?: IsavePreservetool;
}

interface IclosingTool extends IsingleCaseTool {}

interface IsubmitResetTool {
  buttonText: string;
  onSubmit: () => void;
  onReset: () => void;
}

interface ISubmitResponseButtonProps {
  modeName: string;
  toolPart: IclosingTool | IsubmitResetTool;
}

interface IToastProps {
  toastText: string;
  onClose: () => void;
}

interface IinitialModeTool {
  onCreateText: () => void;
  onCreateImage: () => void;
  onCreateSection: () => void;
  onCreatePreview: () => void;
  onFoldingAll: () => void;
}

interface IclickedModeTool {
  onRandomize: () => void;
  onFolding: () => void;
  onSettingQuater: () => void;
}

interface ItypeModeTool {
  onFocusAbove: () => void;
  onFocusBelow: () => void;
  onAddBlock: () => void;
  onConfirm: () => void;
  onEnter: () => void; //수정된 내역 저장 후 블록 추가 & 포커싱
}

interface IToolbarProps {
  modeName: string; // initial clicked type
  toolCollection: IinitialModeTool | IclickedModeTool | ItypeModeTool;
}

interface IInitialModeScreenProps {
  innerText?: string;
}

interface IFormCreatingSampleProps {
  modeName: string;
}
