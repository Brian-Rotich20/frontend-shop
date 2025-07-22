// components/GlobalLoadingBar.jsx
'use client';

import { useGlobalLoading } from '@/context/LoadingContext';

export default function GlobalLoadingBar() {
  const { loading } = useGlobalLoading();

  return (
    loading && (
      <div className="w-full bg-blue-500 h-1 animate-pulse transition-all duration-300" />
    )
  );
}
