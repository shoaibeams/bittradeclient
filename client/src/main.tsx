import * as ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";

import App from "./containers/App";
import store from "./store/store";
import history from "./shared/history";

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>
    , window.document.getElementById("root")
);