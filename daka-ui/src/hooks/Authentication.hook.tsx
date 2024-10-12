import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../infrastructure/state/store/Store";
import { UserState } from "../model/user/UserState";

const useAuthentication = () => {
  const accessToken = useSelector(
    (state: StoreData) => state.auth?.token?.accessToken
  );
  const userState = useSelector((state: StoreData) => state.auth?.user?.state);

  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
  const [isActive, setIsActive] = useState(
    !!userState && UserState.ACTIVE === userState
  );

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
    setIsActive(!!userState && UserState.ACTIVE === userState);
  }, [accessToken, userState]);

  return { isLoggedIn, isActive };
};

export default useAuthentication;
