"use client";

import { useReducer } from 'react';
import Image from 'next/image';
import { FaPen, FaEraser, FaExchangeAlt, FaUpload, FaSpinner } from 'react-icons/fa';
import { useParams } from 'next/navigation';

// Define state types and initial state
type State = {
  count: number;
  brushThickness: number;
  productImage: string;
  targetImage: string;
  generatedImages: string[];
  isGenerating: boolean;
};

const initialState: State = {
  count: 2,
  brushThickness: 50,
  productImage: "",
  targetImage: "",
  generatedImages: [],
  isGenerating: false
};

// Define action types
type Action = 
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_BRUSH_THICKNESS'; payload: number }
  | { type: 'SET_PRODUCT_IMAGE'; payload: string }
  | { type: 'SET_TARGET_IMAGE'; payload: string }
  | { type: 'SET_GENERATED_IMAGES'; payload: string[] }
  | { type: 'SET_IS_GENERATING'; payload: boolean };

// Create reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_BRUSH_THICKNESS':
      return { ...state, brushThickness: action.payload };
    case 'SET_PRODUCT_IMAGE':
      return { ...state, productImage: action.payload };
    case 'SET_TARGET_IMAGE':
      return { ...state, targetImage: action.payload };
    case 'SET_GENERATED_IMAGES':
      return { ...state, generatedImages: action.payload };
    case 'SET_IS_GENERATING':
      return { ...state, isGenerating: action.payload };
    default:
      return state;
  }
}

