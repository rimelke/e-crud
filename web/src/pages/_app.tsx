import '../styles/global.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../contexts/AuthContext'

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
    <ToastContainer />
  </AuthProvider>
)

export default App
