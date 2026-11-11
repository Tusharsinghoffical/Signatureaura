'use client';

import React from 'react';
import { Share2, Check, AlertCircle } from 'lucide-react';
import { useSharePage, ShareOverrides } from '@/hooks/useSharePage';

export interface SharePageButtonProps extends ShareOverrides {
  variant?: 'luxury' | 'gold' | 'dark' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  buttonLabel?: string;
  className?: string;
  showLabel?: boolean;
}

export const SharePageButton: React.FC<SharePageButtonProps> = ({
  title,
  text,
  url,
  variant = 'luxury',
  size = 'md',
  buttonLabel,
  className = '',
  showLabel = true,
}) => {
  const { sharePage, status } = useSharePage({ title, text, url });

  const isSuccess = status === 'copied' || status === 'shared';
  const isError = status === 'error';

  // Responsive Icon
  const iconSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 14;

  const icon = isSuccess ? (
    <Check size={iconSize} className="text-emerald-500 shrink-0" />
  ) : isError ? (
    <AlertCircle size={iconSize} className="text-rose-500 shrink-0" />
  ) : (
    <Share2 size={iconSize} className="shrink-0" />
  );

  const label =
    status === 'copied'
      ? 'Link Copied!'
      : status === 'shared'
      ? 'Shared!'
      : status === 'error'
      ? 'Failed'
      : (buttonLabel || 'Share');

  // Size sizing
  const sizeClasses =
    variant === 'icon'
      ? size === 'sm'
        ? 'w-8 h-8 min-w-[32px] min-h-[32px] p-1.5'
        : size === 'lg'
        ? 'w-11 h-11 min-w-[44px] min-h-[44px] p-2.5'
        : 'w-9 h-9 min-w-[36px] min-h-[36px] p-2'
      : size === 'sm'
      ? 'px-2.5 py-1 text-[11px] gap-1.5'
      : size === 'lg'
      ? 'px-4 py-2.5 text-xs gap-2'
      : 'px-3 py-1.5 text-xs gap-2';

  // Base classes
  let styleClasses = `touch-manipulation inline-flex items-center justify-center font-medium transition-all active:scale-95 cursor-pointer rounded-lg ${sizeClasses} `;

  // Variant styling
  if (variant === 'gold') {
    styleClasses += isSuccess
      ? 'bg-emerald-600 text-white shadow-sm'
      : 'bg-[#B99A63] hover:bg-[#A3844D] text-white shadow-sm';
  } else if (variant === 'dark') {
    styleClasses += isSuccess
      ? 'bg-emerald-600 text-white'
      : 'bg-[#171717] hover:bg-[#252525] text-white border border-[#B99A63]/40 shadow-sm';
  } else if (variant === 'ghost') {
    styleClasses += isSuccess
      ? 'text-emerald-500'
      : 'text-stone-500 hover:text-[#B99A63] bg-transparent';
  } else if (variant === 'icon') {
    styleClasses += isSuccess
      ? 'bg-emerald-50 border border-emerald-400 text-emerald-600 rounded-full shadow-xs'
      : 'bg-white/90 hover:bg-white text-stone-700 hover:text-[#B99A63] border border-[#E8E5DF] hover:border-[#B99A63] rounded-full shadow-xs backdrop-blur-xs';
  } else if (variant === 'outline') {
    styleClasses += isSuccess
      ? 'border border-emerald-400 bg-emerald-50 text-emerald-600'
      : 'border border-[#E8E5DF] bg-white text-stone-700 hover:border-stone-400';
  } else {
    // Default: 'luxury'
    styleClasses += isSuccess
      ? 'border border-emerald-500/80 bg-emerald-50 text-emerald-700 shadow-xs'
      : 'border border-[#E8E5DF] bg-white text-[#171717] hover:border-[#B99A63] hover:text-[#B99A63] shadow-xs';
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents bubbling if inside a clickable card or row
        sharePage();
      }}
      aria-label={label}
      title={label}
      className={`${styleClasses} ${className}`}
    >
      {icon}
      {showLabel && variant !== 'icon' && <span className="truncate">{label}</span>}
    </button>
  );
};

export default SharePageButton;
