import { extname } from 'path';

export const mediaFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(mp3|ogg)$/)) {
        return callback(new Error('Invalid media file format!'), false);
    }
    callback(null, true);
};
export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${randomName}${fileExtName}`);
};
