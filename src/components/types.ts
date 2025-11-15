export interface FileSearchProps {
  title: string;
  onFileSearch: (value: string) => void;
}

export interface MarkdownFile {
  id: string;
  title: string;
  body: string;
  createAt: number;
}

export interface FileListProps {
  files: MarkdownFile[];
  fileClick: (id: string) => void;
  rename: (id: string, name: string) => void;
  fileDelete: (id: string) => void;
}

export interface TabListProps {
  files: MarkdownFile[];
  activeId: string;
  unsaveIds?: string[];
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
}
