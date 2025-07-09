"use client";

import { useState, useRef, useContext } from 'react';
import { useParams } from 'next/navigation';
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";

const TextToSpeechClient = () => {
  const params = useParams();
  const { setShowSignInModal } = useContext(ModalContext);

  const [text, setText] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<string>('en-US-female');
  const [selectedSpeed, setSelectedSpeed] = useState<number>(1.0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const voiceOptions = [
    { value: 'en-US-female', label: 'English (US) - Female', flag: '🇺🇸' },
    { value: 'en-US-male', label: 'English (US) - Male', flag: '🇺🇸' },
    { value: 'en-GB-female', label: 'English (UK) - Female', flag: '🇬🇧' },
    { value: 'zh-CN-female', label: '中文 (普通话) - 女声', flag: '🇨🇳' },
    { value: 'zh-CN-male', label: '中文 (普通话) - 男声', flag: '🇨🇳' },
    { value: 'es-ES-female', label: 'Español - Female', flag: '🇪🇸' },
    { value: 'fr-FR-female', label: 'Français - Female', flag: '🇫🇷' },
    { value: 'de-DE-female', label: 'Deutsch - Female', flag: '🇩🇪' },
    { value: 'ja-JP-female', label: '日本語 - Female', flag: '🇯🇵' },
    { value: 'ko-KR-female', label: '한국어 - Female', flag: '🇰🇷' },
  ];

  const speedOptions = [
    { value: 0.5, label: '0.5x (Slow)' },
    { value: 0.75, label: '0.75x' },
    { value: 1.0, label: '1.0x (Normal)' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x (Fast)' },
    { value: 2.0, label: '2.0x (Very Fast)' },
  ];

  const sampleTexts = [
    'Hello! Welcome to our AI text-to-speech converter. This tool transforms your written words into natural-sounding audio.',
    '您好！欢迎使用我们的AI文本转语音工具。这个工具可以将您的文字转换为自然流畅的语音。',
    'Bonjour! Bienvenue dans notre convertisseur de texte en parole IA. Cet outil transforme vos mots écrits en audio naturel.',
    'Hola! Bienvenido a nuestro convertidor de texto a voz con IA. Esta herramienta transforma tus palabras escritas en audio natural.',
  ];

  const handleTextToSpeech = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert to speech.');
      return;
    }
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const response = await fetch('/api/generate/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          text: text.trim(),
          voice: selectedVoice,
          speed: selectedSpeed,
        }),
      });

      if (response.status === 401) {
        setShowSignInModal(true);
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate speech');
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      if (data.success && data.audioUrl) {
        setResultUrl(data.audioUrl);
        setIsProcessing(false);
        toast.success("Speech generated successfully!");
      } else {
        setError('Failed to generate speech');
        setIsProcessing(false);
      }
    } catch (e) {
      console.error(e);
      setError('Failed to generate speech. Please try again.');
      setIsProcessing(false);
    }
  };


  const handleDownload = async () => {
    if (!resultUrl) return;
    
    try {
      const response = await fetch('/api/image/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: resultUrl }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to download audio: ${response.status}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'generated-speech.mp3';
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Download audio failed, please retry!');
    }
  };

  const handleReset = () => {
    setText('');
    setResultUrl(null);
    setError(null);
  };

  return (
    <section className="relative py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto flex min-h-[600px] max-w-5xl flex-col items-center justify-center">
          <div className="w-full text-center">

            <div className="mb-8">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Text Input Section */}
                <div className="space-y-4">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500"></div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Text Input</h3>
                  </div>
                  
                  <div className="rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={params.locale === 'zh-hans' 
                        ? '在这里输入您想要转换为语音的文字...' 
                        : 'Enter the text you want to convert to speech...'
                      }
                      className="h-40 w-full resize-none border-none bg-transparent p-4 text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-400"
                      maxLength={1000}
                    />
                    <div className="px-4 pb-2 text-right text-sm text-gray-500">
                      {text.length}/1000
                    </div>
                  </div>

                  {/* Voice and Speed Settings */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {params.locale === 'zh-hans' ? '选择声音' : 'Select Voice'}
                      </label>
                      <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className="w-full rounded-xl border border-gray-200/50 bg-white/80 p-3 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600/50 dark:bg-gray-800/80 dark:text-gray-200"
                      >
                        {voiceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.flag} {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {params.locale === 'zh-hans' ? '播放速度' : 'Speech Speed'}
                      </label>
                      <select
                        value={selectedSpeed}
                        onChange={(e) => setSelectedSpeed(Number(e.target.value))}
                        className="w-full rounded-xl border border-gray-200/50 bg-white/80 p-3 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600/50 dark:bg-gray-800/80 dark:text-gray-200"
                      >
                        {speedOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Audio Result Section */}
                <div className="space-y-4">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Generated Audio</h3>
                  </div>
                  
                  <div className="flex h-40 items-center justify-center rounded-2xl border border-gray-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                    {resultUrl ? (
                      <div className="w-full p-4">
                        <audio 
                          ref={audioRef}
                          controls 
                          className="w-full"
                          src={resultUrl}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="mb-2">
                          <svg className="mx-auto size-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142m-5.657-2.121a2 2 0 010-2.829m0 2.829a2 2 0 002.829 0M12 18.5A1.5 1.5 0 1010.5 17v-1.5a1.5 1.5 0 113 0V17a1.5 1.5 0 01-1.5 1.5z" />
                          </svg>
                        </div>
                        <p>{params.locale === 'zh-hans' ? '生成的音频将显示在这里' : 'Generated audio will appear here'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200/50 bg-red-50/80 p-4 text-red-600 backdrop-blur-sm dark:border-red-700/50 dark:bg-red-900/30 dark:text-red-400">
                  <div className="flex items-center gap-2">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button 
                  onClick={handleReset}
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-600 hover:to-gray-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isProcessing}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {params.locale === 'zh-hans' ? '重置' : 'Reset'}
                </button>
                
                <button 
                  onClick={handleTextToSpeech}
                  className={`group flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed ${
                    isProcessing 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }`}
                  disabled={isProcessing || !text.trim()}
                >
                  {isProcessing ? (
                    <>
                      <svg className="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {params.locale === 'zh-hans' ? '生成中...' : 'Generating...'}
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142m-5.657-2.121a2 2 0 010-2.829m0 2.829a2 2 0 002.829 0M12 18.5A1.5 1.5 0 1010.5 17v-1.5a1.5 1.5 0 113 0V17a1.5 1.5 0 01-1.5 1.5z" />
                      </svg>
                      {params.locale === 'zh-hans' ? '生成语音 (3积分)' : 'Generate Speech (3 credits)'}
                    </>
                  )}
                </button>
                
                {resultUrl && (
                  <button 
                    onClick={handleDownload}
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {params.locale === 'zh-hans' ? '下载音频' : 'Download Audio'}
                  </button>
                )}
              </div>
            </div>

            {!text && (
              <div className="mt-12">
                <h4 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {params.locale === 'zh-hans' ? '没有文本？试试这些示例：' : 'No text? Try one of these examples:'}
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sampleTexts.map((sampleText, index) => (
                    <div 
                      key={index}
                      className="group cursor-pointer rounded-2xl border-2 border-gray-200/50 bg-white/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400/80 hover:shadow-lg dark:border-gray-600/50 dark:bg-gray-800/80 dark:hover:border-green-400/80"
                      onClick={() => setText(sampleText)}
                    >
                      <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                        {sampleText}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 rounded-xl border border-gray-200/50 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/60">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {params.locale === 'zh-hans' 
                  ? '使用此工具即表示您同意我们的'
                  : 'By using this tool you agree to our'
                }{' '}
                <a href="#" className="text-green-600 underline hover:text-green-700 dark:text-green-400">
                  {params.locale === 'zh-hans' ? '服务条款' : 'Terms of Service'}
                </a>{' '}
                {params.locale === 'zh-hans' ? '和' : 'and'}{' '}
                <a href="#" className="text-green-600 underline hover:text-green-700 dark:text-green-400">
                  {params.locale === 'zh-hans' ? '隐私政策' : 'Privacy Policy'}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextToSpeechClient;