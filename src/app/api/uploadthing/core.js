import {createUploadthing} from "uploadthing/next-legacy";
import {UploadThingError} from "uploadthing/server";
import {UserService} from "@/services/user";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
        .onUploadComplete(async ({metadata, file}) => {
            console.log("Загрузка завершена для userId:", metadata.userId);

            console.log("URL файла:", file.ufsUrl);

            return {uploadedBy: metadata.userId, url: file.ufsUrl};
        }),
}