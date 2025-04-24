import { Suspense } from 'react';
import { useRemoteModuleLoader } from '../utils/useRemoteModuleLoader';

export default function RemoteApp1Wrapper() {
  const { Component, error } = useRemoteModuleLoader(
    'http://localhost:3001/assets/remoteEntry.js',
    () => import('remote_app1/App'),
    3000 // poll mỗi 3s
  );

  if (error) return <div>Không kết nối được với App 1</div>;
  if (!Component) return <div>Đang tải App 1...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
