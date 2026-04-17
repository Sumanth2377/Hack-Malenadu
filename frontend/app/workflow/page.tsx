'use client';

import { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import WorkflowBuilder from '@/components/workflow/WorkflowBuilder';

export default function WorkflowPage() {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] -m-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-gray-950 text-gray-400">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading workflow builder...</p>
            </div>
          </div>
        }>
          <WorkflowBuilder />
        </Suspense>
      </div>
    </AppLayout>
  );
}
