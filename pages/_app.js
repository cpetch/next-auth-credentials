import '../styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'next-auth/client';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer theme="colored"/>
    </Provider>
  );
}

export default MyApp;
