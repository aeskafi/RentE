'use client';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center flex-col space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Initializing discovery engine...</p>
    </div>
  )
});

export default LeafletMap;
