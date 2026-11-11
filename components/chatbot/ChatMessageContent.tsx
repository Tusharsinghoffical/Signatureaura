'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ChatMessageContentProps {
  content: string;
  isUser?: boolean;
  isDark?: boolean;
}

/**
 * Parses inline markdown:
 * - **bold** and *bold* -> <strong>
 * - `code` (e.g. RERA numbers) -> <span className="font-mono ...">
 * - [Link Text](url) -> Next.js <Link>
 */
function renderInlineContent(text: string, isUser = false, isDark = false) {
  // Pattern matching: [text](url) | **bold** | *italic/bold* | `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, , linkText, linkUrl, doubleBold, singleBold, code] = match;
    const matchIndex = match.index;

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      elements.push(text.slice(lastIndex, matchIndex));
    }

    if (linkText && linkUrl) {
      const isInternal = linkUrl.startsWith('/');
      const linkClass = isUser
        ? 'text-[#FAF9F5] font-semibold underline underline-offset-2 hover:text-[#E8D39E] transition-colors inline-flex items-center gap-0.5 mx-0.5'
        : isDark
        ? 'text-[#E8D39E] font-semibold underline underline-offset-2 hover:text-white transition-colors inline-flex items-center gap-0.5 mx-0.5'
        : 'text-[#845E1B] font-semibold underline underline-offset-2 hover:text-[#5E400F] transition-colors inline-flex items-center gap-0.5 mx-0.5';

      if (isInternal) {
        elements.push(
          <Link
            key={`l-${matchIndex}`}
            href={linkUrl}
            className={linkClass}
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3 h-3 inline-block shrink-0" />
          </Link>
        );
      } else {
        elements.push(
          <a
            key={`a-${matchIndex}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3 h-3 inline-block shrink-0" />
          </a>
        );
      }
    } else if (doubleBold || singleBold) {
      const boldText = doubleBold || singleBold;
      const boldClass = isUser
        ? 'text-[#FAF9F5] font-bold'
        : isDark
        ? 'text-white font-bold'
        : 'text-[#171717] font-bold';

      elements.push(
        <strong
          key={`b-${matchIndex}`}
          className={boldClass}
        >
          {boldText}
        </strong>
      );
    } else if (code) {
      const codeClass = isUser
        ? 'bg-white/20 text-[#FAF9F5] border-white/30 font-medium'
        : isDark
        ? 'bg-[#B99A63]/25 text-[#E8D39E] border-[#B99A63]/40 font-medium'
        : 'bg-[#B99A63]/15 text-[#735118] border-[#B99A63]/30 font-medium';

      elements.push(
        <code
          key={`c-${matchIndex}`}
          className={`font-mono text-[11px] px-1.5 py-0.5 rounded border mx-0.5 ${codeClass}`}
        >
          {code}
        </code>
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push remaining trailing text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default function ChatMessageContent({ content, isUser = false, isDark = false }: ChatMessageContentProps) {
  if (!content) return null;

  // Split content into blocks by double line-breaks
  const blocks = content.split('\n\n').filter(Boolean);

  return (
    <div className={`space-y-2 text-xs sm:text-sm leading-relaxed ${isUser ? 'text-[#FAF9F5]' : isDark ? 'text-stone-200' : 'text-[#222222]'}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();

        // 1. Heading level 3 or 2 (### or ##)
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
          const headingText = trimmed.replace(/^#{2,3}\s+/, '');
          return (
            <h4
              key={bIdx}
              className={`font-serif font-bold text-sm sm:text-base pb-1 mt-1 border-b ${
                isUser 
                  ? 'text-[#FAF9F5] border-white/20' 
                  : isDark
                  ? 'text-[#E8D39E] border-[#B99A63]/30'
                  : 'text-[#845E1B] border-[#B99A63]/30'
              }`}
            >
              {renderInlineContent(headingText, isUser, isDark)}
            </h4>
          );
        }

        // 2. Bullet list block (lines starting with • or - or numbered 1.)
        const lines = trimmed.split('\n');
        const nonEmptyLines = lines.filter(Boolean);
        const isListBlock = nonEmptyLines.length > 0 && nonEmptyLines.every(
          l => l.trim().startsWith('•') || l.trim().startsWith('-') || /^\d+\.\s/.test(l.trim()) || l.trim().startsWith('*')
        );

        if (isListBlock && lines.length > 0) {
          return (
            <ul key={bIdx} className="space-y-1.5 my-1.5 pl-1">
              {lines.filter(Boolean).map((line, lIdx) => {
                const cleanLine = line.trim().replace(/^[•\-\*]\s+/, '').replace(/^\d+\.\s+/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className={`${isDark ? 'text-[#B99A63]' : 'text-[#845E1B]'} mt-1 shrink-0 text-xs`}>◆</span>
                    <span className="flex-1">{renderInlineContent(cleanLine, isUser, isDark)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 3. Regular paragraph (may have single linebreaks inside)
        return (
          <p key={bIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderInlineContent(line, isUser, isDark)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
