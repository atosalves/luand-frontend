import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
    region: "us-east-2",
    credentials: {
        accessKeyId: "AKIAWX2IFQ5D4NEEDJUW",
        secretAccessKey: "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",
    },
});

export async function uploadImage(fileName: string, bufferedImage: ArrayBuffer, type: string) {
    await s3.putObject({
        Bucket: "luand",
        Key: fileName,
        Body: await Buffer.from(bufferedImage),
        ContentType: type,
    });
}
export async function deleteImage(fileName: string) {
    await s3.deleteObject({
        Bucket: "luand",
        Key: fileName,
    });
}
