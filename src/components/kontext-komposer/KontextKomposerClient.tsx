"use client";

import { useState, useRef, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/shared/icons";

interface EditingSettings {
  prompt: string;
  style: 'photorealistic' | 'artistic' | 'cartoon' | 'cinematic';
  strength: number;
  preserveCharacter: boolean;
  contextAware: boolean;
}

const KontextKomposerClient = () => {
  const params = useParams();
  const { setShowSignInModal } = useContext(ModalContext);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [editingSettings, setEditingSettings] = useState<EditingSettings>({
    prompt: '',
    style: 'photorealistic',
    strength: 0.8,
    preserveCharacter: true,
    contextAware: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(params.locale === 'zh-hans' ? '请选择有效的图片文件' : 'Please select a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(params.locale === 'zh-hans' ? '文件大小不能超过10MB' : 'File size cannot exceed 10MB');
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(params.locale === 'zh-hans' ? '请选择有效的图片文件' : 'Please select a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(params.locale === 'zh-hans' ? '文件大小不能超过10MB' : 'File size cannot exceed 10MB');
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResultUrl(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            if (!file.type.startsWith('image/')) {
              setError(params.locale === 'zh-hans' ? '请选择有效的图片文件' : 'Please select a valid image file');
              return;
            }
            if (file.size > 10 * 1024 * 1024) {
              setError(params.locale === 'zh-hans' ? '文件大小不能超过10MB' : 'File size cannot exceed 10MB');
              return;
            }
            
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
              setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setResultUrl(null);
            setError(null);
          }
          break;
        }
      }
    }
  };

  // Function to poll for prediction results
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
        setResultUrl(data.imageUrl);
        setIsProcessing(false);
        toast.success(params.locale === 'zh-hans' ? '图片编辑完成！' : 'Image editing completed!');
      } else if (data.status === 'failed') {
        setError(params.locale === 'zh-hans' ? '图片处理失败' : 'Image processing failed');
        setIsProcessing(false);
      } else if (['processing', 'starting', 'pending'].includes(data.status)) {
        setTimeout(() => pollPredictionResult(id), 2000);
      }
    } catch (err) {
      console.error('Error polling for result:', err);
      setError(params.locale === 'zh-hans' ? '检查处理状态时出错' : 'Error checking processing status');
      setIsProcessing(false);
    }
  }, [setShowSignInModal, params.locale]);

  const handleEdit = async () => {
    if (!image || !editingSettings.prompt.trim()) {
      setError(params.locale === 'zh-hans' ? '请上传图片并输入编辑提示' : 'Please upload an image and enter editing prompt');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      // Convert image to base64
      let imageBase64 = '';
      if (image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as string);
            } else {
              resolve('');
            }
          };
          reader.readAsDataURL(image);
        });
      }
      
      // Prepare image data, remove base64 prefix
      const imageData = imageBase64.startsWith('data:') ? imageBase64.split(',')[1] : imageBase64;

      // Build enhanced prompt based on settings
      let enhancedPrompt = editingSettings.prompt;
      
      if (editingSettings.style === 'photorealistic') {
        enhancedPrompt = `Create a photorealistic image: ${editingSettings.prompt}`;
      } else if (editingSettings.style === 'artistic') {
        enhancedPrompt = `Create an artistic style image: ${editingSettings.prompt}`;
      } else if (editingSettings.style === 'cartoon') {
        enhancedPrompt = `Create a cartoon style image: ${editingSettings.prompt}`;
      } else if (editingSettings.style === 'cinematic') {
        enhancedPrompt = `Create a cinematic style image: ${editingSettings.prompt}`;
      }

      if (editingSettings.preserveCharacter) {
        enhancedPrompt += '. Preserve the character identity and facial features.';
      }

      if (editingSettings.contextAware) {
        enhancedPrompt += '. Be context-aware and maintain scene coherence.';
      }

      const response = await fetch('/api/replicate/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          input: {
            input_image: `data:image/jpeg;base64,${imageData}`,
            prompt: enhancedPrompt,
            strength: editingSettings.strength,
            guidance_scale: 7.5,
            num_inference_steps: 30,
            safety_check: true
          },
          useCredit: 5,
          model: 'kontextKomposer',
          type: 'model'
        }),
      });

      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }
      
      if (response.status === 201) {
        setError(params.locale === 'zh-hans' ? '积分不足，请购买积分' : 'Insufficient credits, please purchase credits');
        setIsProcessing(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const data = await response.json();
      if (data.id) {
        setPredictionId(data.id);
        await pollPredictionResult(data.id);
      }
    } catch (err) {
      console.error('Edit error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast.error(params.locale === 'zh-hans' ? '处理失败，请重试' : 'Processing failed, please try again');
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (resultUrl) {
      const a = document.createElement('a');
      a.href = resultUrl;
      a.download = `kontext-komposer-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const resetAll = () => {
    setImage(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setError(null);
    setPredictionId(null);
    setIsProcessing(false);
    setEditingSettings({
      prompt: '',
      style: 'photorealistic',
      strength: 0.8,
      preserveCharacter: true,
      contextAware: true
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const examplePrompts = params.locale === 'zh-hans' ? [
    "将背景改为美丽的日落海滩",
    "添加下雪的冬季场景",
    "改变人物的服装为正式西装",
    "将室内场景改为咖啡厅"
  ] : [
    "Change background to beautiful sunset beach",
    "Add snowy winter scenery",
    "Change person's clothing to formal suit",
    "Transform indoor scene to coffee shop"
  ];

  return (
    <section className="relative py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Upload and Settings */}
          <div className="space-y-6">
            {/* Upload Area */}
            <Card className="border-2 border-dashed bg-gradient-to-br">
              <CardContent className="p-8">
                <div
                  className="flex min-h-[300px] flex-col items-center justify-center space-y-4 text-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onPaste={handlePaste}
                  tabIndex={0}
                >
                  {previewUrl ? (
                    <div className="relative w-full max-w-md">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={400}
                        height={300}
                        className="h-auto max-h-[400px] w-full rounded-lg object-contain shadow-lg"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="rounded-full bg-purple-100 p-4">
                        <Icons.image className="size-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {params.locale === 'zh-hans' ? '上传图片开始编辑' : 'Upload Image to Start Editing'}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {params.locale === 'zh-hans' 
                            ? '拖拽文件、粘贴或点击上传。支持 JPG、PNG、WebP 格式'
                            : 'Drag & drop, paste, or click to upload. JPG, PNG, WebP supported'
                          }
                        </p>
                      </div>
                    </>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Icons.upload className="mr-2 size-4" />
                      {params.locale === 'zh-hans' ? '选择文件' : 'Choose File'}
                    </Button>
                    {previewUrl && (
                      <Button
                        onClick={resetAll}
                        variant="outline"
                        className="border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        <Icons.refresh className="mr-2 size-4" />
                        {params.locale === 'zh-hans' ? '重置' : 'Reset'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Editing Settings */}
            {previewUrl && (
              <Card className="border border-purple-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {params.locale === 'zh-hans' ? '编辑设置' : 'Editing Settings'}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Prompt Input */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {params.locale === 'zh-hans' ? '编辑提示 (必填)' : 'Editing Prompt (Required)'}
                      </label>
                      <Textarea
                        value={editingSettings.prompt}
                        onChange={(e) => setEditingSettings({...editingSettings, prompt: e.target.value})}
                        placeholder={params.locale === 'zh-hans' 
                          ? '描述您想要的改变，例如：将背景改为美丽的日落海滩'
                          : 'Describe the changes you want, e.g.: Change background to beautiful sunset beach'
                        }
                        className="min-h-[80px] resize-none"
                      />
                    </div>

                    {/* Example Prompts */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {params.locale === 'zh-hans' ? '示例提示' : 'Example Prompts'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {examplePrompts.map((prompt, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-purple-100 hover:text-purple-700"
                            onClick={() => setEditingSettings({...editingSettings, prompt})}
                          >
                            {prompt}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Style Selection */}
                    <Tabs 
                      value={editingSettings.style} 
                      onValueChange={(value) => setEditingSettings({...editingSettings, style: value as any})}
                    >
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="photorealistic">
                          {params.locale === 'zh-hans' ? '写实' : 'Photo'}
                        </TabsTrigger>
                        <TabsTrigger value="artistic">
                          {params.locale === 'zh-hans' ? '艺术' : 'Art'}
                        </TabsTrigger>
                        <TabsTrigger value="cartoon">
                          {params.locale === 'zh-hans' ? '卡通' : 'Cartoon'}
                        </TabsTrigger>
                        <TabsTrigger value="cinematic">
                          {params.locale === 'zh-hans' ? '电影' : 'Cinema'}
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Result and Controls */}
          <div className="space-y-6">
            {/* Processing Status */}
            {isProcessing && (
              <Card className="border border-purple-200/50 bg-gradient-to-r from-purple-50 to-pink-50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Icons.spinner className="size-5 animate-spin text-purple-600" />
                      <span className="font-medium text-purple-900">
                        {params.locale === 'zh-hans' ? 'FLUX.1 正在处理您的图片...' : 'FLUX.1 is processing your image...'}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div className="h-2.5 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{width: '70%'}}></div>
                    </div>
                    <p className="text-sm text-purple-600">
                      {params.locale === 'zh-hans' 
                        ? '运用先进的上下文感知技术，确保角色一致性'
                        : 'Applying advanced context-aware technology with character consistency'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <Card className="border border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-red-700">
                    <Icons.warning className="size-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Result Display */}
            {resultUrl && (
              <Card className="border border-green-200/50 bg-green-50/50">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {params.locale === 'zh-hans' ? '编辑结果' : 'Editing Result'}
                  </h3>
                  <div className="space-y-4">
                    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={resultUrl}
                        alt="Edited Result"
                        width={500}
                        height={400}
                        className="h-auto max-h-[500px] w-full object-contain"
                      />
                    </div>
                    <Button
                      onClick={downloadResult}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    >
                      <Icons.download className="mr-2 size-4" />
                      {params.locale === 'zh-hans' ? '下载编辑结果' : 'Download Edited Image'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit Button */}
            {previewUrl && !isProcessing && (
              <Button
                onClick={handleEdit}
                disabled={!editingSettings.prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                size="lg"
              >
                <Icons.pencil className="mr-2 size-5" />
                {params.locale === 'zh-hans' ? '开始 AI 编辑' : 'Start AI Editing'}
              </Button>
            )}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-purple-100">
              <Icons.brain className="size-6 text-purple-600" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">
              {params.locale === 'zh-hans' ? '上下文感知' : 'Context-Aware'}
            </h3>
            <p className="text-sm text-gray-600">
              {params.locale === 'zh-hans' 
                ? 'AI 理解图片内容，智能编辑'
                : 'AI understands image content for smart editing'
              }
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-pink-100">
              <Icons.users className="size-6 text-pink-600" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">
              {params.locale === 'zh-hans' ? '角色一致性' : 'Character Consistency'}
            </h3>
            <p className="text-sm text-gray-600">
              {params.locale === 'zh-hans' 
                ? '保持人物特征，确保编辑自然'
                : 'Maintains character features for natural edits'
              }
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-violet-100">
              <Icons.package className="size-6 text-violet-600" />
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">
              {params.locale === 'zh-hans' ? '多模态合成' : 'Multimodal Composition'}
            </h3>
            <p className="text-sm text-gray-600">
              {params.locale === 'zh-hans' 
                ? '结合文本和图像，创造完美效果'
                : 'Combines text and image for perfect results'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KontextKomposerClient;