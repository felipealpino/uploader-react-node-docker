import uniqid from 'uniqid';
import { IFile } from '../hooks/useFiles';
import { FILE_TYPES_CONSTRAINTS } from './fileTypesConstraints';

export const buildFileFormatStructure = (files: FileList) => {
  return Array.from(files).map(f => {
    const isFileTypeValid = FILE_TYPES_CONSTRAINTS.includes(f.type);
    const isFileSizeValid = f.size < 2 * 1024 * 2024; // 2MB

    const fileFormat = { file: f, id: uniqid(), uploadStatus: 'waiting', uploadProgress: 0 };

    if (!isFileSizeValid) return { ...fileFormat, canUpload: false, errorMessage: 'Invalid max size' };
    if (!isFileTypeValid) return { ...fileFormat, canUpload: false, errorMessage: 'Invalid file format' };

    return { ...fileFormat, canUpload: true };
  }) as IFile[];
};
