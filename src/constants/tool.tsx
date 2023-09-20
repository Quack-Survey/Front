const IMAGE_TOOLBAR = {
  initial: ["접기", "미리보기", "섹션", "사진", "텍스트"],
  clicked: ["랜덤", "쿼터", "접기"],
  type: [
    ["복제", "아래", "위"],
    ["엔터", "확정"],
  ],
};

const FUNCTION_TOOLBAR = {
  initial: [
    "onCreateText",
    "onCreateImage",
    "onCreateSection",
    "onCreatePreview",
    "onFoldingAll",
  ],
  clicked: ["onRandomize", "onFolding", "onSettingQuater"],
  type: ["onFocusAbove", "onfocusBelow", "onAddBlock", "onConfirm", "onEnter"],
};

export { IMAGE_TOOLBAR, FUNCTION_TOOLBAR };
