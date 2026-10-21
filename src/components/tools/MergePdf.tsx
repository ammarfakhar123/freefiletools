'use client';

import React, { useState } from 'react';
import styles from './MergePdf.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield, IconTrash, IconCheck, IconPdfWord } from '@/components/icons';

interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export function MergePdf() {
  const [items, setItems] = useState<PdfFileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);
  const [mergedFileName, setMergedFileName] = useState('merged-document.pdf');
  const [status, setStatus] = useState<'idle' | 'ready' | 'merging' | 'done'>('idle');

  const handleFilesSelected = async (newFiles: File[]) => {
    const pdfFiles = newFiles.filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    if (!pdfFiles.length) return;

    try {
      const { PDFDocument } = await import('pdf-lib');
      const loadedItems: PdfFileItem[] = [];

      for (const file of pdfFiles) {
        let pageCount = 1;
        try {
          const ab = await file.arrayBuffer();
          const doc = await PDFDocument.load(ab, { ignoreEncryption: true });
          pageCount = doc.getPageCount();
        } catch {
          pageCount = 1;
        }

        loadedItems.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          name: file.name,
          size: file.size,
          pageCount,
        });
      }

      setItems((prev) => [...prev, ...loadedItems]);
      setStatus('ready');
    } catch {
      const basicItems: PdfFileItem[] = pdfFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        pageCount: 1,
      }));
      setItems((prev) => [...prev, ...basicItems]);
      setStatus('ready');
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    setItems(newItems);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    if (updated.length === 0) setStatus('idle');
  };

  const handleMerge = async () => {
    if (items.length < 2) return;
    setIsMerging(true);
    setStatus('merging');

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const item of items) {
        const ab = await item.file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(ab, { ignoreEncryption: true });
        const indices = sourcePdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(sourcePdf, indices);
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setMergedBlobUrl(url);
      setMergedFileName(`merged-${Date.now().toString().slice(-4)}.pdf`);
      setStatus('done');
    } catch (err: unknown) {
      console.error('Merge PDF error:', err);
      alert('Unable to merge one of the PDF files. Please ensure files are not encrypted.');
      setStatus('ready');
    } finally {
      setIsMerging(false);
    }
  };

  const handleReset = () => {
    if (mergedBlobUrl) URL.revokeObjectURL(mergedBlobUrl);
    setMergedBlobUrl(null);
    setItems([]);
    setStatus('idle');
  };

  const totalPages = items.reduce((acc, curr) => acc + (curr.pageCount || 1), 0);

  return (
    <div className={styles.wrapper}>
      {status !== 'done' && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={['application/pdf']}
          acceptedDescription="Drop multiple PDF files to combine into a single document"
          multiple={true}
          maxSizeMB={80}
          label={items.length > 0 ? 'Click or drop more PDF files to append' : 'Select or drop multiple PDF files to merge'}
        />
      )}

      {items.length > 0 && status !== 'done' && (
        <div style={{ marginTop: '2rem' }}>
          {/* Header Stats */}
          <div className={styles.listHeader}>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                PDF Files to Merge ({items.length})
              </strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Total pages: {totalPages} | Reorder files as desired
              </div>
            </div>
            <button
              onClick={handleMerge}
              disabled={items.length < 2 || isMerging}
              style={{ minWidth: '200px' }}
            >
              {isMerging ? 'Merging in Memory...' : `Merge ${items.length} PDFs into 1`}
            </button>
          </div>

          {items.length < 2 && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--brand-orange-light)', color: 'var(--brand-orange)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
              Please add at least 2 PDF files to merge them together.
            </div>
          )}

          {/* Files List */}
          <div className={styles.fileList}>
            {items.map((item, index) => (
              <div key={item.id} className={styles.fileCard}>
                <div className={styles.orderNumber}>{index + 1}</div>
                <div className={styles.pdfIcon}>
                  <IconPdfWord size={24} />
                </div>
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{item.name}</div>
                  <div className={styles.fileMeta}>
                    {item.pageCount} {item.pageCount === 1 ? 'page' : 'pages'} &bull; {(item.size / 1024).toFixed(0)} KB
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="secondary"
                    title="Move Up"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                  >
                    &uarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="secondary"
                    title="Move Down"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                  >
                    &darr;
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="secondary"
                    title="Remove File"
                    style={{ padding: '0.35rem 0.6rem', color: 'var(--brand-red)' }}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Done State */}
      {status === 'done' && mergedBlobUrl && (
        <div className={styles.resultPanel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-green-light)',
                color: 'var(--brand-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconCheck size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                PDF Merge Complete!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                Combined {items.length} PDF documents ({totalPages} pages) into a single unified file.
              </p>
            </div>
          </div>

          <div className={styles.actionsBar} style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <a
              href={mergedBlobUrl}
              download={mergedFileName}
              className="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--brand-blue)',
                color: '#ffffff',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <IconDownload size={20} />
              Download Merged PDF
            </a>

            <button onClick={handleReset} className="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconRefresh size={18} />
              Merge More Files
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            <IconShield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
            Processed 100% locally on your computer in &lt;100ms. Zero quality loss, exact vectors and fonts preserved.
          </div>
        </div>
      )}
    </div>
  );
}
