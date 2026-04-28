import type { SOPDoc } from './meta-ads';

// Content sourced from "Straight to Kill Image Ads SOP"
// URL: https://app.automaticsales.ai/v2/preview/eB7bNWtycfSNaFPdc61T
// NOTE: Full content pending — paste HTML/text from the page and this file will be updated.

const imageAdsSOP: SOPDoc = {
  slug: 'image-ads',
  title: 'Straight to Kill — Image Ads SOP',
  department: 'Creative',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Content Pending',
          content:
            'This SOP is linked to an external source. Paste the page content here to populate this section with full structured content.',
        },
        {
          type: 'text',
          content:
            'Image ads are a fast-deploy weapon when video inventory runs out, or when testing a new angle rapidly. "Straight to Kill" means every image must communicate the offer, the pain point, and the reason to click — all within 3 seconds of viewing.',
        },
      ],
    },
    {
      id: 'when-to-use',
      title: 'When to Use Image Ads',
      blocks: [
        {
          type: 'list',
          items: [
            'No new video creative available and campaigns need to keep running',
            'Rapid angle testing — faster to produce than video',
            'Retargeting audiences who already know the brand (shorter attention needed)',
            'Product/offer is highly visual and can be communicated in a single frame',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Remember',
          content:
            'Image ads burn out faster than video. Plan new creatives weekly when image ads are your primary format.',
        },
      ],
    },
    {
      id: 'specs',
      title: 'Image Specs',
      blocks: [
        {
          type: 'table',
          headers: ['Format', 'Dimension', 'Ratio', 'Max File Size'],
          rows: [
            ['Square (Feed)', '1080 × 1080 px', '1:1', '30 MB'],
            ['Vertical (Stories/Reels)', '1080 × 1920 px', '9:16', '30 MB'],
            ['Landscape (optional)', '1200 × 628 px', '1.91:1', '30 MB'],
          ],
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'Default Format',
          content: 'Always produce square (1080×1080) first. It runs in Feed, Reels thumbnail, and Stories with minimal cropping.',
        },
      ],
    },
    {
      id: 'design-principles',
      title: 'Design Principles',
      blocks: [
        {
          type: 'bold-text',
          content: 'The 3-Second Rule',
        },
        {
          type: 'text',
          content:
            'Your image has 3 seconds to stop the scroll, communicate the core message, and create curiosity. If it requires reading to understand — it has failed.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'High contrast — your main element must stand out from the feed',
            'One dominant message — do not try to say everything in one image',
            'Face or emotion — human faces command attention, use them where possible',
            'Minimal text — Facebook penalises heavy text; keep it under 20% of image area',
            'Clear CTA indicator — even without text, the image should imply "click here"',
          ],
        },
      ],
    },
    {
      id: 'copywriting',
      title: 'Copywriting for Image Ads',
      blocks: [
        {
          type: 'bold-text',
          content: 'Primary Text (above the image)',
        },
        {
          type: 'list',
          items: [
            'Lead with the pain point or desired result — not the product',
            'First line must stop the scroll (bold claim, question, or shocking stat)',
            'Keep it under 3 lines before the "See more" cut-off on mobile',
          ],
        },
        {
          type: 'bold-text',
          content: 'Headline (below the image)',
        },
        {
          type: 'list',
          items: [
            'Reinforce the offer or CTA — e.g. "Free Training: How to 5x your ROAS"',
            'Max 5-7 words for full visibility across placements',
          ],
        },
        {
          type: 'callout',
          variant: 'rule',
          title: 'CTA Button',
          content: 'Always "Learn More". No exceptions — consistent with all other ad formats.',
        },
      ],
    },
    {
      id: 'testing',
      title: 'Testing Image Ads',
      blocks: [
        {
          type: 'text',
          content:
            'Apply the same GT1/GT2/GT3 framework as video ads. Image ads follow the same testing structure — do not skip phases just because production is faster.',
        },
        {
          type: 'list',
          items: [
            'GT1: Test different design angles (problem-led vs result-led vs social proof)',
            'GT2: Scale the winning angle with proven interest audiences',
            'GT3: Only if ROAS 3 is achieved — double budget with CBO',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content:
            'Produce 5-10 image variations at once — change background colour, headline text, or image element. Only change one variable per variation to know what caused the result.',
        },
      ],
    },
  ],
};

export default imageAdsSOP;
