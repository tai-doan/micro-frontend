import { Button } from 'antd';
import useHostAppStore from 'host/store'; // Import store từ host-app

const App = () => {
  const { count, increment } = useHostAppStore();

  return (
    <div className='main-app-remote-1' style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Remote App 1</h2>
      <p>Count: {count}</p>
      <Button type="primary" onClick={increment}>Button from App 1</Button>
    </div>
  )
};

export default App;
