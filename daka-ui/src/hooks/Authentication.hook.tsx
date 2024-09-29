import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../infrastructure/state/store/Store";

const useAuthentication = () => {
  const accessToken = useSelector(
    (state: StoreData) => state.auth?.token?.accessToken
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return isLoggedIn;
};

export default useAuthentication;
