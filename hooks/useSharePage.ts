import { useState, useEffect, useRef, useCallback } from 'react';

export type ShareStatus = 'idle' | 'copied' | 'shared' | 'error';

export interface ShareOverrides {
  title?: string;
  text?: string;
  url?: string;
}

export interface UseSharePageReturn {
  sharePage: (callOverrides?: ShareOverrides) => Promise<void>;
  status: ShareStatus;
  isSupported: boolean;
}

/** Check if Mobile Native Share is available in current browser environment */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/** 100% Fail-safe Clipboard Copy (Modern navigator.clipboard + legacy fallback) */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. Modern Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback to legacy execCommand
    }
  }

  // 2. Fallback for older browsers or non-secure contexts
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

/**
 * Universal Hook for URL & Item Sharing:
 * - On Mobile: Automatically opens native OS share sheet (WhatsApp, Telegram, Messages, AirDrop)
 * - On Desktop / Unsupported: Seamlessly copies full URL to clipboard with instant visual feedback
 */
export function useSharePage(hookOverrides?: ShareOverrides): UseSharePageReturn {
  const [status, setStatus] = useState<ShareStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const sharePage = useCallback(
    async (callOverrides?: ShareOverrides): Promise<void> => {
      if (status !== 'idle') return;

      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      const rawUrl = callOverrides?.url || hookOverrides?.url || currentUrl;

      // Ensure absolute URL if relative path provided
      const absoluteUrl = rawUrl.startsWith('http')
        ? rawUrl
        : typeof window !== 'undefined'
        ? `${window.location.origin}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
        : rawUrl;

      const title =
        callOverrides?.title ||
        hookOverrides?.title ||
        (typeof document !== 'undefined' ? document.title : 'Signature Aura Developers');

      const text =
        callOverrides?.text ||
        hookOverrides?.text ||
        `${title} — Explore luxury real estate with Signature Aura Developers`;

      const shareData = { title, text, url: absoluteUrl };
      let finalStatus: ShareStatus = 'idle';

      // A. Mobile Native Web Share API
      if (isWebShareSupported()) {
        try {
          await navigator.share(shareData);
          finalStatus = 'shared';
        } catch (error) {
          // If user aborted / dismissed share sheet, do not show error or copy
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
          // Fallback to clipboard on error
          const copied = await copyToClipboard(shareData.url);
          finalStatus = copied ? 'copied' : 'error';
        }
      } else {
        // B. Desktop: Direct Clipboard Copy
        const copied = await copyToClipboard(shareData.url);
        finalStatus = copied ? 'copied' : 'error';
      }

      setStatus(finalStatus);

      // Auto-reset state after 2.5 seconds
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setStatus('idle');
      }, 2500);
    },
    [status, hookOverrides]
  );

  return {
    sharePage,
    status,
    isSupported: isWebShareSupported(),
  };
}
