import { createContext, useContext, useState } from "react";

type GlobalContext = {
  isShow: boolean;
  showTab: () => void;
  hideTab: () => void;
};

const UserContext = createContext<GlobalContext>({
  isShow: true,
  showTab: () => {},
  hideTab: () => {},
});

export const useUser = () => useContext(UserContext);

const UserProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState(true);

  const showTab = () => {
    setIsShow(true);
  };

  const hideTab = () => {
    setIsShow(false);
  };

  return (
    <UserContext.Provider value={{ isShow, showTab, hideTab }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
