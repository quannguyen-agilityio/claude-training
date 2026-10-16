import { ButtonVariants, IconButtonVariants } from '@enums/Button';

// Shared class strings from design/cards/_shared/design.js. Copy these instead of writing new ones

export const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas';

const BUTTON_BASE = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition-colors active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 ${FOCUS_RING}`;

export const BUTTON_STYLES: Record<ButtonVariants, string> = {
  [ButtonVariants.PRIMARY]: `${BUTTON_BASE} bg-accent text-on-accent hover:bg-accent-hover`,
  [ButtonVariants.SECONDARY]: `${BUTTON_BASE} border border-line-strong bg-surface text-ink hover:bg-raised`,
  [ButtonVariants.GHOST]: `${BUTTON_BASE} text-ink hover:bg-raised`,
  [ButtonVariants.DANGER]: `${BUTTON_BASE} bg-danger text-on-danger hover:bg-danger-hover`,
  [ButtonVariants.DANGER_SECONDARY]: `${BUTTON_BASE} border border-line-strong bg-surface text-danger hover:bg-danger-soft`,
};

const ICON_BUTTON_BASE = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS_RING}`;

export const ICON_BUTTON_STYLES: Record<IconButtonVariants, string> = {
  [IconButtonVariants.GHOST]: `${ICON_BUTTON_BASE} text-muted hover:bg-raised hover:text-ink`,
  [IconButtonVariants.SECONDARY]: `${ICON_BUTTON_BASE} border border-line-strong bg-surface text-ink hover:bg-raised`,
};

export const FIELD_STYLES = 'block w-full rounded-lg border border-line-strong bg-surface px-3 text-base text-ink placeholder:text-muted transition-colors hover:border-muted focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/30 disabled:cursor-not-allowed disabled:bg-raised disabled:opacity-60';
