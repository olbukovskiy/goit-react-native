import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { IComment } from "../../services/types";

type GlobalContext = {
  isShow: boolean;
  showTab: () => void;
  hideTab: () => void;

  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
};

const UserContext = createContext<GlobalContext>({
  isShow: true,
  showTab: () => {},
  hideTab: () => {},

  comments: [],
  setComments: () => {},
});

export const useUser = () => useContext(UserContext);

const initialComments: IComment[] = [
  {
    id: "1",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "2",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "3",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "4",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "5",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "6",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "7",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
  {
    id: "8",
    author: "name",
    content: "loremloremdqdqwdqwdqwdqwdqwdqwdqwd",
    posted: "1.1.2011",
  },
];

const UserProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState(true);
  const [comments, setComments] = useState(initialComments);

  const showTab = () => {
    setIsShow(true);
  };

  const hideTab = () => {
    setIsShow(false);
  };

  return (
    <UserContext.Provider
      value={{
        isShow,
        showTab,
        hideTab,

        comments,
        setComments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
