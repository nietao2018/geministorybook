import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from "@/env.mjs";

const s3Client = new S3Client({
    region: 'auto',
    endpoint: env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
});

export async function uploadToR2(imageUrl: string, fileName: string): Promise<string> {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();

    await s3Client.send(
        new PutObjectCommand({
            Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: `result/${fileName}`,
            Body: Buffer.from(arrayBuffer),
            ContentType: 'image/png',
        })
    );

    return `${env.CLOUDFLARE_R2_PUBLIC_URL}/result/${fileName}`;
}

export async function uploadBase64ToR2(base64Image: string, fileName: string): Promise<string> {
    try {
        // 处理 base64 图片
        const base64Data = base64Image.split(',')[1] || base64Image;
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // 上传到 R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
                Key: `uploads/${fileName}`,
                Body: Buffer.from(bytes),
                ContentType: 'image/png',
            })
        );

        // 返回可访问的 URL
        return `${env.CLOUDFLARE_R2_PUBLIC_URL}/uploads/${fileName}`;
    } catch (error) {
        console.error('Error uploading base64 to R2:', error);
        throw new Error('Failed to upload base64 image to R2');
    }
}