import { Suspense } from 'react';
import { useRemoteModuleLoader } from '../utils/useRemoteModuleLoader';

export default function RemoteApp2Wrapper() {
  const { Component, error } = useRemoteModuleLoader(
    'http://localhost:3002/assets/remoteEntry.js',
    () => import('remote_app2/App'),
    3000 // poll mỗi 3s
  );

  if (error) return <div>Không kết nối được với App 2</div>;
  if (!Component) return <div>Đang tải App 2...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
