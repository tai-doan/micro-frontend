import React, { Suspense } from 'react';
import RemoteApp1Wrapper from './modules/RemoteApp1';
import RemoteApp2Wrapper from './modules/RemoteApp2';

const loadRemoteApp1 = async () => {
  try {
    return await import('remote_app1/App');
  } catch (error) {
    console.error('Failed to load remote app:', error);
    return {
      default: () => <div style={{ color: 'red' }}>Không thể tải remote app!</div>,
    };
  }
};
const loadRemoteApp2 = async () => {
  try {
    return await import('remote_app2/App');
  } catch (error) {
    console.error('Failed to load remote app:', error);
    return {
      default: () => <div style={{ color: 'red' }}>Không thể tải remote app!</div>,
    };
  }
};

const RemoteApp1 = React.lazy(loadRemoteApp1);
const RemoteApp2 = React.lazy(loadRemoteApp2);

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Host App</h1>
      <RemoteApp1Wrapper />
      <RemoteApp2Wrapper />
    </div>
  );
}

export default App;

