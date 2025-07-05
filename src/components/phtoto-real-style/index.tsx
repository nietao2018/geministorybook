"use client";
import React, { useRef, useState, useContext, useCallback } from "react";
import { ModalContext } from "@/components/modals/providers";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { toast } from "sonner";

export default function ImageInputAndResult() {
  const { setShowSignInModal } = useContext(ModalContext);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection, reference try-on-clothing implementation
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputImage(URL.createObjectURL(file));
      setResultImage(null); // Clear any previous result image
      setError(null); // Clear any previous errors
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setInputImage(URL.createObjectURL(file));
      setResultImage(null); // Clear any previous result image
      setError(null); // Clear any previous errors
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  // Function to poll for generation results
  const pollPredictionResult = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/prediction/${id}/get`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to get prediction: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'completed' && data.imageUrl) {
        // Generation successful, set result image
        setResultImage(data.imageUrl);
        setLoading(false);
      } else if (data.status === 'failed') {
        // Generation failed
        setError('Image processing failed: ' + (data.error || 'Unknown error'));
        setLoading(false);
      } else if (['processing', 'starting', 'pending'].includes(data.status)) {
        // Continue polling
        setTimeout(() => pollPredictionResult(id), 2000);
      }
    } catch (err) {
      console.error('Error polling for result:', err);
      setError('Error checking processing status');
      setLoading(false);
    }
  }, [setShowSignInModal]);

  const handleGenerate = async () => {
    if (!inputImage) return;

    try {
      setLoading(true);
      setError(null);
      setResultImage(null);

      // Convert URL to base64
      let imageBase64 = inputImage;
      if (inputImage.startsWith('blob:')) {
        // If it's a blob URL, convert to base64
        const response = await fetch(inputImage);
        const blob = await response.blob();
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as string);
            } else {
              resolve(''); // Provide a default value to avoid null
            }
          };
          reader.readAsDataURL(blob);
        });
      }
      
      // Prepare image data, remove base64 prefix
      const imageData = imageBase64.startsWith('data:') ? imageBase64.split(',')[1] : imageBase64;

        // Simulate API call
        const response = await fetch('/api/replicate/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                input: {
                    image: imageData,
                    input_image: `data:image/jpeg;base64,${imageData}`,
                    prompt: 'Convert the picture into a photorealistic image' + prompt
                },
                useCredit: 5,
                model: 'photoRealStyle',
                type: 'model'
            }),
        });

        if (response.status === 401) {
            setShowSignInModal(true);
            return;
        }
        if (response.status === 201) {
            console.error("ad", response.status)
            setLoading(false)
            // @ts-ignore
            toast.error("Insufficient credits, please purchase more.");
            return;
        }

        const data = await response.json();
        data.id && await pollPredictionResult(data.id);
    } catch(e) {
        console.error(e)
    } finally {
    }
  };


  return (
    <section className="relative py-4">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload Image
                </h3>
              </div>
              
              <div 
                className={`relative flex h-[400px] items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all duration-200 ${
                  isDragOver 
                    ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/20' 
                    : 'border-gray-300/60 bg-white/50 hover:border-blue-400/60 hover:bg-blue-50/30 dark:border-gray-500/60 dark:bg-gray-800/50 dark:hover:border-blue-400/60 dark:hover:bg-blue-900/20'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                {inputImage ? (
                  <div className="relative size-full">
                    <img 
                      src={inputImage} 
                      alt="Input image" 
                      className="size-full rounded-lg object-contain" 
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute right-2 top-2 size-8 p-0"
                      onClick={() => {
                        setInputImage(null);
                        setResultImage(null);
                        setError(null);
                        setPrompt("");
                      }}
                    >
                      <Icons.close className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="group flex size-full cursor-pointer flex-col items-center justify-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 transition-colors group-hover:scale-105 dark:from-blue-900/50 dark:to-purple-900/50">
                      <Icons.imageuplus className="size-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="mb-2 font-medium text-gray-900 dark:text-white">
                      Drop image here
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      or click to browse
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Generate Section - Centered */}
          <div className="relative flex min-h-[400px] flex-col items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
            
            <div className="relative z-10 w-full rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              {/* Step 2 Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Transform
                </h3>
              </div>
              
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Custom Style (Optional)
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the style you want (e.g., 'Real human skin')"
                  className="w-full resize-none rounded-xl border border-gray-200/50 bg-white/50 px-4 py-3 text-gray-900 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark:border-gray-600/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-400"
                  rows={3}
                />
              </div>
              
              {/* Preset Prompts */}
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-gray-900 dark:text-white">
                  Quick Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Bokeh background",
                    "Subtle makeup", 
                    "Studio lighting",
                    "Natural outdoor",
                    "High fashion",
                    "Real human skin"
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setPrompt(preset)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        prompt === preset
                          ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                          : 'border-gray-200/50 bg-white/50 text-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-blue-900/30'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleGenerate}
                disabled={!inputImage || loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <Icons.spinner className="size-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Icons.zap className="size-5" />
                    <span>Transform (5 credits)</span>
                  </div>
                )}
              </Button>
              
              {error && (
                <div className="mt-4 rounded-xl border border-red-200/50 bg-red-50/80 p-4 text-red-600 backdrop-blur-sm dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-400">
                  <div className="flex items-center gap-2">
                    <Icons.close className="size-4" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Result
                </h3>
              </div>
              
              <div className="flex h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/60 bg-gray-50/50 p-6 dark:border-gray-600/50 dark:bg-gray-900/50">
                {loading ? (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      <Icons.spinner className="size-8 animate-spin text-white" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900 dark:text-white">Creating portrait...</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Please wait</p>
                    </div>
                  </div>
                ) : resultImage ? (
                  <div className="relative size-full">
                    <img 
                      src={resultImage} 
                      alt="Generated result" 
                      className="size-full rounded-lg object-contain" 
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-2 size-8 bg-white/90 p-0 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = resultImage;
                        link.download = 'photo-real-style-result.jpg';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Icons.image className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      <Icons.image className="size-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900 dark:text-white">Ready</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Upload to start</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
              <Icons.zap className="size-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300">Get your realistic portrait in seconds with our advanced AI technology</p>
          </div>
          
          <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50">
              <Icons.check className="size-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">High Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">Professional-grade results that maintain the essence of your original character</p>
          </div>
          
          <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
              <Icons.shield className="size-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-300">Your images are processed securely and never stored permanently</p>
          </div>
        </div>
      </div>
    </section>
  );
} 