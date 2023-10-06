"use client";
import React, { createContext, useContext, useReducer } from "react";

interface Alert {
  type: string;
  message: string;
}

interface UiContextType {
  alert: Alert;
  dispatch: React.Dispatch<Action>;
}

const initialState: UiContextType = {
  alert: { type: "", message: "" },
  dispatch: () => undefined,
};

type Action = { type: "SET_ALERT"; payload: Alert } | { type: "CLEAR_ALERT" };

const uiReducer = (state: UiContextType, action: Action): UiContextType => {
  switch (action.type) {
    case "SET_ALERT":
      return { ...state, alert: action.payload };
    case "CLEAR_ALERT":
      return { ...state, alert: { type: "", message: "" } };
    default:
      return state;
  }
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export const useUiContext = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUiContext must be used within a UiContextProvider");
  }
  return context;
};

interface UiContextProviderProps {
  children: React.ReactNode;
}

export const UiContextProvider: React.FC<UiContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UiContext.Provider value={{ alert: state.alert, dispatch }}>
      {children}
    </UiContext.Provider>
  );
};
