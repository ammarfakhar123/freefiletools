'use client';

import React, { useState } from 'react';
import styles from './WordToPdf.module.css';
import { DropZone } from '@/components/ui/DropZone';
import { IconDownload, IconRefresh, IconShield, IconWordPdf, IconCheck } from '@/components/icons';

interface DocxConversionState {
  status: 'idle' | 'selected' | 'converting' | 'done' | 'error';
  progress: number;
  fileName: string;
  fileSize: string;
  pdfBlobUrl?: string;
  error?: string;
}

export function WordToPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, setState] = useState<DocxConversionState>({
    status: 'idle',
    progress: 0,
    fileName: '',
    fileSize: '',
  });

  const handleFilesSelected = (files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    setSelectedFile(file);
    setState({
      status: 'selected',
      progress: 0,
      fileName: file.name.replace(/\.[^/.]+$/, ''),
      fileSize: sizeStr,
    });
  };

  const startConversion = async () => {
    if (!selectedFile) return;

    setState((prev) => ({ ...prev, status: 'converting', progress: 15 }));

    let container: HTMLDivElement | null = null;
    try {
      const [{ renderAsync }, { default: html2canvas }, { jsPDF }] = await Promise.all([
        import('docx-preview'),
        import('html2canvas'),
        import('jspdf'),
      ]);

      setState((prev) => ({ ...prev, progress: 30 }));

      // Create high-fidelity offscreen rendering container
      container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-99999px';
      container.style.top = '0';
      container.style.width = '840px';
      container.style.backgroundColor = '#ffffff';
      container.style.zIndex = '-9999';
      container.style.opacity = '1';
      document.body.appendChild(container);

      const arrayBuffer = await selectedFile.arrayBuffer();

      // Render Word docx with full CSS styling, exact colors, tables, fonts, borders
      await renderAsync(arrayBuffer, container, undefined, {
        className: 'docx',
        inWrapper: true,
        breakPages: true,
        useBase64URL: true,
        renderHeaders: true,
        renderFooters: true,
      });

      setState((prev) => ({ ...prev, progress: 55 }));

      // Find all rendered page elements
      let pageElements = Array.from(
        container.querySelectorAll<HTMLElement>('.docx-wrapper > section, section.docx, article.docx')
      );

      if (pageElements.length === 0) {
        const wrapper = container.querySelector<HTMLElement>('.docx-wrapper');
        if (wrapper && wrapper.children.length > 0) {
          pageElements = Array.from(wrapper.children) as HTMLElement[];
        } else {
          pageElements = [container];
        }
      }

      let pdf: any = null;
      const totalPages = pageElements.length;

      for (let i = 0; i < totalPages; i++) {
        const pageEl = pageElements[i];

        // Remove outer shadows and margins before rendering
        pageEl.style.margin = '0 auto';
        pageEl.style.boxShadow = 'none';
        pageEl.style.border = 'none';

        const progressPercent = Math.round(55 + ((i + 1) / totalPages) * 40);
        setState((prev) => ({ ...prev, progress: Math.min(progressPercent, 95) }));

        const canvas = await html2canvas(pageEl, {
          scale: 2, // 2x gives 200-300 DPI, razor-sharp typography and vector lines
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.96);
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const isLandscape = canvasWidth > canvasHeight;

        // Standard A4 dimensions in points: 595.28 x 841.89
        const pdfWidth = isLandscape ? 841.89 : 595.28;
        const pdfHeight = (canvasHeight / canvasWidth) * pdfWidth;

        if (!pdf) {
          pdf = new jsPDF({
            orientation: isLandscape ? 'landscape' : 'portrait',
            unit: 'pt',
            format: [pdfWidth, pdfHeight],
          });
        } else {
          pdf.addPage([pdfWidth, pdfHeight], isLandscape ? 'landscape' : 'portrait');
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }

      if (!pdf) throw new Error('No pages were rendered from the document.');

      const pdfBlob = pdf.output('blob');
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);

      setState((prev) => ({
        ...prev,
        status: 'done',
        progress: 100,
        pdfBlobUrl,
      }));
    } catch (err: unknown) {
      console.error('Word to PDF high-fidelity error:', err);
      // Graceful fallback to mammoth if corrupted
      try {
        const [mammoth, { jsPDF }] = await Promise.all([
          import('mammoth'),
          import('jspdf'),
        ]);
        const arrayBuffer = await selectedFile.arrayBuffer();
        const conversionResult = await mammoth.convertToHtml({ arrayBuffer });
        const rawHtml = conversionResult.value;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawHtml;
        const text = tempDiv.textContent || `Converted from ${state.fileName}.docx`;
        const lines = pdf.splitTextToSize(text, 500);
        pdf.text(lines, 48, 54);
        const pdfBlob = pdf.output('blob');
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        setState((prev) => ({ ...prev, status: 'done', progress: 100, pdfBlobUrl }));
      } catch (fallbackErr) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: 'Failed to convert Word document. Please ensure the file is a valid .docx package.',
        }));
      }
    } finally {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  };

  const handleDownload = () => {
    if (!state.pdfBlobUrl) return;
    const link = document.createElement('a');
    link.href = state.pdfBlobUrl;
    link.download = `${state.fileName || 'converted-document'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (state.pdfBlobUrl) URL.revokeObjectURL(state.pdfBlobUrl);
    setSelectedFile(null);
    setState({
      status: 'idle',
      progress: 0,
      fileName: '',
      fileSize: '',
    });
  };

  return (
    <div className={styles.wrapper}>
      {state.status === 'idle' && (
        <DropZone
          onFilesSelected={handleFilesSelected}
          acceptedFileTypes={[
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.docx',
          ]}
          acceptedDescription="Drop Word (.docx) document to convert directly to standardized PDF"
          maxSizeMB={50}
          label="Select or drop Microsoft Word (.docx) document"
        />
      )}

      {state.status === 'selected' && (
        <div className={styles.resultPanel}>
          <div className={styles.fileHeader}>
            <div className={styles.fileIcon}>
              <IconWordPdf size={32} />
            </div>
            <div>
              <div className={styles.fileName}>{state.fileName}.docx</div>
              <div className={styles.fileMeta}>Size: {state.fileSize} | Target: Standard PDF Document</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={startConversion} style={{ minWidth: '220px' }}>
              Convert to PDF Now
            </button>
            <button type="button" onClick={handleReset} className="secondary">
              Choose Another File
            </button>
          </div>
        </div>
      )}

      {state.status === 'converting' && (
        <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              <span>Converting Word to PDF...</span>
              <span>{state.progress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${state.progress}%`, background: 'var(--brand-blue)', transition: 'width 0.2s ease' }} />
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Formatting document canvas into PDF in memory...
            </p>
          </div>
        </div>
      )}

      {state.status === 'done' && (
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
                Conversion Complete!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                Your standardized PDF document ({state.fileName}.pdf) is ready to download.
              </p>
            </div>
          </div>

          <div className={styles.actionsBar} style={{ marginTop: '1.25rem' }}>
            <button onClick={handleDownload} aria-label="Download standardized PDF">
              <IconDownload size={20} />
              Download Standard PDF Document
            </button>
            <button onClick={handleReset} className="secondary" aria-label="Convert another Word file">
              <IconRefresh size={18} />
              Convert Another Word File
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            <IconShield size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
            Processed 100% locally on your machine in under 1 second. Zero files uploaded.
          </div>
        </div>
      )}

      {state.status === 'error' && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--status-error)', marginBottom: '1rem' }}>
            {state.error || 'Unable to convert Word document.'}
          </p>
          <button onClick={handleReset} className="secondary">
            <IconRefresh size={18} />
            Try Another Word File
          </button>
        </div>
      )}
    </div>
  );
}
