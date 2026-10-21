export interface HowToStep {
  step: number;
  title: string;
  text: string;
}

export interface ToolFeature {
  title: string;
  text: string;
}

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'image' | 'document';
  metaDescription: string;
  heroSubheading: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  badgeText: string;
  acceptedFileTypes: string[];
  acceptedExtensionsDescription: string;
  relatedSlugs: string[];
  howToSteps: HowToStep[];
  features: ToolFeature[];
  faq: ToolFaqItem[];
}

export const TOOLS: ToolDefinition[] = [
  {
    id: 'image-background-remover',
    slug: 'image-background-remover',
    title: 'Free Image Background Remover Online',
    shortTitle: 'Background Remover',
    category: 'image',
    metaDescription: 'Free image background remover online. Remove photo backgrounds instantly in your browser with zero watermark, unlimited files, and total privacy.',
    heroSubheading: 'Instantly remove backgrounds from photos in your browser. 100% free, unlimited use, no signup, no watermark, files never leave your device.',
    primaryKeyword: 'free image background remover',
    secondaryKeywords: [
      'remove background free',
      'transparent png maker',
      'cut out photo online',
      'background eraser tool',
      'ecommerce white background',
      'client-side background removal',
      'no watermark background remover'
    ],
    badgeText: 'Instant Canvas Engine',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG, WebP up to 30MB',
    relatedSlugs: ['bulk-image-converter', 'png-to-svg', 'svg-to-png'],
    howToSteps: [
      {
        step: 1,
        title: 'Select or drop your image',
        text: 'Drag and drop your photo into the workspace or click to select from your device.'
      },
      {
        step: 2,
        title: 'Instant auto-isolation',
        text: 'The engine isolates background in milliseconds. Adjust tolerance or edge smoothing in real-time.'
      },
      {
        step: 3,
        title: 'Compare and inspect edges',
        text: 'Use the interactive comparison slider to verify fine details around hair, garments, and complex object boundaries.'
      },
      {
        step: 4,
        title: 'Export transparent PNG',
        text: 'Click Download to instantly save your cutout as a full-resolution 32-bit transparent PNG file.'
      }
    ],
    features: [
      {
        title: 'Sub-50ms Instant Speed',
        text: 'Zero server queues or 40MB network model downloads. Executes instantly in your local browser memory.'
      },
      {
        title: 'Zero Artificial Watermarks',
        text: 'Download original pixel-dimension exports without forced logos, overlays, or downscaled resolutions.'
      },
      {
        title: 'Unlimited Batch Conversions',
        text: 'Process as many photos as you need throughout the day without daily quota limits, credits, or registration screens.'
      },
      {
        title: 'Complete Device Privacy',
        text: 'Your photographs never upload to any remote server. Every calculation executes in local browser Canvas.'
      }
    ],
    faq: [
      {
        question: 'Is this image background remover genuinely free?',
        answer: 'Yes, this tool is 100% free with no hidden charges, no credits system, and no pro subscription. You can remove backgrounds from as many images as you need.'
      },
      {
        question: 'Are my images uploaded to your web server?',
        answer: 'No. The background isolation model executes directly inside your web browser via HTML5 Canvas. Your images remain private on your computer or mobile device.'
      },
      {
        question: 'Does the exported PNG contain any watermarks?',
        answer: 'No. FreeFileTools never attaches stamps, watermarks, or degraded visual overlays to your finished transparent cutouts.'
      },
      {
        question: 'What image file formats are supported?',
        answer: 'You can input PNG, JPEG, JPG, and WebP image formats. All cutouts export as high quality transparent 32-bit PNG.'
      },
      {
        question: 'Can I choose a solid white background instead of transparent?',
        answer: 'Yes. Use the Output Background toggle to switch between Transparent, Solid White, or Solid Black instantly.'
      },
      {
        question: 'Can I use the output cutouts for commercial e-commerce stores?',
        answer: 'Yes. You own full rights to your processed photos. Cutouts can be placed directly on Amazon, eBay, Shopify, Etsy, or marketing catalogs.'
      },
      {
        question: 'How fast is the background removal process?',
        answer: 'Processing executes in under 50 milliseconds directly on your device graphics chip.'
      },
      {
        question: 'Does it work on mobile phones and tablets?',
        answer: 'Yes. Any modern mobile browser (Chrome, Safari, Firefox, Edge) runs this tool without installing mobile apps.'
      }
    ]
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    title: 'Free Image Resizer Online (Crop, Scale & Dimensions)',
    shortTitle: 'Image Resizer',
    category: 'image',
    metaDescription: 'Free image resizer online. Resize, scale, and crop photos by exact pixel dimensions, percentage, or social media presets with zero quality loss.',
    heroSubheading: 'Quickly resize photos and graphics in your browser with multi-step bicubic resampling. 100% free, keep aspect ratio, social presets, zero watermarks.',
    primaryKeyword: 'free image resizer online',
    secondaryKeywords: [
      'resize image online free',
      'scale image without losing quality',
      'photo dimensions changer',
      'resize image to 1080x1080',
      'passport photo resizer online',
      'crop and resize image free',
      'client side photo resizer'
    ],
    badgeText: 'Multi-Step Bicubic Resampler',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG, WebP, BMP up to 50MB',
    relatedSlugs: ['bulk-image-converter', 'image-background-remover', 'png-to-svg'],
    howToSteps: [
      {
        step: 1,
        title: 'Select or drop your photo',
        text: 'Choose any image file from your device to load into the resizer.'
      },
      {
        step: 2,
        title: 'Choose dimensions or preset',
        text: 'Type target width and height in pixels, pick a percentage scale, or choose from social media presets.'
      },
      {
        step: 3,
        title: 'Set fit behavior and format',
        text: 'Choose exact scale, contain with padding, or center crop, and select your preferred output format.'
      },
      {
        step: 4,
        title: 'Download crisp resized image',
        text: 'Click Download to instantly save your resized image rendered at maximum bicubic sharpness.'
      }
    ],
    features: [
      {
        title: 'Stepped High-DPI Resampling',
        text: 'Uses iterative stepped downsampling so resizing large images never causes jagged lines, aliasing, or broken pixels.'
      },
      {
        title: 'Aspect Ratio Lock',
        text: 'Toggle the proportional lock so changing width automatically recalculates height, preventing image distortion.'
      },
      {
        title: 'One-Click Social Media Presets',
        text: 'Quickly scale for Instagram, YouTube thumbnails, Twitter/X banners, Facebook covers, or Passport photo standards.'
      },
      {
        title: '100% Client-Side Privacy',
        text: 'Your photos are processed entirely inside browser Canvas memory. Nothing is ever uploaded to external servers.'
      }
    ],
    faq: [
      {
        question: 'Will resizing reduce the sharpness of my image?',
        answer: 'No. FreeFileTools uses stepped downsampling algorithms with high-quality bicubic smoothing to preserve sharp text, edges, and details.'
      },
      {
        question: 'Can I resize photos for Instagram or YouTube?',
        answer: 'Yes. Use the Social & Standard Presets tab to select Instagram 1080x1080, YouTube 1280x720, or other standard sizes with one click.'
      },
      {
        question: 'Is there a limit on image file size or quantity?',
        answer: 'You can resize photos up to 50MB each, completely free without daily limits, subscriptions, or watermarks.'
      },
      {
        question: 'Does FreeFileTools store copies of my photos?',
        answer: 'Never. Resizing happens strictly in your local device browser memory and is discarded the moment you close the tab.'
      }
    ]
  },
  {
    id: 'bulk-image-converter',
    slug: 'bulk-image-converter',
    title: 'Free Bulk Image Converter to WebP, PNG, JPG Online',
    shortTitle: 'Bulk Image Converter',
    category: 'image',
    metaDescription: 'Free bulk image converter online. Convert multiple PNG, JPG, and WebP images in seconds. Download all converted images as a ZIP file. 100% free and private.',
    heroSubheading: 'Convert multiple images into modern WebP, lossless PNG, or universal JPEG in seconds. 100% free, unlimited batch processing, download all as ZIP.',
    primaryKeyword: 'free bulk image converter',
    secondaryKeywords: [
      'convert to webp online',
      'batch png to webp',
      'bulk jpg to webp converter',
      'image format converter free',
      'download converted images zip',
      'fast client side image converter'
    ],
    badgeText: 'Batch GPU Engine',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG, WebP, SVG (up to 50 files)',
    relatedSlugs: ['image-background-remover', 'png-to-svg', 'image-to-pdf'],
    howToSteps: [
      {
        step: 1,
        title: 'Select multiple images',
        text: 'Drop multiple photos or graphics into the workspace at once.'
      },
      {
        step: 2,
        title: 'Choose target format',
        text: 'Select WebP for web optimization, PNG for lossless clarity, or JPEG for universal compatibility.'
      },
      {
        step: 3,
        title: 'Fine-tune quality slider',
        text: 'Adjust compression quality from 50% to 100% with real-time file size previews.'
      },
      {
        step: 4,
        title: 'Download individual files or ZIP',
        text: 'Click Download All as ZIP to receive all your converted files in one neat package.'
      }
    ],
    features: [
      {
        title: 'Parallel Batch Processing',
        text: 'Convert dozens of images in parallel in under 1 second using browser Canvas APIs.'
      },
      {
        title: 'Download All as ZIP',
        text: 'Package all converted assets into a single compressed ZIP archive with one click.'
      },
      {
        title: 'Next-Gen WebP Support',
        text: 'Shrink image weights by 30% while retaining high-fidelity visual clarity.'
      },
      {
        title: 'Strict Local Privacy',
        text: 'Batch processing runs locally on your computer with zero files sent to remote servers.'
      }
    ],
    faq: [
      {
        question: 'How many images can I convert at once?',
        answer: 'You can upload and convert up to 50+ images at a time. Processing takes place in parallel.'
      },
      {
        question: 'Why should I convert my images to WebP?',
        answer: 'WebP provides superior compression over JPEG and PNG, producing files 25% to 35% smaller with crisp quality and full transparency support.'
      },
      {
        question: 'Can I download all converted images together?',
        answer: 'Yes. Simply click the Download All as ZIP button to get all files in a single download.'
      },
      {
        question: 'Are there any file size or conversion limits?',
        answer: 'No. FreeFileTools provides unlimited batch conversions with zero daily limits.'
      }
    ]
  },
  {
    id: 'png-to-svg',
    slug: 'png-to-svg',
    title: 'Free PNG to SVG Converter Online',
    shortTitle: 'PNG to SVG',
    category: 'image',
    metaDescription: 'Free PNG to SVG vector converter online. Transform raster logos, sketches, and graphics into infinitely scalable SVG paths directly in your browser.',
    heroSubheading: 'Convert raster PNG and JPG images into scalable vector SVG graphics. 100% free, client-side processing, no watermarks, unlimited conversions.',
    primaryKeyword: 'free png to svg converter',
    secondaryKeywords: [
      'vectorize png free',
      'png to svg vector',
      'convert bitmap to svg',
      'raster to vector online',
      'logo vectorizer free'
    ],
    badgeText: 'Client Vectorizer',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG up to 15MB',
    relatedSlugs: ['svg-to-png', 'bulk-image-converter', 'image-background-remover'],
    howToSteps: [
      {
        step: 1,
        title: 'Load bitmap graphic',
        text: 'Select your logo, icon, or sketch from your computer or drag it into the upload container.'
      },
      {
        step: 2,
        title: 'Adjust vectorization settings',
        text: 'Tune color quantization, contour detail, and curve smoothing to match your art style.'
      },
      {
        step: 3,
        title: 'Preview real-time SVG paths',
        text: 'Inspect the generated vector paths rendered directly in the interactive SVG viewport.'
      },
      {
        step: 4,
        title: 'Download clean vector file',
        text: 'Download your lightweight, infinitely scalable .svg file ready for web or laser cutting.'
      }
    ],
    features: [
      {
        title: 'Infinitely Scalable Vectors',
        text: 'Scale logos to billboard dimensions or shrink them to 16px favicons without pixelation.'
      },
      {
        title: 'Custom Path Detail Controls',
        text: 'Fine-tune color steps, path simplification, and curve smoothing for crisp contours.'
      },
      {
        title: 'Clean W3C Code',
        text: 'Exports standard SVG XML code without proprietary bloat or junk metadata.'
      },
      {
        title: 'Zero Cloud Transmission',
        text: 'Tracing algorithms calculate line segments directly inside browser memory.'
      }
    ],
    faq: [
      {
        question: 'What is vectorization and how does PNG to SVG work?',
        answer: 'Vectorization converts pixel grids into mathematical path equations that scale infinitely without blurriness.'
      },
      {
        question: 'Can I edit the generated SVG in Illustrator, Figma, or Inkscape?',
        answer: 'Yes. The downloaded SVG file conforms strictly to the W3C SVG specification.'
      }
    ]
  },
  {
    id: 'svg-to-png',
    slug: 'svg-to-png',
    title: 'Free SVG to PNG Converter Online',
    shortTitle: 'SVG to PNG',
    category: 'image',
    metaDescription: 'Free SVG to PNG converter online. Render vector SVG files into crisp high-resolution PNG images with custom scaling (1x, 2x, 4x) and transparent background.',
    heroSubheading: 'Render scalable vector SVG graphics into crisp PNG raster images. Custom resolution multipliers, transparent or solid backdrops, 100% free.',
    primaryKeyword: 'free svg to png converter',
    secondaryKeywords: [
      'convert svg to png online',
      'high resolution svg to png',
      'svg to transparent png',
      'vector to raster converter'
    ],
    badgeText: 'Hi-Res Canvas Renderer',
    acceptedFileTypes: ['image/svg+xml'],
    acceptedExtensionsDescription: 'SVG vector files up to 10MB',
    relatedSlugs: ['png-to-svg', 'bulk-image-converter', 'image-to-pdf'],
    howToSteps: [
      {
        step: 1,
        title: 'Upload SVG vector graphic',
        text: 'Select your SVG file or drag it directly into the conversion workspace.'
      },
      {
        step: 2,
        title: 'Choose export dimensions and scaling',
        text: 'Pick standard 1x, crisp 2x retina, ultra 4x print resolution, or specify a custom pixel width.'
      },
      {
        step: 3,
        title: 'Configure background tone',
        text: 'Retain crisp alpha transparency or apply a solid background fill.'
      },
      {
        step: 4,
        title: 'Download pixel-perfect PNG',
        text: 'Click Download to receive your high-density PNG file rendered at maximum rasterization fidelity.'
      }
    ],
    features: [
      {
        title: 'Sub-Pixel Super Sampling',
        text: 'Render vectors up to 4x ultra high resolution (4K and 8K) for crisp print publications.'
      },
      {
        title: 'Alpha Transparency Preservation',
        text: 'Retain transparent viewports or set solid backgrounds with zero color bleeding.'
      },
      {
        title: 'Exact Dimension Controls',
        text: 'Specify exact pixel width while automatically preserving the natural aspect ratio.'
      },
      {
        title: 'Completely Local Execution',
        text: 'Hardware-accelerated HTML5 Canvas rasterization takes place on your device.'
      }
    ],
    faq: [
      {
        question: 'Why convert SVG to PNG?',
        answer: 'Many social networks, print shops, and desktop applications require raster PNG images with fixed dimensions.'
      },
      {
        question: 'Will my transparent background be preserved?',
        answer: 'Yes. By default, the output PNG retains full 32-bit alpha transparency.'
      }
    ]
  },
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    title: 'Free PDF to Word Converter Online',
    shortTitle: 'PDF to Word',
    category: 'document',
    metaDescription: 'Free PDF to Word converter online. Extract text, paragraphs, and structure into editable Microsoft Word (.docx) documents in your browser. No signup, no limits.',
    heroSubheading: 'Convert PDF documents into editable Word (.docx) files directly in your browser. 100% free, no signups, no watermarks, confidential files stay on your device.',
    primaryKeyword: 'free pdf to word converter',
    secondaryKeywords: [
      'pdf to docx free',
      'convert pdf to editable word',
      'pdf to word no email',
      'extract text from pdf'
    ],
    badgeText: 'Instant Document Engine',
    acceptedFileTypes: ['application/pdf'],
    acceptedExtensionsDescription: 'PDF documents up to 50MB',
    relatedSlugs: ['word-to-pdf', 'image-to-pdf', 'bulk-image-converter'],
    howToSteps: [
      {
        step: 1,
        title: 'Select your PDF document',
        text: 'Drop your PDF into the tool or browse files from your computer or smartphone.'
      },
      {
        step: 2,
        title: 'Instant structural parsing',
        text: 'The client-side document parser inspects text streams and line spacing in seconds.'
      },
      {
        step: 3,
        title: 'Inspect extracted text',
        text: 'Review the instant text preview directly on screen.'
      },
      {
        step: 4,
        title: 'Download editable .docx',
        text: 'Save the generated Microsoft Word document directly to your device ready for editing.'
      }
    ],
    features: [
      {
        title: 'Strict Confidentiality',
        text: 'Financial statements, legal contracts, and medical records never leave your machine.'
      },
      {
        title: 'Native .docx File Output',
        text: 'Generates compliant Office Open XML files that open without compatibility warnings.'
      },
      {
        title: 'Fast Memory Processing',
        text: 'Generates .docx documents in under 1 second without server delays.'
      },
      {
        title: 'Preserved Text Flow',
        text: 'Reconstructs headings, body paragraphs, and lists into natural editable flowing copy.'
      }
    ],
    faq: [
      {
        question: 'Is this PDF to Word converter truly free?',
        answer: 'Yes. There are no fees, no subscriptions, and no trial limits. You can convert as many documents as you need.'
      },
      {
        question: 'Will my confidential legal or financial documents remain private?',
        answer: 'Yes. All parsing executes entirely in your local browser memory.'
      }
    ]
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    title: 'Free Word to PDF Converter Online',
    shortTitle: 'Word to PDF',
    category: 'document',
    metaDescription: 'Free Word to PDF converter online. Convert Microsoft Word (.docx) documents into polished PDF files in your browser. No signup, no watermarks, unlimited files.',
    heroSubheading: 'Transform Microsoft Word (.docx) documents into universally shareable PDF files. 100% free, local browser processing, no watermarks, unlimited use.',
    primaryKeyword: 'free word to pdf converter',
    secondaryKeywords: [
      'docx to pdf free',
      'convert word to pdf online',
      'word to pdf no watermark',
      'save docx as pdf'
    ],
    badgeText: 'Instant PDF Publisher',
    acceptedFileTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ],
    acceptedExtensionsDescription: 'DOCX files up to 50MB',
    relatedSlugs: ['pdf-to-word', 'image-to-pdf', 'bulk-image-converter'],
    howToSteps: [
      {
        step: 1,
        title: 'Select your Word (.docx) file',
        text: 'Drag and drop your DOCX document into the conversion panel or click to browse.'
      },
      {
        step: 2,
        title: 'Instant parsing',
        text: 'Document elements and typography are parsed into memory in milliseconds.'
      },
      {
        step: 3,
        title: 'Generate PDF layout',
        text: 'Elements are rendered into standard PDF pages with clean margins.'
      },
      {
        step: 4,
        title: 'Download completed PDF',
        text: 'Download your finalized, read-only PDF file ready for distribution.'
      }
    ],
    features: [
      {
        title: 'Device-Level Data Privacy',
        text: 'Your corporate documents, manuscripts, and resumes stay on your machine.'
      },
      {
        title: 'Clean Standardized Output',
        text: 'Exports standard ISO-compliant PDF files viewable across all modern PDF readers.'
      },
      {
        title: 'Instant Execution',
        text: 'Converts in under 1 second without remote server queue bottlenecks.'
      },
      {
        title: 'Format Preservation',
        text: 'Converts typography, bold/italic accents, headers, and bulleted lists into clean pages.'
      }
    ],
    faq: [
      {
        question: 'Is this Word to PDF converter free to use?',
        answer: 'Yes, it is completely free with no usage caps and no membership tiers.'
      },
      {
        question: 'Will my converted PDF contain any watermarks?',
        answer: 'No. FreeFileTools will never add watermarks or branding to your documents.'
      }
    ]
  },
  {
    id: 'image-to-pdf',
    slug: 'image-to-pdf',
    title: 'Free Image to PDF Converter Online',
    shortTitle: 'Image to PDF',
    category: 'document',
    metaDescription: 'Free Image to PDF converter online. Merge multiple JPG, PNG, and WebP images into a single organized PDF document. Reorder pages, set page sizes and margins.',
    heroSubheading: 'Combine multiple JPG, PNG, and WebP photos into one organized PDF document. 100% free, reorder pages, select margins and page sizes, files stay on your device.',
    primaryKeyword: 'free image to pdf converter',
    secondaryKeywords: [
      'jpg to pdf free',
      'png to pdf combiner',
      'merge photos into pdf',
      'convert pictures to pdf online'
    ],
    badgeText: 'Multi-Page PDF Compiler',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
    acceptedExtensionsDescription: 'JPG, PNG, WebP up to 50 files',
    relatedSlugs: ['bulk-image-converter', 'image-background-remover', 'pdf-to-word'],
    howToSteps: [
      {
        step: 1,
        title: 'Select multiple images',
        text: 'Select or drag multiple photos (JPG, PNG, WebP) into the upload container at once.'
      },
      {
        step: 2,
        title: 'Reorder pages and arrange layout',
        text: 'Use the move up and move down buttons to position your pages in the desired sequence.'
      },
      {
        step: 3,
        title: 'Choose page size and margin style',
        text: 'Select Fit to Image, standard A4 Portrait, A4 Landscape, or US Letter.'
      },
      {
        step: 4,
        title: 'Download consolidated PDF',
        text: 'Click Generate PDF to instantly assemble and download your document in under 1 second.'
      }
    ],
    features: [
      {
        title: 'Drag and Drop Reordering',
        text: 'Easily rearrange your pages before exporting, ensuring documents appear in exact order.'
      },
      {
        title: 'Flexible Page Size Standards',
        text: 'Support for Fit to Image, ISO A4 Portrait/Landscape, and US Letter sizes.'
      },
      {
        title: 'Zero Quality Loss',
        text: 'Preserves image clarity without lossy recompression.'
      },
      {
        title: 'Instant Local Assembly',
        text: 'Compiled in fractions of a second. Your photos remain secure on your device.'
      }
    ],
    faq: [
      {
        question: 'Can I combine different image formats into one PDF?',
        answer: 'Yes. You can mix JPG, PNG, and WebP images together in a single conversion session.'
      },
      {
        question: 'How fast is compilation?',
        answer: 'Compilation takes less than 1 second on modern laptops and smartphones.'
      }
    ]
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    title: 'Free Merge PDF Online: Combine Multiple PDFs into One',
    shortTitle: 'Merge PDF',
    category: 'document',
    metaDescription: 'Free Merge PDF online. Combine multiple PDF documents into one single file in seconds with zero watermark, unlimited files, and total privacy.',
    heroSubheading: 'Combine multiple PDF files into one clean document directly in your browser. 100% free, no signups, no watermarks, unlimited pages.',
    primaryKeyword: 'free merge pdf online',
    secondaryKeywords: [
      'combine pdf files free',
      'merge pdf documents',
      'join pdf online',
      'combine pdf no watermark'
    ],
    badgeText: 'Instant PDF Combiner',
    acceptedFileTypes: ['application/pdf'],
    acceptedExtensionsDescription: 'Multiple PDF documents up to 100MB total',
    relatedSlugs: ['image-to-pdf', 'bulk-image-converter', 'image-background-remover'],
    howToSteps: [
      {
        step: 1,
        title: 'Upload your PDF documents',
        text: 'Drop two or more PDF files into the upload box or select them from your device.'
      },
      {
        step: 2,
        title: 'Arrange the sequence',
        text: 'Use the up and down arrows to arrange your files in the exact order you want them merged.'
      },
      {
        step: 3,
        title: 'Click Merge PDFs Now',
        text: 'The browser engine binds the PDF page trees together in under 100 milliseconds.'
      },
      {
        step: 4,
        title: 'Download combined PDF',
        text: 'Save your merged PDF file instantly with zero watermarks or quality loss.'
      }
    ],
    features: [
      {
        title: '100% Client-Side Privacy',
        text: 'Confidential legal contracts, medical reports, and tax forms never leave your device.'
      },
      {
        title: 'Zero Re-compression',
        text: 'Maintains exact native vector paths, fonts, and images with 100% fidelity.'
      },
      {
        title: 'Unlimited Merging',
        text: 'Combine as many files and pages as needed with zero subscription walls.'
      },
      {
        title: 'Lightning Speed',
        text: 'Instant memory execution without waiting in remote upload and download queues.'
      }
    ],
    faq: [
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'No. FreeFileTools allows you to combine unlimited PDF files with no restrictions.'
      },
      {
        question: 'Will merging reduce the quality of my document?',
        answer: 'Not at all. The internal page objects and vectors are copied directly without loss.'
      }
    ]
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getAllToolSlugs(): string[] {
  return TOOLS.map((t) => t.slug);
}

export function getRelatedTools(currentSlug: string): ToolDefinition[] {
  const current = getToolBySlug(currentSlug);
  if (!current) return [];
  return current.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}
