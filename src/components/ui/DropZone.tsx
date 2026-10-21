'use client';

import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import styles from './DropZone.module.css';
import { IconUpload } from '@/components/icons';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: string[];
  acceptedDescription?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  label?: string;
}

export function DropZone({
  onFilesSelected,
  acceptedFileTypes,
  acceptedDescription = 'Select or drop files here',
  multiple = false,
  maxSizeMB = 50,
  label,
}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndPassFiles = (files: FileList | File[]) => {
    setErrorMessage(null);
    if (files.length > 100) {
      setErrorMessage('Security limit: Maximum 100 files allowed per batch to preserve device stability.');
      return;
    }
    const validFiles: File[] = [];
    const maxBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const matchesType = acceptedFileTypes.some((type) => {
          if (type.endsWith('/*')) {
            const prefix = type.replace('/*', '');
            return file.type.startsWith(prefix);
          }
          return file.type === type;
        });

        // Also check file extension fallback
        const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
        const matchesExt = acceptedFileTypes.some((type) => type.toLowerCase() === fileExt);

        if (!matchesType && !matchesExt && file.type !== '') {
          setErrorMessage(`Unsupported format: ${file.name}. Expected ${acceptedDescription}`);
          return;
        }
      }

      if (file.size > maxBytes) {
        setErrorMessage(`File exceeds ${maxSizeMB}MB limit: ${file.name}. Please select a smaller file.`);
        return;
      }

      validFiles.push(file);
      if (!multiple) break;
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFiles(e.target.files);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const file = items[i].getAsFile();
          if (file) pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        validateAndPassFiles(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div
      className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label || 'File upload dropzone'}
    >
      <input
        ref={inputRef}
        type="file"
        className={styles.inputHidden}
        accept={acceptedFileTypes ? acceptedFileTypes.join(',') : undefined}
        multiple={multiple}
        onChange={handleInputChange}
      />
      <div className={styles.iconWrapper}>
        <IconUpload size={28} />
      </div>
      <div className={styles.title}>{label || 'Click to upload or drag and drop'}</div>
      <div className={styles.subtitle}>{acceptedDescription}</div>
      <div className={styles.pasteHint}>Ctrl+V or Cmd+V to paste from clipboard</div>

      {errorMessage && <div className={styles.errorBanner}>{errorMessage}</div>}
    </div>
  );
}
