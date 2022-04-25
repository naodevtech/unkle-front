import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  authSelector,
  setAuthFailed,
  setAuthSuccess,
} from "../store/auth/authSlice";

import api from "../utils/api";

import Nav from "../components/organisms/Nav/nav";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isAuth } = useSelector(authSelector);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const user = await api.get("/me");
        return dispatch(setAuthSuccess(user.data.data));
      } catch (error: any) {}
    };
    getAuth();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuth) {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      {isAuth ? <Nav /> : null}
      <main>{children}</main>
    </>
  );
};

export default Layout;
