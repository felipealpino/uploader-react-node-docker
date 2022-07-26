import React, { createContext, ReactNode, useContext, useState } from 'react';
export interface IFile {
  id: string;
  file: File;
  uploadStatus?: 'waiting' | 'uploading' | 'uploaded';
  uploadProgress: number;
  canUpload: boolean;
  errorMessage?: string;
}

export type IFileContextData = {
  files: IFile[];
  setFiles: (files: any) => void;
};

const FilesContext = createContext<IFileContextData>({} as IFileContextData);

const FilesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<IFile[]>([]);

  return <FilesContext.Provider value={{ setFiles, files }}>{children}</FilesContext.Provider>;
};

function useFiles() {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error('useFiles must be used within a FilesProvider');
  }

  return context;
}

export { FilesProvider, useFiles };
