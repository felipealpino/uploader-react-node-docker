import React, { useCallback, useMemo } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import { MdError, MdCheckCircle } from 'react-icons/md';
import filesize from 'filesize';

import styles from './styles.module.scss';

import { IFile, useFiles } from '../../hooks/useFiles';

const FileList: React.FC = () => {
  const { files, setFiles } = useFiles();

  const removeFile = useCallback(
    (idToRemove: string) => {
      setFiles((oldState: IFile[]) => {
        return oldState.filter(file => file.id !== idToRemove);
      });
    },
    [setFiles]
  );

  const hideAllFilesUploaded = useCallback(() => {
    setFiles((oldState: IFile[]) => {
      return oldState.flatMap(os => (os.uploadStatus === 'uploaded' ? [] : os));
    });
  }, [setFiles]);

  const containsUploadedFiles = useMemo(() => {
    return !!files.find(f => f.uploadStatus === 'uploaded');
  }, [files]);

  return (
    <div className={styles.filesToUploadContainer}>
      {containsUploadedFiles && (
        <div className={`${styles.hide} ${styles.all}`} onClick={hideAllFilesUploaded}>
          Hide uploaded files
        </div>
      )}

      {files.map((f, i) => (
        <li className={styles.imageContainer} key={i}>
          <div className={styles.containerLeft}>
            <img width={100} height={100} src={URL.createObjectURL(f.file)} alt={f.file.name} />
            <div>
              <span className={styles.fileName}>{f.file.name}</span>
              <span className={styles.fileSize}>{filesize(f.file.size)}</span>
              {(f.uploadStatus === 'uploaded' || !f.canUpload) && (
                <span className={styles.hide} onClick={() => removeFile(f.id)}>
                  Ocultar
                </span>
              )}
            </div>
          </div>
          <div className={styles.containerRight}>
            {f.canUpload && f.uploadStatus === 'uploading' && (
              <CircularProgressbar
                styles={{ root: { width: 24 }, path: { stroke: '#29292e' } }}
                strokeWidth={10}
                value={f.uploadProgress}
              />
            )}

            {f.canUpload && f.uploadStatus === 'uploaded' && <MdCheckCircle size={24} color="#78e5d5" />}

            {!f.canUpload && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </div>
  );
};

export { FileList };
