import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import logo from "../../../assets/logos/logo_unkle_version.svg";

import Tooltip from "../../atoms/Tooltip/tooltip";
import "./_login.scss";

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
  const [fields, setFields] = useState<Field[]>([
    {
      id: 0,
      type: "email",
      name: "email",
      label: "Votre adresse e-mail",
      placeholder: "Tapez votre adresse e-mail",
      regexp: /^[a-zA-Z0-9-.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
      errorDisplayed: "Veuillez entrer une adresse e-mail correcte !",
      error: false,
    },
    {
      id: 1,
      type: "password",
      name: "password",
      label: "Votre mot de passe",
      placeholder: "Tapez votre mot de passe",
      regexp: `^.{1,}$`,
      errorDisplayed: "Veuillez entrer votre mot de passe !",
      error: false,
    },
  ]);

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
    credentials: any
  ) => {
    e.preventDefault();
    try {
      await api.post("/login", credentials);
      navigate(`/dashboard`);
    } catch {}
  };

  return (
    <div className="container_responsive">
      <div className="container_login">
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
