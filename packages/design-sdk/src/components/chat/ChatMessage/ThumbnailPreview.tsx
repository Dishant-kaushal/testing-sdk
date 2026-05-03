import React from 'react';
import { cn } from '../../../utils/cn';
import type { ThumbnailItem, ThumbnailPreviewProps, ResolvedThumbnailItem } from './types';

const MAX_VISIBLE = 3;
const IMG_SIZE = 120;
const STACK_HEIGHT_OFFSET = 12;

type CardStyle = { bottom: number; right: number; transform: string; zIndex: number };

const SINGLE_CARD: CardStyle = { bottom: 0, right: 0,  transform: 'rotate(0deg)',   zIndex: 3 };
const STACK_CARDS: CardStyle[] = [
  { bottom: 0,  right: 32, transform: 'rotate(0deg)',   zIndex: 3 },
  { bottom: 59, right: 10, transform: 'rotate(15deg)',  zIndex: 2 },
  { bottom: 42, right: 62, transform: 'rotate(-15deg)', zIndex: 1 },
];

const resolve = (t: ThumbnailItem, i: number): ResolvedThumbnailItem => ({
  id: t.id ?? `thumbnail-${i}-${t.url}`,
  url: t.url,
  alt: t.alt ?? '',
  originalIndex: i,
  originalThumbnail: t,
});

const getCardStyle = (stackIndex: number, isSingle: boolean): CardStyle =>
  isSingle ? SINGLE_CARD : (STACK_CARDS[stackIndex] ?? STACK_CARDS[STACK_CARDS.length - 1]);

const ThumbnailPreview = ({ thumbnails, onThumbnailClick }: ThumbnailPreviewProps): React.ReactElement | null => {
  const resolved = thumbnails.map(resolve);
  const preview = resolved.slice(0, MAX_VISIBLE);
  const isSingle = preview.length === 1;
  const overflow = Math.max(resolved.length - MAX_VISIBLE, 0);

  const stackHeight = isSingle
    ? IMG_SIZE
    : Math.max(...preview.map((_, i) => getCardStyle(i, false).bottom + IMG_SIZE), 0) + STACK_HEIGHT_OFFSET;

  const Tag = onThumbnailClick ? 'button' : 'div';

  return (
    <Tag
      {...(onThumbnailClick ? { type: 'button' as const, onClick: onThumbnailClick } : {})}
      className={cn('fds-chat-msg__thumbs', onThumbnailClick && 'fds-chat-msg__thumbs--clickable')}
      style={{
        width: isSingle ? `${IMG_SIZE}px` : '188px',
        height: `${stackHeight}px`,
      }}
    >
      {[...preview].reverse().map(({ id, url, alt }, reverseIndex) => {
        const stackIndex = preview.length - reverseIndex - 1;
        const style = getCardStyle(stackIndex, isSingle);
        return (
          <div
            key={`${id}-${stackIndex}`}
            className="fds-chat-msg__thumb-card"
            style={{
              bottom: style.bottom,
              right: style.right,
              transform: style.transform,
              zIndex: style.zIndex,
            }}
          >
            <img className="fds-chat-msg__thumb-img" src={url} alt={alt} />
          </div>
        );
      })}
      {overflow > 0 && (
        <div className="BodySmallRegular fds-chat-msg__thumb-overflow">+{overflow}</div>
      )}
    </Tag>
  );
};

export { ThumbnailPreview };
