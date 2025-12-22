import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNav from './src/router/AppStack';

export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
