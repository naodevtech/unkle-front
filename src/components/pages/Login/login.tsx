import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import api from "../../../utils/api";
import fieldsOptions from "./fields.json";

import Tooltip from "../../atoms/Tooltip/tooltip";
import Alert from "../../atoms/Alert/alert";

import logo from "../../../assets/logos/logo_unkle_version.svg";
import "./_login.scss";

import {
  authSelector,
  setAuthFailed,
  setAuthSuccess,
} from "../../../store/auth/authSlice";

export interface Field {
  id: number;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  regexp: RegExp | string;
  errorDisplayed: string;
  error: boolean;
}

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState<Field[]>(fieldsOptions);
  const dispatch = useDispatch();
  const { error } = useSelector(authSelector);

  const checkFieldValidity = (currentField: Field, value: string) => {
    const regexp = new RegExp(currentField.regexp);
    if (!regexp.test(value)) {
      setFields(
        fields.map((field) =>
          field.id === currentField.id ? { ...field, error: true } : field
        )
      );
    } else {
      setFields(
        fields.map((field) =>
          field.id === currentField.id ? { ...field, error: false } : field
        )
      );
    }
  };

  const handleChangeValue = (currentField: Field, value: string) => {
    checkFieldValidity(currentField, value);
    switch (currentField.name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const login = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    credentials: Object
  ) => {
    e.preventDefault();
    try {
      const user = await api.post("/login", credentials);
      dispatch(setAuthSuccess(user.data.data));
      navigate(`/dashboard`);
    } catch (error: any) {
      dispatch(setAuthFailed(error.response.data.message));
    }
  };

  return (
    <div className="container_responsive">
      <div className="container_login">
        {error ? (
          <div className="box_alert">
            <Alert type={"error"} message={error} />
          </div>
        ) : null}
        <img src={logo} alt="logo_unkle" />
        <form>
          {fields
            ? fields.map((field) => {
                return (
                  <div className="box_input" key={field.id}>
                    <label className="body-s--light">{field.label}</label>
                    <input
                      className={`input ${
                        field.error
                          ? "input--icon-right--error error-border"
                          : "null"
                      }`}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        handleChangeValue(field, e.target.value);
                      }}
                    />
                    {field.error ? (
                      <Tooltip type={"error"} message={field.errorDisplayed} />
                    ) : null}
                  </div>
                );
              })
            : null}
          <button
            className="btn btn--primary"
            onClick={(e) => login(e, { email, password })}
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
