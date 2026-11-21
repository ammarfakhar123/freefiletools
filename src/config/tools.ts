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
  metaTitle?: string;
  ogTitle?: string;
  heroBody?: string;
  howToTitle?: string;
  featuresTitle?: string;
  faqTitle?: string;
  privacyTitle?: string;
  privacyBody?: string;
  relatedToolsTitle?: string;
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
    title: 'Free Image Resizer Online — Resize, Crop and Scale Photos Without Losing Quality',
    shortTitle: 'Image Resizer',
    category: 'image',
    metaTitle: 'Free Image Resizer Online — Crop, Scale & Resize Photos Without Quality Loss | FreeFileTools',
    ogTitle: 'Free Image Resizer — Resize, Crop & Scale Photos Online | FreeFileTools',
    metaDescription: 'Free online image resizer. Resize photos by exact pixel dimensions, percentage, or social media presets. No watermark, no upload, no signup. Works for Instagram, YouTube thumbnails, PPSC photos and more.',
    heroSubheading: 'Resize any photo to exact pixel dimensions, a percentage scale, or a one-click social media preset. Multi-step bicubic resampling keeps images sharp. 100% free, no watermark, no upload.',
    heroBody: 'Whether you need to resize image for a YouTube thumbnail, prepare a PPSC passport photo, scale a PNG for Instagram, or reduce an image for a WhatsApp DP, this free image size reducer handles everything directly in your browser — no software, no account, zero watermarks. FreeFileTools image resizer gives you three ways to resize: exact pixel dimensions, a custom percentage scale, or one-click social and standard presets. Every resize uses multi-step bicubic resampling so your photos stay crisp — no jagged edges, no blurriness, no artifacts. Upload a PNG, JPG, or WebP file and download your resized photo in seconds.',
    primaryKeyword: 'free image size reducer online',
    secondaryKeywords: [
      'image resizer ppsc',
      'resize image ppsc',
      'resize image for youtube thumbnail',
      'canvas resize image',
      'resize png image',
      'ppsc resize image',
      'resize image for whatsapp dp',
      'resize image for instagram',
      'how to resize an image in photoshop',
      'image resizer online',
      'resize image online free',
      'how to resize an image'
    ],
    badgeText: 'Multi-Step Bicubic Resampler',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG, WebP, BMP up to 50MB',
    relatedSlugs: ['bulk-image-converter', 'png-to-svg', 'svg-to-png', 'image-to-pdf', 'merge-pdf'],
    howToTitle: 'How to Use the Image Resizer Online',
    howToSteps: [
      {
        step: 1,
        title: 'Select or drop your photo',
        text: 'Upload any PNG, JPG, or WebP image from your device. Drag and drop onto the tool or click to browse your files.'
      },
      {
        step: 2,
        title: 'Choose your resize method',
        text: 'Pick Exact Dimensions (px) to set a custom width and height, Percentage Scale to scale up or down by a custom %, or Social Presets for one-click sizes.'
      },
      {
        step: 3,
        title: 'Set fit behavior and format',
        text: 'Choose Exact (stretch to fit), Contain (fit with padding), or Cover (center crop to fill). Select your output format: JPG, PNG, or WebP.'
      },
      {
        step: 4,
        title: 'Adjust export quality if needed',
        text: 'Drag the quality slider (default 92%) to balance sharpness against file size. The estimated output file size updates live.'
      },
      {
        step: 5,
        title: 'Download your resized image',
        text: 'Click Download to instantly save the resized photo rendered at maximum bicubic sharpness. No upload to any server, ever.'
      }
    ],
    featuresTitle: 'Key Features and Benefits of FreeFileTools Image Resizer',
    features: [
      {
        title: 'Multi-Step Bicubic Resampling',
        text: 'Standard browser canvas algorithms drop pixels when downscaling large photos, causing jagged lines and moire artifacts. FreeFileTools uses iterative stepped downsampling in 50% intervals with high-quality smoothing at each step. This canvas resize image technique retains fine text, edge contrast, and micro-details — even on extreme downscales from 4K to thumbnail size.'
      },
      {
        title: 'Aspect Ratio Lock',
        text: 'Enable the proportional lock and changing width automatically recalculates height. No manual maths, no accidental stretching or squishing. Works across all resize modes.'
      },
      {
        title: 'Three Resize Modes',
        text: 'Exact Dimensions — enter any pixel width and height. Percentage Scale — resize to 25%, 50%, 75%, 150%, or any custom percentage. Social Presets — one-click standard sizes for every major platform.'
      },
      {
        title: 'Three Fit Behaviors',
        text: 'Exact: scales the image directly to the specified dimensions. Contain: fits the entire image within the box with clean transparent or white padding — ideal for product photos. Cover: center-crops the image symmetrically to fill exact dimensions without distortion.'
      },
      {
        title: 'PPSC and Government Form Photos',
        text: 'Resize any photo to the exact pixel dimensions required for PPSC, FPSC, NTS, CSS, and other Pakistani government exam and job application portals. Use the Passport/ID preset (600x600px) or enter custom dimensions. The image resizer ppsc workflow takes under 10 seconds.'
      },
      {
        title: 'PNG, JPG and WebP Support',
        text: 'Resize PNG image files while preserving transparency. Convert output to JPG for smallest file size, WebP for web delivery, or keep PNG for lossless quality. Format selection is on the same screen.'
      },
      {
        title: 'Export Quality Control',
        text: 'Drag the quality slider from 1% to 100%. The live preview shows estimated output file size so you can balance sharpness against storage or upload limits before downloading.'
      },
      {
        title: '100% Client-Side Privacy',
        text: 'Your photos never leave your device. All processing happens inside browser Canvas memory — no cloud upload, no server storage, no third-party access. Close the tab and everything is cleared.'
      }
    ],
    faqTitle: 'Frequently Asked Questions About Image Resizing',
    faq: [
      {
        question: 'Will resizing reduce the sharpness of my image?',
        answer: "No. FreeFileTools uses multi-step bicubic resampling with iterative smoothing at each pass. This preserves sharp text, edges, and fine details that single-pass resizers typically destroy. The result is noticeably crisper than most free online image resizers (see [Google's web.dev optimization guide](https://web.dev/fast/#optimize-your-images))."
      },
      {
        question: 'Can I resize image for Instagram or YouTube?',
        answer: 'Yes. Use the Social Presets tab. Select Instagram Square (1080x1080), Instagram Story (1080x1920), or YouTube Thumbnail (1280x720) with one click. Use Cover mode to crop and fill the frame exactly.'
      },
      {
        question: 'How do I resize image for PPSC or government forms?',
        answer: 'Select the Passport/ID Photo preset (600x600px) or enter the exact dimensions required by the portal. Most PPSC, FPSC, NTS, and CSS application forms specify pixel dimensions rather than file size. Export as JPG for the most compact output. The ppsc resize image process takes under 10 seconds.'
      },
      {
        question: 'Can I resize PNG image files?',
        answer: 'Yes. Upload any PNG and the resizer handles it fully. Select PNG as the output format to preserve transparency. Select JPG if you want a smaller file size. WebP is available for web-optimized output.'
      },
      {
        question: 'How do I resize image for WhatsApp DP?',
        answer: 'WhatsApp profile pictures display at 500x500px. Enter 500 in both width and height fields with Cover fit selected to get a perfectly square crop. Download as JPG for the smallest file.'
      },
      {
        question: 'Is there a file size or quantity limit?',
        answer: 'You can process photos up to 50MB each, completely free. No daily limits, no subscriptions, no watermarks on output. Resize image online free as many times as you need.'
      },
      {
        question: 'How does this compare to resizing in Photoshop?',
        answer: "Photoshop requires a paid Creative Cloud subscription. FreeFileTools runs entirely in your browser, free, with no installation needed. For standard resizing tasks — social presets, pixel dimensions, percentage scaling — the output quality is comparable to Photoshop's bicubic resampling."
      },
      {
        question: 'Does FreeFileTools store copies of my photos?',
        answer: 'Never. Resizing runs entirely inside your local browser Canvas memory using client-side JavaScript. Nothing is uploaded to any server. When you close the tab, all session data is permanently cleared.'
      }
    ],
    privacyTitle: 'Your Files Never Leave Your Device',
    privacyBody: "FreeFileTools prioritizes privacy above all else. Unlike cloud-based converters that upload your photographs to remote servers for processing, this image resizer runs all calculations directly inside your browser memory using client-side JavaScript and the Canvas API. Following Google's [image guidelines for web delivery](https://developers.google.com/search/docs/appearance/google-images), your personal photos, ID documents, and business graphics are never transmitted to external servers, never stored in cloud databases, and never inspected by third parties. When you close this tab, all session memory is completely and permanently cleared.",
    relatedToolsTitle: 'More Free File Tools'
  },
  {
    id: 'bulk-image-converter',
    slug: 'bulk-image-converter',
    title: 'Free Bulk Image Converter Online — WebP, PNG, JPG, AVIF in Seconds',
    shortTitle: 'Bulk Image Converter',
    category: 'image',
    metaTitle: 'Free Bulk Image Converter Online — Convert to WebP, PNG, JPG in Seconds',
    ogTitle: 'Free Bulk Image Converter Online — FreeFileTools',
    metaDescription: 'Convert multiple images to WebP, PNG, or JPG at once — no upload, no signup, no watermark. Batch processing runs entirely in your browser. 100% free and unlimited.',
    heroSubheading: 'Convert multiple images to WebP, PNG, JPG, or AVIF at once — directly in your browser. Batch processing runs entirely in your browser. 100% free and unlimited.',
    heroBody: 'FreeFileTools bulk image converter lets you convert multiple images to WebP, PNG, JPG, or AVIF at once — directly in your browser, with no file uploads and no limits. Whether you are optimizing a photo gallery for web speed or switching file formats for work, our browser-based batch processing engine handles dozens of files simultaneously and lets you download converted images as zip in one click. You can also resize your images before batch conversion using the [Image Resizer](/tools/image-resizer/).',
    primaryKeyword: 'bulk image converter',
    secondaryKeywords: [
      'bulk image converter to jpg',
      'bulk image converter online free',
      'bulk image converter to png',
      'webp bulk image converter',
      'convert multiple images at once',
      'batch image format converter',
      'convert images without uploading',
      'convert jpg to webp free',
      'download converted images as zip'
    ],
    badgeText: 'Batch GPU Engine',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG, WebP, SVG, AVIF (up to 50+ files)',
    relatedSlugs: ['image-resizer', 'png-to-svg', 'svg-to-png', 'image-to-pdf', 'merge-pdf'],
    howToTitle: 'How to Convert Multiple Images at Once',
    howToSteps: [
      {
        step: 1,
        title: 'Step 1 — Select or Drop Your Images',
        text: 'Upload multiple PNG, JPG, WebP, AVIF, SVG, or BMP files. Drag and drop a whole folder or browse files from your computer or phone.'
      },
      {
        step: 2,
        title: 'Step 2 — Choose Target Format (WebP, PNG, JPG, AVIF)',
        text: 'Select WebP for modern web performance, PNG for transparent graphics, JPG for universal photo compatibility, or AVIF for maximum compression.'
      },
      {
        step: 3,
        title: 'Step 3 — Adjust Quality and Download as ZIP',
        text: 'Fine-tune compression with the live quality slider and click Download All as ZIP to receive all your converted files in one package.'
      }
    ],
    featuresTitle: 'Key Features and Benefits of FreeFileTools Bulk Image Converter',
    features: [
      {
        title: 'Parallel Batch Processing',
        text: 'FreeFileTools processes 50+ images simultaneously using parallel browser Canvas APIs with zero batch size limits.'
      },
      {
        title: 'One-Click ZIP Packaging',
        text: 'Download converted images as zip instantly rather than saving files individually, saving valuable time.'
      },
      {
        title: 'Broad Format Support',
        text: 'Batch image format converter supporting PNG, JPG, WebP, AVIF, SVG, BMP, GIF, ICO, and TIFF inputs.'
      },
      {
        title: '100% Client-Side Privacy',
        text: 'Convert images without uploading anything to remote servers. All processing runs locally in browser memory.'
      }
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        question: 'How many images can I convert at once?',
        answer: 'FreeFileTools processes 50+ images simultaneously using parallel browser Canvas APIs. There is no batch size limit.'
      },
      {
        question: 'Can I do a bulk image converter to JPG online for free?',
        answer: 'Yes. Select JPG/JPEG as your output format, drop your images, and download the converted files. No account needed, no watermarks.'
      },
      {
        question: 'Does bulk image conversion require an internet connection?',
        answer: 'Only to load the page. Once loaded, all conversions run locally on your device using HTML5 Canvas — no files are sent to any server.'
      },
      {
        question: 'How do I convert multiple images to WebP?',
        answer: 'Drop all your images into the tool, select WebP as the target format, adjust the quality slider, and click Download All as ZIP.'
      },
      {
        question: 'Is there a free bulk image converter that works on Mac?',
        answer: 'Yes. FreeFileTools runs in any modern browser on Mac, Windows, Linux, and mobile — no software download or installation required.'
      },
      {
        question: 'What is the difference between WebP, PNG and JPG?',
        answer: 'WebP gives smaller file sizes (25-35% smaller than JPEG) with full transparency support — best for websites. PNG is lossless, best for logos and screenshots. JPG is universal, best for photographs.'
      }
    ],
    privacyTitle: 'Your Files Never Leave Your Device',
    privacyBody: 'We prioritize your privacy above all else. FreeFileTools processes files entirely inside your web browser memory using HTML5 Canvas and Blob APIs. Your photos and graphics are never uploaded to remote servers, never stored in cloud databases, and never inspected by third parties. When you close this tab, all session memory is completely cleared.',
    relatedToolsTitle: 'More Free File Tools'
  },
  {
    id: 'png-to-svg',
    slug: 'png-to-svg',
    title: 'Free PNG to SVG Converter Online — Vectorize Images Without Losing Quality',
    shortTitle: 'PNG to SVG',
    category: 'image',
    metaTitle: 'Free PNG to SVG Converter Online — Convert Images to Vector for Free',
    ogTitle: 'Free PNG to SVG Converter Online — FreeFileTools',
    metaDescription: 'Convert PNG and JPG images to scalable SVG vector graphics online. Free, browser-based vectorization — no upload, no watermark, no signup. Download clean W3C SVG instantly.',
    heroSubheading: 'Convert PNG and JPG images to scalable SVG vector graphics online. Free, browser-based vectorization — no upload, no watermark, no signup. Download clean W3C SVG instantly.',
    heroBody: 'Convert any PNG or JPG image to SVG vector format instantly — the PNG to SVG conversion runs entirely in your browser, with no file uploads and no watermark on your output. Whether you need to vectorize a hand-drawn sketch, clean up a raster logo, or generate sharp cutting paths for Cricut and CNC machines, our free browser-based vectorizer transforms pixel bitmaps into infinitely scalable W3C SVG vector paths in seconds.',
    primaryKeyword: 'png to svg',
    secondaryKeywords: [
      'png to svg conversion',
      'png to svg converter with color',
      'png to svg bulk converter',
      'png to svg vector converter free',
      'png to svg online free',
      'png to svg transparent',
      'png to svg no background',
      'convert raster image to vector',
      'vectorize image free online',
      'png to svg for laser cutting',
      'png to svg for cricut'
    ],
    badgeText: 'Client Vectorizer',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
    acceptedExtensionsDescription: 'PNG, JPG, JPEG up to 15MB',
    relatedSlugs: ['svg-to-png', 'bulk-image-converter', 'image-resizer', 'image-to-pdf', 'merge-pdf'],
    howToTitle: 'How to Convert PNG to SVG Online — Step by Step',
    howToSteps: [
      {
        step: 1,
        title: 'Step 1 — Upload Your PNG or JPG',
        text: 'Drop your PNG or JPG raster file into the upload area or browse from your device. Clean high-contrast images yield the best vector results.'
      },
      {
        step: 2,
        title: 'Step 2 — Adjust Color Count and Path Detail',
        text: 'Fine-tune color quantization, contour detail, and curve smoothing to capture fine vector curves or simplify into flat graphic shapes.'
      },
      {
        step: 3,
        title: 'Step 3 — Preview and Download Your SVG',
        text: 'Inspect the interactive real-time vector path preview and click Download SVG to save your clean, scalable graphic.'
      }
    ],
    featuresTitle: 'Key Features and Benefits of FreeFileTools PNG to SVG Converter',
    features: [
      {
        title: 'Infinitely Scalable Vectors',
        text: 'Scale logos to billboard dimensions or shrink them to 16px favicons without pixelation or blurriness.'
      },
      {
        title: 'Cricut and Laser Cutting Ready',
        text: 'Generates clean continuous vector paths for CNC routers, vinyl plotters, and laser cutters.'
      },
      {
        title: 'Clean W3C Code Export',
        text: 'Exports standard SVG code conforming to W3C specifications without proprietary bloat or junk metadata.'
      },
      {
        title: '100% Client-Side Vectorization',
        text: 'Tracing algorithms calculate line segments directly inside browser memory with zero server uploads.'
      }
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        question: 'Does the PNG to SVG converter work for logos?',
        answer: 'Yes. PNG to SVG conversion works best for logos with clean edges and limited colors (2-8 color palette). Set a low color count for simple logos — this produces the cleanest vector paths for use in design software and printing.'
      },
      {
        question: 'Can I convert PNG to SVG for use in Cricut or laser cutting machines?',
        answer: 'Yes. CNC routers, Cricut machines, and laser cutters require vector SVG paths to guide the cutting head. Convert your PNG design to SVG using FreeFileTools and import the downloaded file directly into your cutting software.'
      },
      {
        question: 'Is this a free PNG to SVG vector converter?',
        answer: 'Yes. FreeFileTools PNG to SVG converter is 100% free — no account, no watermark, no daily limit. The vectorization runs in your browser so no files are uploaded to any server.'
      },
      {
        question: 'How do I get a transparent PNG to SVG output?',
        answer: 'If your source PNG has a transparent background, the vectorizer will treat the transparent area as negative space. For best results, use a PNG with a clean, solid-contrast background before converting.'
      },
      {
        question: 'Can I do a bulk PNG to SVG conversion?',
        answer: 'FreeFileTools currently converts one file at a time for PNG to SVG to allow you to preview and fine-tune the vector output per image. For batch raster conversion between PNG, JPG, and WebP, use the [Bulk Image Converter](/tools/bulk-image-converter/).'
      },
      {
        question: 'What software can open the downloaded SVG file?',
        answer: 'The SVG file from FreeFileTools conforms to the [W3C SVG specification](https://www.w3.org/TR/SVG11/) and opens in Adobe Illustrator, Figma, [Inkscape](https://inkscape.org/), CorelDRAW, and any modern web browser.'
      }
    ],
    privacyTitle: 'Your Files Never Leave Your Device',
    privacyBody: 'We prioritize your privacy above all else. FreeFileTools processes vectorization entirely inside your web browser memory. Your logos, sketches, and images are never uploaded to remote servers, never stored in cloud databases, and never inspected by third parties. When you close this tab, all session memory is completely cleared.',
    relatedToolsTitle: 'More Free File Tools'
  },
  {
    id: 'svg-to-png',
    slug: 'svg-to-png',
    title: 'Free SVG to PNG Converter Online — Export Crisp High-Resolution PNG from Any SVG',
    shortTitle: 'SVG to PNG',
    category: 'image',
    metaTitle: 'Free SVG to PNG Converter Online — Export High-Quality PNG from SVG',
    ogTitle: 'Free SVG to PNG Converter Online — FreeFileTools',
    metaDescription: 'Convert SVG vector files to high-resolution PNG images online. 1x, 2x, 4x scaling, transparent or solid background. Free, no signup, no watermark, files stay local.',
    heroSubheading: 'Convert SVG vector files to high-resolution PNG images online. 1x, 2x, 4x scaling, transparent or solid background. Free, no signup, no watermark, files stay local.',
    heroBody: 'Convert SVG vector files to high-quality PNG images directly in your browser — the SVG to PNG converter renders at 1x, 2x retina, or 4x ultra-HD with no uploads and no watermark. Whether you need transparent PNG badges for websites, ultra-sharp social media graphics, or email-compatible assets from vector designs, our client-side rasterizer creates razor-sharp raster graphics in seconds.',
    primaryKeyword: 'svg to png',
    secondaryKeywords: [
      'svg to png high quality',
      'svg to png online',
      'how to convert svg to png',
      'svg to png converter online',
      'svg to png transparent background online',
      'svg to png 4k',
      'svg to png without background',
      'svg to png free converter',
      'svg to png high resolution',
      'export svg as png for social media',
      'render vector to raster image free'
    ],
    badgeText: 'Hi-Res Canvas Renderer',
    acceptedFileTypes: ['image/svg+xml'],
    acceptedExtensionsDescription: 'SVG vector files up to 10MB',
    relatedSlugs: ['png-to-svg', 'bulk-image-converter', 'image-resizer', 'image-to-pdf', 'merge-pdf'],
    howToTitle: 'How to Convert SVG to PNG Online — 4 Steps',
    howToSteps: [
      {
        step: 1,
        title: 'Step 1 — Upload Your SVG File',
        text: 'Drop your SVG vector file into the converter or click to browse files from your computer or phone.'
      },
      {
        step: 2,
        title: 'Step 2 — Choose Resolution Scale (1x, 2x, 4x or Custom)',
        text: 'Pick 1x for standard web display, 2x for Retina screens, 4x for Ultra-HD print quality, or enter custom pixel dimensions.'
      },
      {
        step: 3,
        title: 'Step 3 — Set Background (Transparent or Solid Color)',
        text: 'Keep full alpha transparency for web badges and logos, or select a solid background color fill.'
      },
      {
        step: 4,
        title: 'Step 4 — Download Your High-Resolution PNG',
        text: 'Click Download PNG to instantly export your crisp raster graphic rendered at high hardware resolution.'
      }
    ],
    featuresTitle: 'Key Features and Benefits of FreeFileTools SVG to PNG Converter',
    features: [
      {
        title: 'Sub-Pixel Super Sampling',
        text: 'Render vectors up to 4x ultra high resolution (4K and 8K) for razor-sharp print and Retina displays.'
      },
      {
        title: 'Alpha Transparency Preservation',
        text: 'Retain transparent backgrounds or apply custom solid color fills with zero edge bleeding.'
      },
      {
        title: 'Exact Dimension Controls',
        text: 'Specify custom pixel dimensions while automatically preserving the natural aspect ratio of your vector.'
      },
      {
        title: '100% Client-Side Privacy',
        text: 'Hardware-accelerated HTML5 Canvas rasterization executes strictly inside your browser memory.'
      }
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        question: 'How do I convert SVG to PNG for free online?',
        answer: 'Upload your SVG file to FreeFileTools SVG to PNG converter, choose your resolution scale (1x, 2x, or 4x), set the background option, and click Download. The PNG is generated in your browser — no account or payment required.'
      },
      {
        question: 'How do I get a high-quality SVG to PNG export?',
        answer: 'Select 2x for Retina/mobile screens or 4x for print and large-format output. FreeFileTools re-renders the vector at the chosen scale against a fresh pixel grid — not just a resize of a 1x image — so lines stay sharp at any resolution.'
      },
      {
        question: 'Can I keep a transparent background when converting SVG to PNG?',
        answer: 'Yes. By default the output PNG retains full alpha transparency from your SVG. If you need a solid background, select the background color option before downloading.'
      },
      {
        question: 'Why does my SVG to PNG look blurry?',
        answer: 'This usually means you exported at 1x resolution on a Retina or high-DPI screen. Use 2x or 4x scale for crisp edges. Also check that your SVG has a valid viewBox attribute — missing viewBox can cause unexpected canvas sizing.'
      },
      {
        question: 'Can I convert SVG to PNG for use on Instagram or Twitter?',
        answer: 'Yes. Social platforms do not accept SVG uploads. Convert your vector logo or graphic to PNG at 2x or 4x in FreeFileTools and upload the resulting file. For profile images, 400x400px minimum is recommended.'
      },
      {
        question: 'Does FreeFileTools support batch SVG to PNG conversion?',
        answer: 'Currently FreeFileTools converts one SVG at a time to allow full resolution and background control per file. For batch format conversion between raster formats like PNG, JPG and WebP, use the free [Bulk Image Converter](/tools/bulk-image-converter/).'
      }
    ],
    privacyTitle: 'Your Files Never Leave Your Device',
    privacyBody: 'We prioritize your privacy above all else. FreeFileTools processes rasterization entirely inside your web browser memory using HTML5 Canvas. Your vector designs and graphics are never uploaded to remote servers, never stored in cloud databases, and never inspected by third parties. When you close this tab, all session memory is completely cleared.',
    relatedToolsTitle: 'More Free File Tools'
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
    relatedSlugs: ['bulk-image-converter', 'image-resizer', 'pdf-to-word'],
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
    relatedSlugs: ['image-to-pdf', 'bulk-image-converter', 'image-resizer'],
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
