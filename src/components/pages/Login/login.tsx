import React from "react";

import logo from "../../../assets/logos/logo_unkle_version.svg";
import "./_login.scss";

function Login() {
  return (
    <div className="container_responsive">
      <div className="container_login">
        <img src={logo} alt="logo_unkle" />
        <form>
          <div className="box_input">
            <label className="body-s--light">Votre adresse e-mail</label>
            <input
              className="input"
              type="email"
              placeholder="Tapez votre adresse e-mail"
            />
          </div>
          <div className="box_input">
            <label className="body-s--light">Mot de passe</label>
            <input
              className="input"
              type="password"
              placeholder="Tapez votre mot de passe"
            />
          </div>
          <button className="btn btn--primary">Connexion</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
