import { useCallback, useRef } from 'react';
import './styles/global.scss';

import { axiosInstance } from './services/axios';
import { IFile, useFiles } from './hooks/useFiles';
import { FileList } from './modules/FileList';
import { Uploader } from './shared/Uploader/index.';
import { UploaderContainer } from './modules/UploaderContainer';
import { buildFileFormatStructure } from './utils/buildFileFormatStructure';

export function App() {
  const { files, setFiles } = useFiles();
  const queue = useRef<IFile[]>([]);

  const uploadService = useCallback(
    async (file: IFile) => {
      try {
        await axiosInstance.post('/upload_file', file, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: data => {
            setFiles((oldState: IFile[]) => {
              const indexFound = oldState.findIndex(state => state.id === file.id);
              const auxState = [...oldState];
              oldState[indexFound].uploadProgress = Math.round((100 * data.loaded) / data.total);
              return auxState;
            });
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    [setFiles]
  );

  const uploadFiles = useCallback(async () => {
    const firstQueueElement = queue.current[0];
    if (!firstQueueElement) return;
    console.log('🚀 ~ remaining queue => ', queue.current);

    setFiles((oldState: IFile[]) => {
      const indexFound = oldState.findIndex(state => state.id === firstQueueElement.id);
      const auxState = [...oldState];
      oldState[indexFound].uploadStatus = 'uploading';
      return auxState;
    });

    const res = await uploadService(firstQueueElement);

    if (!res) {
      setFiles((oldState: IFile[]) => {
        const indexFound = oldState.findIndex(state => state.id === firstQueueElement.id);
        const auxState = [...oldState];
        oldState[indexFound].canUpload = false;
        oldState[indexFound].errorMessage = 'Upload error';
        return auxState;
      });
    }

    setFiles((oldState: IFile[]) => {
      const indexFound = oldState.findIndex(state => state.id === firstQueueElement.id);
      const auxState = [...oldState];
      oldState[indexFound].uploadStatus = 'uploaded';
      return auxState;
    });

    queue.current.shift();
    uploadFiles();
  }, [setFiles, uploadService]);

  const handleUploadFiles = useCallback(
    async (files: FileList) => {
      const newFiles = buildFileFormatStructure(files);
      setFiles((oldState: IFile[]) => [...oldState, ...newFiles]);
      
      
      const validQueueFiles = newFiles.flatMap(nf => (nf.canUpload ? nf : []));
      
      if (queue.current.length > 0) {
        queue.current = [...queue.current, ...validQueueFiles];
        return;
      }

      queue.current = [...queue.current, ...validQueueFiles];
      await uploadFiles();
    },
    [setFiles, uploadFiles]
  );

  return (
    <UploaderContainer>
      <Uploader handleUploadCallback={files => handleUploadFiles(files)} />
      {!!files.length && <FileList />}
    </UploaderContainer>
  );
}
