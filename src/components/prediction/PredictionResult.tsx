'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PredictionData {
  beforeImageUrl: string;
  afterImageUrl: string;
}

export default function PredictionResult() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`/api/prediction/${id}/get`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch prediction result");
        return res.json();
      })
      .then(result => {
        // 假设API返回 { beforeImageUrl, afterImageUrl }
        setData({
          beforeImageUrl: result?.predictionData?.beforeImage,
          afterImageUrl: result.imageUrl,
        });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-row items-center justify-center gap-8 py-8">
      <div className="flex flex-col items-center">
        <span className="mb-2 font-semibold">Before</span>
        <img src={data.beforeImageUrl} alt="Before" className="max-w-xs rounded shadow" />
      </div>
      <div className="flex flex-col items-center">
        <span className="mb-2 font-semibold">After</span>
        <img src={data.afterImageUrl} alt="After" className="max-w-xs rounded shadow" />
      </div>
    </div>
  );
} 