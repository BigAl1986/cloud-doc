export interface FileSearchProps {
  title: string;
  onFileSearch: (value: string) => void;
}

export interface File {
  id: string;
  title: string;
  body: string;
  createAt: number;
}

export interface FileListProps {
  files: File[];
  fileClick: (id: string) => void;
  fileEdit: (id: string, name: string) => void;
  fileDelete: (id: string) => void;
}

export interface TabListProps {
  files: File[];
  activeId: string;
  unsaveIds?: string[];
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
}
