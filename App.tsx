import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

import { App } from "./src";
import { store } from "./src/store";

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}
