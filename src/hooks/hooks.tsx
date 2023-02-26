import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { IProps, IState } from "../../services/types";

type GlobalContext = {
  isShow: boolean;
  showTab: () => void;
  hideTab: () => void;
  postsState: IProps[];
  setPostsState: Dispatch<SetStateAction<IProps[]>>;
  authState: IState;
  setAuthState: Dispatch<SetStateAction<IState>>;
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
});

export const useUser = () => useContext(UserContext);

const initialState: IProps[] = [
  {
    id: "1",
    img: require("../../assets/images/Rectangle1.png"),
    title: "Forrest",
    comments: 100,
    location: "Harkiv",
  },
  {
    id: "2",
    img: require("../../assets/images/Rectangle2.png"),
    title: "Sky",
    comments: 300,
    location: "Ternopil",
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
