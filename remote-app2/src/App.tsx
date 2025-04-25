import { Alert } from 'antd';
import useHostAppStore from 'host/store'; // Import store từ host-app

const App = () => {
  const { count } = useHostAppStore();
  return (
    <div className='main-app-remote-2' style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Remote App 2</h2>
      <Alert message={`Alert from App ${count}`} type="success" />
    </div>
  )
};

export default App;
