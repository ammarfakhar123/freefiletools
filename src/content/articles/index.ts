import { articleImageBackgroundRemover } from './image-background-remover';
import { articleImageResizer } from './image-resizer';
import { articlePngToSvg } from './png-to-svg';
import { articleSvgToPng } from './svg-to-png';
import { articlePdfToWord } from './pdf-to-word';
import { articleWordToPdf } from './word-to-pdf';
import { articleImageToPdf } from './image-to-pdf';
import { articleBulkImageConverter } from './bulk-image-converter';
import { articleMergePdf } from './merge-pdf';

export const TOOL_ARTICLES: Record<string, string> = {
  'image-background-remover': articleImageBackgroundRemover,
  'image-resizer': articleImageResizer,
  'bulk-image-converter': articleBulkImageConverter,
  'png-to-svg': articlePngToSvg,
  'svg-to-png': articleSvgToPng,
  'pdf-to-word': articlePdfToWord,
  'word-to-pdf': articleWordToPdf,
  'image-to-pdf': articleImageToPdf,
  'merge-pdf': articleMergePdf,
};

export function getToolArticle(slug: string): string {
  return TOOL_ARTICLES[slug] || '';
}