export default function VirtualFittingClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  
  // 处理图片上传
  const handleProductImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件大小（小于10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert('File size cannot exceed 10MB');
        return;
      }
      
      // 检查文件类型
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Only jpg, jpeg, png, webp formats are supported');
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      dispatch({ type: 'SET_PRODUCT_IMAGE', payload: imageUrl });
    }
  };
  
  // 处理目标图片上传
  const handleTargetImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件大小（小于10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert('File size cannot exceed 10MB');
        return;
      }
      
      // 检查文件类型
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Only jpg, jpeg, png, webp formats are supported');
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      dispatch({ type: 'SET_TARGET_IMAGE', payload: imageUrl });
    }
  };
  
  // Handle image generation
  const handleGenerate = async () => {
    if (!state.productImage || !state.targetImage) {
      alert('Please upload both product and target images');
      return;
    }
    
    try {
      dispatch({ type: 'SET_IS_GENERATING', payload: true });
      
      // Convert images to base64 format
      const productImageBase64 = await getBase64FromUrl(state.productImage);
      const targetImageBase64 = await getBase64FromUrl(state.targetImage);
      
      // 初始化生成请求
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          productImage: productImageBase64,
          targetImage: targetImageBase64,
          count: state.count,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Generation failed');
      }
      
      const data = await response.json();
      
      // 检查是否返回了预测ID或状态URL
      if (data.id || data.statusUrl) {
        // 开始轮询结果
        await pollGenerationResult(data.id || data.statusUrl);
      } else if (data.images) {
        // 如果直接返回了图片，则直接使用
        dispatch({ type: 'SET_GENERATED_IMAGES', payload: data.images });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error during generation:', error);
      alert('Generation failed, please try again');
    } finally {
      dispatch({ type: 'SET_IS_GENERATING', payload: false });
    }
  };
  
  // 轮询生成结果的函数
  const pollGenerationResult = async (idOrUrl: string) => {
    const maxAttempts = 30; // 最大尝试次数
    const interval = 2000; // 轮询间隔（毫秒）
    let attempts = 0;
    
    const checkResult = async () => {
      if (attempts >= maxAttempts) {
        throw new Error('Generation timed out');
      }
      
      attempts++;
      
      try {
        const response = await fetch(`/api/check-generation?id=${idOrUrl}`, {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('Failed to check generation status');
        }
        
        const result = await response.json();
        
        if (result.status === 'succeeded' || result.status === 'completed') {
          // 生成成功，获取图片
          dispatch({ type: 'SET_GENERATED_IMAGES', payload: result.images || result.output });
          return true;
        } else if (result.status === 'failed' || result.status === 'error') {
          throw new Error('Generation failed: ' + (result.error || 'Unknown error'));
        } else {
          // 继续轮询
          return false;
        }
      } catch (error) {
        console.error('Error checking generation status:', error);
        throw error;
      }
    };
    
    // 开始轮询
    return new Promise<void>((resolve, reject) => {
      const poll = async () => {
        try {
          const done = await checkResult();
          if (done) {
            resolve();
          } else {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      poll();
    });
  };
  
  // Convert URL to base64
  const getBase64FromUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="flex flex-1 p-4">
      
        <div className="flex w-1/4 flex-col rounded-lg border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 p-4 shadow-lg">
          <div className="mb-4">
            <h2 className="mb-3 text-2xl font-semibold text-indigo-300">Product Image</h2>
            <p className="mb-3 text-sm text-gray-300">Image format: jpg, jpeg, png, webp; File size: &lt;10MB.</p>
            
            <div className="relative overflow-hidden rounded-lg">
              {state.productImage ? (
                <>
                  <Image 
                    src={state.productImage} 
                    alt="Product image"
                    width={300}
                    height={300}
                    className="w-full"
                  />
                  <label className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-gray-700/80 p-2">
                    <FaExchangeAlt />
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png,.webp" 
                      className="hidden" 
                      onChange={handleProductImageUpload}
                    />
                  </label>
                </>
              ) : (
                <label className="flex h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800 p-8">
                  <FaUpload className="mb-3 text-4xl text-indigo-400" />
                  <span className="text-lg text-gray-300">Click to upload product image</span>
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.webp" 
                    className="hidden" 
                    onChange={handleProductImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
          
          <div className="mb-6 flex gap-2">
            <button className="rounded-md bg-indigo-600 p-3">
              <FaPen className="text-lg text-white" />
            </button>
            <button className="rounded-md bg-gray-800 p-3">
              <FaEraser className="text-lg text-white" />
            </button>
          </div>
          
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-medium text-indigo-200">Brush Thickness</h2>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={state.brushThickness} 
              onChange={(e) => dispatch({ type: 'SET_BRUSH_THICKNESS', payload: Number(e.target.value) })}
              className="w-full accent-indigo-600"
            />
          </div>
          
          <div className="mt-auto">
            <h2 className="mb-2 text-xl font-medium text-indigo-200">Generating Count: <span className="text-white">{state.count}</span></h2>
            <div className="flex flex-col items-center">
              <input 
                type="range" 
                min="1" 
                max="4" 
                value={state.count} 
                onChange={(e) => dispatch({ type: 'SET_COUNT', payload: Number(e.target.value) })}
                className="w-full accent-indigo-600"
              />
              <div className="mt-1 flex w-full justify-between px-2 text-sm text-gray-300">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex w-2/4 flex-col px-4">
          <div className="flex flex-1 flex-col rounded-lg border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-indigo-300">Target Image</h2>
              <button className="flex items-center gap-1 text-sm text-indigo-200 transition-colors hover:text-indigo-100">
                <span>How to draw?</span>
              </button>
            </div>
            
            <div className="relative flex-1 overflow-hidden rounded-lg">
              {state.targetImage ? (
                <>
                  <Image 
                    src={state.targetImage} 
                    alt="Target image"
                    layout="fill"
                    objectFit="cover"
                    className="size-full"
                  />
                  <label className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-gray-700/80 p-2">
                    <FaExchangeAlt />
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png,.webp" 
                      className="hidden" 
                      onChange={handleTargetImageUpload}
                    />
                  </label>
                </>
              ) : (
                <label className="flex h-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800">
                  <FaUpload className="mb-3 text-4xl text-indigo-400" />
                  <span className="text-lg text-gray-300">Click to upload target image</span>
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.webp" 
                    className="hidden" 
                    onChange={handleTargetImageUpload}
                  />
                </label>
              )}
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700">
                Public Templates
              </button>
              <button className="flex-1 rounded-md bg-gray-800 px-4 py-2 font-medium text-gray-200 transition-colors hover:bg-gray-700">
                Upload
              </button>
            </div>
            
            <button 
              className={`mt-4 flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-3 font-semibold text-white ${state.isGenerating ? 'cursor-not-allowed opacity-70' : 'hover:bg-indigo-700'} transition-colors`}
              onClick={handleGenerate}
              disabled={state.isGenerating || !state.productImage || !state.targetImage}
            >
              {state.isGenerating ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <div className="flex items-center gap-1">
                    <FaExchangeAlt className="rotate-90" />
                    <span>{state.count}</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="w-1/4 pl-4">
          <div className="h-full rounded-lg border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 p-4 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-indigo-300">Results</h2>
            
            {state.generatedImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {state.generatedImages.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg">
                    <Image 
                      src={image} 
                      alt={`Generated image ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full"
                    />
                    <a 
                      href={image}
                      download={`generated-image-${index + 1}.png`}
                      className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-gray-700/80 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[calc(100%-2rem)] flex-col items-center justify-center rounded-lg bg-gray-800 p-4">
                <p className="text-center text-gray-400">
                  {state.isGenerating ? 'Generating images...' : 'Click generate button to create new images'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 