import manifest from '../../../.design/manifest.json';

export type ToolingProfile = {
  name: string;
  title: string;
  description: string;
  family: 'Web' | 'Mobile' | 'Desktop' | 'Hybrid';
  layers: string;
  roots: string[];
  bundles: string[];
  composite: boolean;
};

const titleOverrides: Record<string, string> = {
  'ios-native': 'iOS native',
  'ipados-native': 'iPadOS native',
  'android-native': 'Android native',
  'macos-native': 'macOS native',
  'windows-native': 'Windows native',
  'linux-gnome': 'Linux / GNOME',
  'linux-kde': 'Linux / KDE Plasma',
  'web-app': 'Web application',
  'web-marketing': 'Web marketing',
  'electron-macos': 'Electron / macOS',
  'electron-windows': 'Electron / Windows',
  'electron-linux-gnome': 'Electron / Linux GNOME',
  'electron-linux-kde': 'Electron / Linux KDE',
};
const titleCase = (value: string) => titleOverrides[value] ?? value.split('-').map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : part).join(' ');
const familyFor = (name: string): ToolingProfile['family'] => name.startsWith('web-') ? 'Web' : name.startsWith('electron-') ? 'Hybrid' : ['ios-native', 'ipados-native', 'android-native'].includes(name) ? 'Mobile' : 'Desktop';

export const toolingProfiles: ToolingProfile[] = Object.entries(manifest.profiles).map(([name, profile]) => ({
  name,
  title: titleCase(name),
  description: profile.description,
  family: familyFor(name),
  layers: `${profile.bundles.length} bundles · ${profile.roots.length} root ${profile.roots.length === 1 ? 'overlay' : 'overlays'}`,
  roots: profile.roots,
  bundles: profile.bundles,
  composite: profile.composite === true,
}));

export const profileFamilies = ['Web', 'Mobile', 'Desktop', 'Hybrid'] as const;
