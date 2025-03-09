import '../src/index.css';
import { Provider } from 'react-redux';
import { store, wrapper } from '@/store'; // adj
import { ThemeProvider } from '@/context/ThemeContext'; // adj
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);