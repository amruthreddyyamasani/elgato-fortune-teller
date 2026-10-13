import type { ReactNode } from 'react';

interface SpeechBubbleProps {
  children: ReactNode;
  subtitle?: string;
}

export const SpeechBubble = ({ children, subtitle }: SpeechBubbleProps) => (
  <div className="speech-bubble-wrap">
    <div className="speech-bubble" role="status" aria-live="polite" aria-atomic="true">
      <div>{children}</div>
      {subtitle && <p className="bubble-subtitle">{subtitle}</p>}
    </div>
  </div>
);

export default SpeechBubble;
