import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { IntlProvider } from "react-intl";

import French from "./lang/fr.json";
import English from "./lang/en.json";

const locale = navigator.language;

let lang;
if (locale === "en") {
  lang = English;
} else if (locale === "fr") {
  lang = French;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={French}>
          <App />
        </IntlProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
