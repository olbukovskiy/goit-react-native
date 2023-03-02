import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { IComment, IProps, IState } from "../../services/types";

type GlobalContext = {
  isShow: boolean;
  showTab: () => void;
  hideTab: () => void;
  postsState: IProps[];
  setPostsState: Dispatch<SetStateAction<IProps[]>>;
  authState: IState;
  setAuthState: Dispatch<SetStateAction<IState>>;
  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
};

const UserContext = createContext<GlobalContext>({
  isShow: true,
  showTab: () => {},
  hideTab: () => {},
  postsState: [],
  setPostsState: () => {},
  authState: {
    login: "Name Surname",
    email: "email@mail.com",
    password: "hallo",
  },
  setAuthState: () => {},
  comments: [],
  setComments: () => {},
});

export const useUser = () => useContext(UserContext);

const initialState: IProps[] = [
  {
    id: "1",
    img: require("../../assets/images/Rectangle1.png"),
    title: "Forrest",
    comments: [],
    location: "Harkiv",
  },
  {
    id: "2",
    img: require("../../assets/images/Rectangle2.png"),
    title: "Sky",
    comments: [],
    location: "Ternopil",
  },
];

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

const authInitState: IState = {
  login: "Name Surname",
  email: "email@mail.com",
  avatar: require("../../assets/images/User.png"),
  password: "hallo",
};

const UserProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState(true);
  const [postsState, setPostsState] = useState<IProps[]>(initialState);
  const [authState, setAuthState] = useState<IState>(authInitState);
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
        postsState,
        setPostsState,
        authState,
        setAuthState,
        comments,
        setComments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
