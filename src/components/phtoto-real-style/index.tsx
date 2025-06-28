"use client";
import React, { useRef, useState, useContext, useCallback } from "react";
import { ModalContext } from "@/components/modals/providers";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

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

  // Generate button logic
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

      // Call API to generate image
      const response = await fetch('/api/generate/photo-real-style', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          image: imageData,
          prompt: prompt || undefined,
        }),
      });

      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Image processing failed.');
      }
      
      const data = await response.json();
      setPredictionId(data.id);
      
      if (data.id) {
        // Start polling for results
        await pollPredictionResult(data.id);
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError((err as Error).message || 'An unknown error occurred during image processing.');
      setResultImage(null);
    } finally {
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="space-y-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                1
              </div>
              <h2 className="text-xl font-semibold text-foreground">Upload</h2>
            </div>
            
            <div 
              className={`relative flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all duration-200 ${
                isDragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
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
                    className="size-full rounded-md object-contain" 
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
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                    <Icons.imageuplus className="size-8 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <span className="mb-2 font-medium text-foreground">
                    Drop image here
                  </span>
                  <span className="text-sm text-muted-foreground">
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

          {/* Generate Button - Centered and Elevated */}
          <div className="relative flex min-h-[400px] flex-col items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-border"></div>
            </div>
            
            {/* Step 2 Header */}
            <div className="mb-4 text-center">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                2
              </div>
              <h3 className="text-lg font-semibold text-foreground">Transform</h3>
            </div>
            
            <div className="relative z-10 flex h-[400px] flex-col justify-center rounded-xl border bg-background px-6 py-4 shadow-sm">
              {/* Prompt Input */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Custom Style (Optional)
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the style you want (e.g., 'Real human skin')"
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-4 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                />
              </div>
              
              {/* Preset Prompts */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-foreground">
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
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        prompt === preset
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button
                size="lg"
                className="w-full px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
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
                    <span>Transform</span>
                  </div>
                )}
              </Button>
              
              {error && (
                <div className="mt-4 max-w-xs rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-center text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                3
              </div>
              <h2 className="text-xl font-semibold text-foreground">Result</h2>
            </div>
            
            <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border p-6">
              {loading ? (
                <div className="space-y-4 text-center">
                  <Icons.spinner className="mx-auto size-8 animate-spin text-primary" />
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Creating portrait...</p>
                    <p className="text-sm text-muted-foreground">Please wait</p>
                  </div>
                </div>
              ) : resultImage ? (
                <div className="relative size-full">
                  <img 
                    src={resultImage} 
                    alt="Generated result" 
                    className="size-full rounded-md object-contain" 
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-2 size-8 p-0"
                    onClick={() => {
                      // Download functionality
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
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
                    <Icons.image className="size-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Ready</p>
                    <p className="text-sm text-muted-foreground">Upload to start</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-4 rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Icons.zap className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground">Get your realistic portrait in seconds with our advanced AI technology</p>
          </div>
          
          <div className="space-y-4 rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Icons.check className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">High Quality</h3>
            <p className="text-muted-foreground">Professional-grade results that maintain the essence of your original character</p>
          </div>
          
          <div className="space-y-4 rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Icons.shield className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Secure & Private</h3>
            <p className="text-muted-foreground">Your images are processed securely and never stored permanently</p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
} 