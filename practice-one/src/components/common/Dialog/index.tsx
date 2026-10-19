import React, { MouseEvent, ReactNode, useEffect, useId, useRef } from 'react';
import { IconNames } from '@enums/Icon';
import Icon from '@components/common/Icon';

// Everything Tab can reach inside the dialog
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DialogProps {
  title: string;
  description: string;
  // Shown in a danger-soft circle next to the title (decorative)
  icon?: IconNames;
  // Extra content under the text, e.g. an error alert
  children?: ReactNode;
  // The buttons, in DOM order (the first focusable one gets focus on open)
  actions: ReactNode;
  onClose: () => void;
  // False blocks Esc and backdrop clicks, e.g. while a delete is running
  dismissible?: boolean;
}

// A modal alert dialog (design/specs/delete-dialog.md): one backdrop, focus moves in on open, Tab stays inside,
// Esc or a backdrop click closes it, and focus goes back to the element that opened it
const Dialog: React.FC<DialogProps> = ({ title, description, icon, children, actions, onClose, dismissible = true }) => {
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Read the latest props from the keydown listener without re-adding it
  const closeRef = useRef<(() => void) | null>(null);
  closeRef.current = dismissible ? onClose : null;

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { overflow } = document.body.style;

    // The page behind can't scroll
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      const panel = panelRef.current;

      if (!panel) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Focus can drop to <body> when the focused button gets disabled, so pull it back in
      if (!first || !panel.contains(active)) {
        event.preventDefault();
        (first ?? panel).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeRef.current?.();
  };

  return (
    <div
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
      className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto bg-black/60 px-4 pb-4 pt-24 sm:items-center sm:pt-4"
    >
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        tabIndex={-1}
        className="w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-popover focus:outline-none"
      >
        <div className="flex gap-4">
          {icon ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
              <Icon name={icon} />
            </div>
          ) : null}
          <div className="min-w-0">
            <h2 id={`${id}-title`} className="break-words text-lg font-extrabold leading-snug text-ink">
              {title}
            </h2>
            <p id={`${id}-description`} className="mt-1 text-sm text-muted">
              {description}
            </p>
          </div>
        </div>
        {children ? <div className="mt-5">{children}</div> : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{actions}</div>
      </div>
    </div>
  );
};

export default Dialog;
