import React from 'react';

interface IconProps {
  name?: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const Icon = ({ name = "FileText", className = "", size = 24, style }: IconProps) => {
  const icons: Record<string, string> = {
    Plus: "M12 5v14m-7-7h14",
    Search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    ChevronRight: "M9 5l7 7-7 7",
    FileText: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8m8 4H8m2-8H8",
    Download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3",
    Sparkles: "M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7l2-7z",
    Target: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-7a3 3 0 100-6 3 3 0 000 6z",
    Users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8 2c0 1.11-.89 2-2 2s-2-.89-2-2 .89-2 2-2 2 .89 2 2z",
    BookOpen: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zm20 0h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z",
    Lightbulb: "M9 21h6m-6 0v-1a4 4 0 01-4-4V9a7 7 0 1114 0v7a4 4 0 01-4 4v1m-6 0h6M12 3v3",
    Settings: "M12 15a3 3 0 100-6 3 3 0 000 6zm9.5-3a9.5 9.5 0 11-19 0 9.5 9.5 0 0119 0z",
    Check: "M20 6L9 17l-5-5",
    X: "M18 6L6 18M6 6l12 12",
    Copy: "M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2zm2 0h4v4h4",
    Calendar: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
    Trash2: "M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2m-6 5v6m4-6v6",
    Edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-1.5-10.5a2.121 2.121 0 113 3L12 18l-4 1 1-4 7.5-7.5z",
    Edit2: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-1.5-10.5a2.121 2.121 0 113 3L12 18l-4 1 1-4 7.5-7.5z",
    Save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
    ExternalLink: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6m0 0v6m0-6L10 14",
    ArrowRight: "M5 12h14m-7-7l7 7-7 7",
    ArrowLeft: "M19 12H5m7 7l-7-7 7-7",
    Menu: "M3 12h18M3 6h18M3 18h18",
    Home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    FolderOpen: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    TrendingUp: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    Eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    Upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5-5 5m5-5v12",
    Tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
    Package: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  };

  const path = icons[name] || icons.FileText;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d={path} />
    </svg>
  );
};

// Export individual icon components for convenience
const createIconComponent = (iconName: string) => {
  const IconComponent = (props: Omit<IconProps, 'name'>) => {
    return <Icon name={iconName} {...props} />;
  };
  IconComponent.displayName = iconName;
  return IconComponent;
};

export const Plus = createIconComponent('Plus');
export const Search = createIconComponent('Search');
export const ChevronRight = createIconComponent('ChevronRight');
export const FileText = createIconComponent('FileText');
export const Download = createIconComponent('Download');
export const Sparkles = createIconComponent('Sparkles');
export const Target = createIconComponent('Target');
export const Users = createIconComponent('Users');
export const BookOpen = createIconComponent('BookOpen');
export const Lightbulb = createIconComponent('Lightbulb');
export const Settings = createIconComponent('Settings');
export const Check = createIconComponent('Check');
export const X = createIconComponent('X');
export const Copy = createIconComponent('Copy');
export const Calendar = createIconComponent('Calendar');
export const Trash2 = createIconComponent('Trash2');
export const Edit = createIconComponent('Edit');
export const Edit2 = createIconComponent('Edit2');
export const Save = createIconComponent('Save');
export const ExternalLink = createIconComponent('ExternalLink');
export const ArrowRight = createIconComponent('ArrowRight');
export const ArrowLeft = createIconComponent('ArrowLeft');
export const Menu = createIconComponent('Menu');
export const Home = createIconComponent('Home');
export const FolderOpen = createIconComponent('FolderOpen');
export const TrendingUp = createIconComponent('TrendingUp');
export const Eye = createIconComponent('Eye');
export const Upload = createIconComponent('Upload');
export const Tag = createIconComponent('Tag');
export const Package = createIconComponent('Package');
export const ClipboardList = createIconComponent('FileText');
export const Database = createIconComponent('FileText');
export const FileEdit = createIconComponent('Edit');
export const Video = createIconComponent('FileText');
export const Zap = createIconComponent('Sparkles');
export const CheckCircle2 = createIconComponent('Check');
export const Clock = createIconComponent('Calendar');
