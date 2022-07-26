import uniqid from 'uniqid';
import { IFile } from '../hooks/useFiles';
import { validFileTypes } from './validFileTypes';

export const buildFileFormatStructure = (files: FileList) => {
  return Array.from(files).map(f => {
    const isFileTypeValid = validFileTypes.includes(f.type);
    const isFileSizeValid = f.size < 2 * 1024 * 2024; // 2MB

    const fileFormat = { file: f, canUpload: true, id: uniqid(), uploadStatus: 'waiting', uploadProgress: 0 };

    if (!isFileTypeValid || !isFileSizeValid) return { ...fileFormat, canUpload: false };
    return { ...fileFormat, canUpload: true };
  }) as IFile[];
};
