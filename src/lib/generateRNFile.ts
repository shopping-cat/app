import { ReactNativeFile } from 'apollo-upload-client';

const generateRNFile = (uri: string): ReactNativeFile => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    return new ReactNativeFile({
        uri,
        type: `image/${fileType}`,
        name: `userProfile.${fileType}`
    })
}

export default generateRNFile