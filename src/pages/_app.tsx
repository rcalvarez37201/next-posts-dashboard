import NotificationSystem from "@/components/NotificationSystem";
import ThemeProvider from "@/components/ThemeProvider";
import { store } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
        <NotificationSystem />
      </ThemeProvider>
    </Provider>
  );
}
