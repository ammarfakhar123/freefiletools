export const articleImageResizer = `
## How to Resize Images Online Without Losing Quality

Resizing images is one of the most common tasks for content creators, web developers, e-commerce sellers, and social media managers. However, standard image resizing tools often introduce blurriness, pixel distortion, jagged edges, or compression artifacts.

FreeFileTools uses advanced client-side stepped downsampling algorithms to scale your photos smoothly and preserve sharp pixel boundaries.

### Why Stepped Downsampling Matters

When downscaling high-resolution photos (such as a 4000x3000 photo from a smartphone or DSLR) down to an 800x600 web preview in a single step, standard browser canvas algorithms drop pixels abruptly. This causes severe aliasing and moire artifacts.

Our Multi-Step Bicubic Resampler iteratively scales the image in 50% intervals with high-quality smoothing enabled at each step. This retains fine text, edge contrast, and micro-details without blurriness.

### Key Resizing Options

- **Exact Dimensions (px)**: Enter custom width and height. Keep the aspect ratio lock enabled to prevent stretching or squishing.
- **Percentage Scale**: Quickly scale an image to 25%, 50%, 75%, 150%, or custom percentage values.
- **Social Media Presets**: One-click dimensions for Instagram square posts (1080x1080), Instagram reels/stories (1080x1920), YouTube thumbnails (1280x720), and Twitter/X header banners (1500x500).
- **Fit Behaviors**:
  - *Exact*: Scales directly to specified dimensions.
  - *Contain*: Fits the entire image within the box with clean padding.
  - *Cover*: Crops edges symmetrically to fill the exact dimensions without distortion.

### 100% Client-Side Privacy

Unlike cloud converters that upload your photographs to remote servers, FreeFileTools processes all calculations directly in your browser's local memory. Your personal photos, receipts, or documents never leave your device.
`;
