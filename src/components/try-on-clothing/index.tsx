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
                // @ts-ignore
                window.toast && window.toast("Insufficient credits, please purchase more.");
                return;
            }

            const data = await response.json();
            data.id && await pollPredictionResult(data.id);
        } catch(e) {
            console.error(e)
        } finally {
            setResultImage("https://via.placeholder.com/400"); // Placeholder for result
            setIsLoading(false);
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
        } else if (['processing', 'starting'].includes(data.status)) {
            setTimeout(() => pollPredictionResult(id), 1000);
        }
      };

    return (
        <section className="mx-auto flex max-w-[1200px] justify-center bg-background py-12 text-foreground dark:bg-[#18181b] dark:text-white">
            <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Person Image Column */}
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        Step 1. Upload a person image <Download className="size-5" />
                    </h2>
                    <Card
                        className={cn(
                            "relative h-96 border-dashed border-gray-200 bg-white dark:border-gray-700 dark:bg-[#232329]",
                            isPersonDragOver && "border-primary ring-2 ring-primary"
                        )}
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, setPersonImage, setIsPersonDragOver)}
                        onDragEnter={e => handleDragEnter(e, setIsPersonDragOver)}
                        onDragLeave={e => handleDragLeave(e, setIsPersonDragOver)}
                    >
                        {personImage ? (
                            <>
                                <img src={personImage} alt="Person" className="size-full rounded-md object-cover" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2 bg-white/80 text-black dark:bg-[#232329]/80 dark:text-white"
                                    onClick={() => setPersonImage(null)}
                                >
                                    <X className="size-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-sm bg-background p-1 text-xs text-muted-foreground dark:bg-[#232329] dark:text-gray-400">
                                    <ImageIcon className="size-3" />
                                    <span>Drag and drop an image here</span>
                                </div>
                                <CardContent className="flex h-full flex-col items-center justify-center gap-1 p-6 text-center text-sm text-muted-foreground dark:text-gray-400">
                                    <Upload className="size-8" />
                                    <span>Drag and drop an image here</span>
                                    <span>- or -</span>
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-primary dark:text-blue-400"
                                        onClick={() => personInputRef.current?.click()}
                                    >
                                        Click to upload
                                    </Button>
                                    <input
                                        type="file"
                                        ref={personInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={e => handleFileSelect(e, setPersonImage)}
                                    />
                                </CardContent>
                            </>
                        )}
                    </Card>
                    <h3 className="text-md font-semibold">Examples</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {personExamples.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Person example ${index + 1}`}
                                className="aspect-square w-full cursor-pointer rounded-md object-cover ring-2 ring-transparent transition hover:ring-primary dark:hover:ring-blue-400"
                                onClick={() => setPersonImage(src)}
                            />
                        ))}
                    </div>
                </div>

                {/* Garment Image Column */}
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        Step 2. Upload a garment image <Download className="size-5" />
                    </h2>
                    <Card
                        className={cn(
                            "relative h-96 border-dashed border-gray-200 bg-white dark:border-gray-700 dark:bg-[#232329]",
                            isGarmentDragOver && "border-primary ring-2 ring-primary"
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
                                    className="size-full rounded-md object-cover"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2 bg-white/80 text-black dark:bg-[#18181b]/80 dark:text-white"
                                    onClick={() => setGarmentImage(null)}
                                >
                                    <X className="size-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-sm bg-background p-1 text-xs text-muted-foreground dark:bg-[#18181b] dark:text-gray-400">
                                    <ImageIcon className="size-3" />
                                    <span>Drag and drop an image here</span>
                                </div>
                                <CardContent className="flex h-full flex-col items-center justify-center gap-1 p-6 text-center text-sm text-muted-foreground dark:text-gray-400">
                                    <Upload className="size-8" />
                                    <span>Drag and drop an image here</span>
                                    <span>- or -</span>
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-primary dark:text-blue-400"
                                        onClick={() => garmentInputRef.current?.click()}
                                    >
                                        Click to upload
                                    </Button>
                                    <input
                                        type="file"
                                        ref={garmentInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={e => handleFileSelect(e, setGarmentImage)}
                                    />
                                </CardContent>
                            </>
                        )}
                    </Card>
                    <h3 className="text-md font-semibold">Examples</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {garmentExamples.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Garment example ${index + 1}`}
                                className="aspect-square w-full cursor-pointer rounded-md object-cover ring-2 ring-transparent transition hover:ring-primary dark:hover:ring-blue-400"
                                onClick={() => setGarmentImage(src)}
                            />
                        ))}
                    </div>
                </div>

                {/* Result Column */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Step 3. Press &quot;Run&quot; to get try-on results</h2>
                    <Card className="h-96 border-dashed border-gray-200 bg-white dark:border-gray-700 dark:bg-[#232329]">
                        <CardContent className="flex h-full items-center justify-center p-0">
                            {isLoading ? (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground dark:text-gray-400">
                                    <Loader2 className="size-12 animate-spin" />
                                    <p>Generating...</p>
                                </div>
                            ) : resultImage ? (
                                <div className="relative flex size-full items-center justify-center">
                                    <img
                                        src={resultImage}
                                        alt="Result"
                                        className="size-full max-h-full max-w-full rounded-md object-cover object-center"
                                        style={{ aspectRatio: '1/1' }}
                                    />
                                    <a
                                        href={resultImage}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute right-2 top-2 z-10"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-white/80 text-black dark:bg-[#232329]/80 dark:text-white"
                                        >
                                            <Download className="size-4" />
                                        </Button>
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground dark:text-gray-400">
                                    <ImageIcon className="mx-auto size-12" />
                                    <p>Result</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <div className="space-y-4 rounded-md border border-gray-200 bg-muted/20 p-4 dark:border-[#232329] dark:bg-[#18181b]/60">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="seed-slider" className="w-12">
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
                                    className="w-24 border-gray-200 bg-white text-black dark:border-[#232329] dark:bg-[#18181b] dark:text-white"
                                    disabled={isRandomSeed}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="random-seed"
                                    checked={isRandomSeed}
                                    onCheckedChange={checked => setIsRandomSeed(!!checked)}
                                />
                                <Label htmlFor="random-seed">Random seed</Label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="seed-used">Seed used</Label>
                            <Input id="seed-used" readOnly value={seedUsed ?? ""} className="border-gray-200 bg-white text-black dark:border-[#232329] dark:bg-[#18181b] dark:text-white" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="response">Response</Label>
                            {/* <Input id="response" readOnly value={response ?? ""} className="bg-white dark:bg-[#18181b] text-black dark:text-white border-gray-200 dark:border-[#232329]" /> */}
                        </div>
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-primary text-white hover:bg-primary/90 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
                        onClick={handleRun}
                        disabled={isLoading || !personImage || !garmentImage}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Run (Cost 10 Credits)"
                        )}
                    </Button>
                </div>
            </div>
        </section>
    );
}
