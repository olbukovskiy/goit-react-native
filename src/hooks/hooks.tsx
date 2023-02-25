import { createContext, useContext, useState } from "react";
import { IProps } from "../../services/types";

type GlobalContext = {
  isShow: boolean;
  showTab: () => void;
  hideTab: () => void;
  postsState: IProps[];
  setPostsState: any;
};

const UserContext = createContext<GlobalContext>({
  isShow: true,
  showTab: () => {},
  hideTab: () => {},
  postsState: [],
  setPostsState: () => {},
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

const UserProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState(true);
  const [postsState, setPostsState] = useState<IProps[]>(initialState);

  const showTab = () => {
    setIsShow(true);
  };

  const hideTab = () => {
    setIsShow(false);
  };

  return (
    <UserContext.Provider
      value={{ isShow, showTab, hideTab, postsState, setPostsState }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
