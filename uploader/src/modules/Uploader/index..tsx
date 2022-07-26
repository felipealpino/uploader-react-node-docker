import React, { useCallback, useState } from 'react';

import styles from './styles.module.scss';

interface IUploader {
  handleUploadCallback: (files: FileList) => void;
}

const Uploader: React.FC<IUploader> = ({ handleUploadCallback }) => {
  const [dragActive, setDragActive] = useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // triggers when file is selected with click
  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // triggers when file is dropped
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
      if (!event.dataTransfer.files || !event.dataTransfer.files[0]) return;
      handleUploadCallback(event.dataTransfer.files);
    },
    [handleUploadCallback]
  );

  // triggers when file is selected with click
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!event.target.files || !event.target.files[0]) return;
      handleUploadCallback(event.target.files);
    },
    [handleUploadCallback]
  );

  return (
    <div className={`${styles.containerUploader} container`}>
      <div className={styles.fileUploadContainer} onDragEnter={event => handleDrag(event)}>
        <input
          multiple
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          accept="image/jpeg, image/jpg, image/png"
          onChange={event => handleChange(event)}
        />

        <label
          className={`${styles.labelFileUpload} ${dragActive ? styles.dragActive : ''}`}
          htmlFor="input-file-upload"
        >
          <div>
            <p>Drag and drop your files here or</p>
            <button className={styles.uploadButton} onClick={onButtonClick}>
              Upload a file
            </button>
            <p>Valid formats: .jpeg, .pjpeg .png .gif</p>
            <p>Max Size: 2MB</p>
          </div>
        </label>

        {dragActive && (
          <div
            className={styles.dragFileElement}
            onDrop={event => handleDrop(event)}
            onDragEnter={event => handleDrag(event)}
            onDragLeave={event => handleDrag(event)}
            onDragOver={event => handleDrag(event)}
          ></div>
        )}
      </div>
    </div>
  );
};

export { Uploader };
