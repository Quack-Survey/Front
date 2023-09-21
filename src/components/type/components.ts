interface ICheckModalProps {
  isOpen: boolean;
  modalText: string;
  buttonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

interface IFloatingFormButtonProps {
  imageName: string;
  size: number;
  onClick: () => void;
  isBlocked?: boolean;
}

interface IFloatingFormButtonCollectionProps {
  toolPart: IcreateModeTool | IfocuseModeTool;
  isBlocked?: boolean;
}

interface IInitialModeScreenProps {
  innerText?: string;
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

interface INextPreviousButtonProps {
  modeName: string;
  toolPart: IsingleCaseTool | IdoubleCaseTool;
}

interface ISavePreserveProps {
  isTyping: boolean;
  toolPart?: IsavePreserveTool;
}

interface ISubmitResponseButtonProps {
  modeName: string;
  toolPart: IclosingTool | IsubmitResetTool;
}

interface IToastProps {
  toastText: string;
  onClose: () => void;
}

interface IToolbarTypeCaseProp {
  toolPart: ItypeModeTool;
}

interface IToolbarOtherCaseProp {
  toolPart: IinitialModeTool | IclickedModeTool;
  modeName: string;
}

interface IToolbarProps {
  toolCollection: IinitialModeTool | IclickedModeTool | ItypeModeTool | Object;
  modeName: string;
}

interface IToolTipProps {
  isOpen: boolean;
  bottom: number;
  children: JSX.Element;
  onCancel: () => void;
}

interface IinitialModeTool {
  onCreateText: () => void;
  onCreateImage: () => void;
  onCreateSection: () => void;
  onCreatePreview: () => void;
  onFoldingAll: () => void;
  onPreview: () => void;
}

interface IclickedModeTool {
  onRandomize: () => void;
  onFolding: () => void;
  onSettingQuater: () => void;
}

interface ItypeModeTool {
  onFocusUp: () => void;
  onFocusDown: () => void;
  onDuplicate: () => void;
  onConfirm: () => void;
  onEnter: () => void; //수정된 내역 저장 후 블록 추가 & 포커싱
}

interface IpreviewModeTool {
  onBackward: () => void;
}

interface IcreateModeTool {
  modeName: string;
  onCreateSingle: () => void; //인자 필요시 수정필요
  onCreatePlural: () => void; //인자 필요시 수정필요
  onCreateDescription: () => void; //인자 필요시 수정필요
}

interface IfocuseModeTool {
  modeName: string;
  onDuplicate: () => void;
  onDelete: () => void;
  onCreateLogic: () => void;
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

interface IsavePreserveTool {
  onBackward: () => void;
  onOption: () => void;
  onNavigateHome: () => void;
  onSave: () => void;
}

interface IclosingTool extends IsingleCaseTool {}

interface IsubmitResetTool {
  buttonText: string;
  onSubmit: () => void;
  onReset: () => void;
}
