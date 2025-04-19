import {generateReactHelpers, generateUploadButton, generateUploadDropzone} from "@uploadthing/react";

export const UploadButton = generateUploadButton()
export const UploadDropzone = generateUploadDropzone()
export const Helpers = generateReactHelpers()

const avatarButtonStyles = {
    container: 'flex justify-center',
    button:
        'w-32 h-32 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition shadow border border-gray-300 flex items-center justify-center text-sm whitespace-pre-line overflow-hidden',
}

export function AvatarUploadButton(props) {
    return (
        <UploadButton
            {...props}
            appearance={avatarButtonStyles}
            content={{
                button({ready}) {
                    return ready ? 'Загрузить\nаватар' : 'Загрузка...'
                },
            }}
        />
    )
}

