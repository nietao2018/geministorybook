import React from 'react';
import { getPredictionsByUserId } from '@/supabase/predictions';
import { auth } from '@/auth';

export default async function PredictionDashboardPage() {
  // Get current logged-in user
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Please log in first</div>;
  }

  // Get all predictions for this user
  const predictions = await getPredictionsByUserId(userId);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">My Image Generation Records</h1>
      {predictions.length === 0 ? (
        <div>No generation records</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {predictions.map((item) => (
            <div key={item.id} className="rounded border p-2 shadow">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt="Generated image" className="h-48 w-full rounded object-cover" />
              ) : (
                <div className="flex h-48 items-center justify-center text-gray-400">No image</div>
              )}
              <div className="mt-2 text-xs text-gray-500">{item.createdAt?.toLocaleString?.() || String(item.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
