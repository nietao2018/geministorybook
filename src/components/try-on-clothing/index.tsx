"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Download, ImageIcon, Loader2, Upload, X } from "lucide-react";
import React, { useRef, useState, useContext } from "react";
import { ModalContext } from "@/components/modals/providers";
import { toast } from "sonner";

const personExamples = [

    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/01.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/02.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/03.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/04.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/05.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/06.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/07.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/08.png"
];

const garmentExamples = [
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-01.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-02.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-03.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-04.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-05.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-06.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-07.png",
    "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/sample-08.png"
];

export default function TryOnClothing() {
    const { setShowSignInModal } = useContext(ModalContext);

    const [personImage, setPersonImage] = useState<string | null>(null);
    const [isPersonDragOver, setIsPersonDragOver] = useState(false);
    const personInputRef = useRef<HTMLInputElement>(null);

    const [garmentImage, setGarmentImage] = useState<string | null>(null);
    const [isGarmentDragOver, setIsGarmentDragOver] = useState(false);
    const garmentInputRef = useRef<HTMLInputElement>(null);

    const [seed, setSeed] = useState(0);
    const [isRandomSeed, setIsRandomSeed] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [seedUsed, setSeedUsed] = useState<number | null>(null);
    // const [response, setResponse] = useState<string>("");

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        setImage: (url: string) => void,
        setDragOver: (isOver: boolean) => void,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, setDragOver: (isOver: boolean) => void) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, setDragOver: (isOver: boolean) => void) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    const handleRun = async () => {
        if (!personImage || !garmentImage) {
            return;
        }
        setIsLoading(true);
        setResultImage(null);

        try {
            // Simulate API call
            const response = await fetch('/api/replicate/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    input: {
                        human_img: personImage,
                        garm_img: garmentImage,
                        garment_des: ''
                    },
                    useCredit: 10,
                    model: 'tryClothing'
                }),
            });

            if (response.status === 401) {
                setShowSignInModal(true);
                return;
            }
            if (response.status === 201) {
                console.error("ad", response.status)

                // @ts-ignore
                toast.error("Insufficient credits, please purchase more.");
                return;
            }

            const data = await response.json();
            data.id && await pollPredictionResult(data.id);
        } catch(e) {
            console.error(e)
        } finally {
            setResultImage("https://via.placeholder.com/400"); // Placeholder for result
        }
    };

    const pollPredictionResult = async (id: string) => {
        const response = await fetch(`/api/prediction/${id}/get`, {
            method: 'GET',
            credentials: 'include',
        });
          
        const data = await response.json();
          
        if (response.ok && data.status === 'completed' && data.imageUrl) {
            setResultImage(data.imageUrl);
            setIsLoading(false);
        } else if (['processing', 'starting'].includes(data.status)) {
            setTimeout(() => pollPredictionResult(id), 1000);
        }
      };

    return (
        <section className="relative py-4">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Person Image Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Upload Person Image
                            </h3>
                        </div>
                        
                        <Card
                            className={cn(
                                "relative h-96 border-2 border-dashed border-gray-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 dark:border-gray-600/50 dark:bg-gray-800/80",
                                isPersonDragOver && "border-blue-400 shadow-lg ring-2 ring-blue-400/50"
                            )}
                            onDragOver={handleDragOver}
                            onDrop={e => handleDrop(e, setPersonImage, setIsPersonDragOver)}
                            onDragEnter={e => handleDragEnter(e, setIsPersonDragOver)}
                            onDragLeave={e => handleDragLeave(e, setIsPersonDragOver)}
                        >
                            {personImage ? (
                                <>
                                    <img src={personImage} alt="Person" className="size-full rounded-lg object-cover" />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-2 bg-white/90 text-gray-800 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:text-white"
                                        onClick={() => setPersonImage(null)}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </>
                            ) : (
                                <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                                    <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                                        <Upload className="size-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-gray-600 dark:text-gray-300">Drag & drop your image here</p>
                                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">or</p>
                                        <Button
                                            variant="outline"
                                            className="border-gray-200/50 bg-white/50 backdrop-blur-sm hover:bg-blue-50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:hover:bg-blue-900/20"
                                            onClick={() => personInputRef.current?.click()}
                                        >
                                            Choose File
                                        </Button>
                                        <input
                                            type="file"
                                            ref={personInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={e => handleFileSelect(e, setPersonImage)}
                                        />
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                        
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Example Images</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {personExamples.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Person example ${index + 1}`}
                                        className="aspect-square w-full cursor-pointer rounded-lg border-2 border-transparent object-cover transition-all duration-200 hover:scale-105 hover:border-blue-400"
                                        onClick={() => setPersonImage(src)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Garment Image Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Upload Garment Image
                            </h3>
                        </div>
                        
                        <Card
                            className={cn(
                                "relative h-96 border-2 border-dashed border-gray-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 dark:border-gray-600/50 dark:bg-gray-800/80",
                                isGarmentDragOver && "border-purple-400 shadow-lg ring-2 ring-purple-400/50"
                            )}
                            onDragOver={handleDragOver}
                            onDrop={e => handleDrop(e, setGarmentImage, setIsGarmentDragOver)}
                            onDragEnter={e => handleDragEnter(e, setIsGarmentDragOver)}
                            onDragLeave={e => handleDragLeave(e, setIsGarmentDragOver)}
                        >
                            {garmentImage ? (
                                <>
                                    <img
                                        src={garmentImage}
                                        alt="Garment"
                                        className="size-full rounded-lg object-cover"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-2 bg-white/90 text-gray-800 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:text-white"
                                        onClick={() => setGarmentImage(null)}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </>
                            ) : (
                                <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                                    <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
                                        <Upload className="size-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-gray-600 dark:text-gray-300">Drag & drop your garment here</p>
                                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">or</p>
                                        <Button
                                            variant="outline"
                                            className="border-gray-200/50 bg-white/50 backdrop-blur-sm hover:bg-purple-50 dark:border-gray-600/50 dark:bg-gray-800/50 dark:hover:bg-purple-900/20"
                                            onClick={() => garmentInputRef.current?.click()}
                                        >
                                            Choose File
                                        </Button>
                                        <input
                                            type="file"
                                            ref={garmentInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={e => handleFileSelect(e, setGarmentImage)}
                                        />
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                        
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Example Garments</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {garmentExamples.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Garment example ${index + 1}`}
                                        className="aspect-square w-full cursor-pointer rounded-lg border-2 border-transparent object-cover transition-all duration-200 hover:scale-105 hover:border-purple-400"
                                        onClick={() => setGarmentImage(src)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Result Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Try-On Result
                            </h3>
                        </div>
                        
                        <Card className="h-96 border-2 border-dashed border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                            <CardContent className="flex h-full items-center justify-center p-0">
                                {isLoading ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                            <Loader2 className="size-8 animate-spin text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Generating...</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">This may take a few moments</p>
                                        </div>
                                    </div>
                                ) : resultImage ? (
                                    <div className="relative size-full">
                                        <img
                                            src={resultImage}
                                            alt="Result"
                                            className="size-full rounded-lg object-cover"
                                        />
                                        <a
                                            href={resultImage}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute right-2 top-2"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-white/90 text-gray-800 shadow-lg hover:bg-white dark:bg-gray-800/90 dark:text-white"
                                            >
                                                <Download className="size-4" />
                                            </Button>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                            <ImageIcon className="size-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">Result will appear here</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        
                        {/* Settings Panel */}
                        <div className="space-y-6 rounded-2xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h4>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="seed-slider" className="w-12 text-sm font-medium">
                                        Seed
                                    </Label>
                                    <Slider
                                        id="seed-slider"
                                        value={[seed]}
                                        onValueChange={value => setSeed(value[0])}
                                        max={100000}
                                        step={1}
                                        className="flex-1"
                                        disabled={isRandomSeed}
                                    />
                                    <Input
                                        id="seed-value"
                                        type="number"
                                        value={seed}
                                        onChange={e => setSeed(Number(e.target.value))}
                                        className="w-24 border-gray-200/50 bg-white/50 dark:border-gray-600/50 dark:bg-gray-800/50"
                                        disabled={isRandomSeed}
                                    />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="random-seed"
                                        checked={isRandomSeed}
                                        onCheckedChange={checked => setIsRandomSeed(!!checked)}
                                    />
                                    <Label htmlFor="random-seed" className="text-sm">Random seed</Label>
                                </div>
                            </div>
                            
                            {seedUsed && (
                                <div className="space-y-2">
                                    <Label htmlFor="seed-used" className="text-sm font-medium">Seed used</Label>
                                    <Input 
                                        id="seed-used" 
                                        readOnly 
                                        value={seedUsed ?? ""} 
                                        className="border-gray-200/50 bg-gray-50 dark:border-gray-600/50 dark:bg-gray-700/50" 
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Run Button */}
                        <Button
                            size="lg"
                            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={handleRun}
                            disabled={isLoading || !personImage || !garmentImage}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 size-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Run Try-On (10 Credits)"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
