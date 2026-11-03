import type { Img } from '~/content/types';
import { cn } from '~/lib/utils';

type PictureProps = {
  img: Img;
  /** The `sizes` attribute: how wide the image shows at each breakpoint. */
  sizes: string;
  /** Load right away (images above the fold). */
  priority?: boolean;
  className?: string;
  /** Fill the parent and crop instead of keeping the image's own ratio. */
  cover?: boolean;
};

/**
 * A responsive image that reserves its space before it loads (so nothing
 * shifts) and shows a blurred preview underneath.
 */
export function Picture({
  img,
  sizes,
  priority,
  className,
  cover
}: PictureProps) {
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={img.srcSet ? sizes : undefined}
      width={img.width}
      height={img.height}
      alt={img.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding='async'
      draggable={false}
      className={cn(
        'bg-cover bg-center',
        cover ? 'h-full w-full object-cover' : 'h-auto w-full',
        className
      )}
      style={{
        backgroundImage: `url("${img.blur}")`,
        aspectRatio: cover ? undefined : `${img.width} / ${img.height}`
      }}
    />
  );
}
