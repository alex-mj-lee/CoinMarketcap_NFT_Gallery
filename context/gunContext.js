import React, { createContext, useReducer } from "react";
import Gun from "gun";

const gun = Gun(["https://discord-gun-node.herokuapp.com/gun"]);

export const GunContext = createContext();

const initialState = { messages: [] };

const reducer = (state, action) => {
  try {
    if (action.type == "clear") return { messages: [] };
    if (action.type == "deleted") {
      const stateMess = [...state.messages];
      const findIndex = stateMess.indexOf(action.data);
      stateMess.splice(findIndex, 1);
      console.log(stateMess);
      return { messages: [...stateMess] };
    }
    if (action.type == "add") {
      return { messages: [...state.messages, action.data] };
    }
  } catch (error) {
    console.error(error);
  }
};

export const GunProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(typeof state.messages)

  const getMessages = (_name) => {
    const messageRef = gun.get(_name);
    console.log(messageRef);

    messageRef.map().once((message) => {
      dispatch({
        type: "add",
        data: {
          sender: message.sender,
          content: message.content,
          avatar: message.avatar,
          createAt: message.createAt,
          messageId: message.messageId,
          isBullish: message.isBullish,
        },
      });
    });
  };

  const deleteMessage = (content) => {
    const messagesRef = gun.get("GUN_REF_7");
    // messagesRef.unset('GUN_REF_7')
    dispatch({ type: "deleted", data: content });
  };

  return (
    <GunContext.Provider value={{ gun, getMessages, state, deleteMessage }}>
      {children}
    </GunContext.Provider>
  );
};
