import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { IComment, IState } from "../../services/types";

type GlobalContext = {
  isCreated?: number;
  setIsCreated: Dispatch<SetStateAction<number>>;
  isShow: boolean;
  showTab: () => void;
  hideTab: () => void;

  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
};

const UserContext = createContext<GlobalContext>({
  isCreated: 0,
  isShow: true,
  showTab: () => {},
  hideTab: () => {},

  comments: [],
  setComments: () => {},
  setIsCreated: () => {},
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
  const [isCreated, setIsCreated] = useState(0);
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
        isCreated,
        setIsCreated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
