import { designColors, designTypography } from './system';

export const siteTokenMap: Record<string, string> = {
  '--canvas': designColors.canvas,
  '--surface': designColors.surface,
  '--surface-subtle': designColors['surface-subtle'],
  '--surface-hover': designColors['surface-hover'],
  '--surface-selected': designColors['surface-selected'],
  '--ink': designColors['on-surface'],
  '--ink-secondary': designColors['on-surface-secondary'],
  '--ink-muted': designColors['on-surface-muted'],
  '--clay': designColors.primary,
  '--clay-dark': designColors['primary-hover'],
  '--clay-soft': designColors['primary-soft'],
  '--on-primary': designColors['on-primary'],
  '--border-soft': designColors['border-soft'],
  '--border': designColors.border,
  '--border-strong': designColors['border-strong'],
  '--focus': designColors.focus,
  '--success': designColors.success,
  '--success-soft': designColors['success-soft'],
  '--warning': designColors.warning,
  '--warning-soft': designColors['warning-soft'],
  '--error': designColors.error,
  '--error-soft': designColors['error-soft'],
  '--info': designColors.info,
  '--info-soft': designColors['info-soft'],
  '--font': designTypography['body-md']?.fontFamily ?? 'Inter, ui-sans-serif, sans-serif',
};

export const siteTokenCss = `html:root{${Object.entries(siteTokenMap).map(([name, value]) => `${name}:${value}`).join(';')}}`;
