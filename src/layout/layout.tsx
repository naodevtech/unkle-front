import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Nav from "../components/organisms/Nav/nav";
import { setAuthSuccess } from "../store/auth/authSlice";

import api from "../utils/api";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const user = await api.get("/me");
        dispatch(setAuthSuccess(user.data.data));
        return navigate("/dashboard");
      } catch (error: any) {
        return navigate("/login");
      }
    };
    getAuth();
  }, [dispatch, navigate]);

  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
