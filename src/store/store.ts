import { configureStore, createSlice } from "@reduxjs/toolkit";

const template = createSlice({
  name: "template",
  initialState: { templateData: { title: "", description: "" } },
  reducers: {
    setTemplate(state, action) {
      return {
        ...state,
        templateData: { title: action.payload, description: action.payload },
      };
    },
  },
});

export default configureStore({
  reducer: {
    template: template.reducer,
  },
});

export const { setTemplate } = template.actions;
