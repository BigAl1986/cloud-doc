import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "easymde/dist/easymde.min.css";

import defaultList from "./utils/defaultList.json";
import { MarkdownFile } from "./components/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import TabList from "./components/TabList";
import SimpleMde from "react-simplemde-editor";

function App() {
  const [files, setFiles] = useState<MarkdownFile[]>(defaultList);

  const [activeFileId, setActiveFileId] = useState<string>("");
  const activeFile = files.find((file) => file.id === activeFileId);

  const [openFileIds, setOpenFileIds] = useState<string[]>([]);
  const openFiles = openFileIds.map((id) => {
    return files.find((file) => file.id === id) as MarkdownFile;
  });

  const [unsavedFileIds, setUnsavedFileIds] = useState<string[]>([]);

  const [searchedFiles, setSearchedFiles] = useState<MarkdownFile[]>([]);
  const showFiles = searchedFiles.length ? searchedFiles : files;

  const updateFile = (
    id: string,
    key: "title" | "body",
    value: string
  ): MarkdownFile[] => {
    return files.map((file) => {
      if (file.id === id) file[key] = value;
      return file;
    });
  };

  const handleEdit = (id: string, value: string) => {
    setFiles(updateFile(id, "body", value));

    if (!unsavedFileIds.includes(id))
      setUnsavedFileIds([...unsavedFileIds, id]);
  };

  const handleClose = (id: string) => {
    const newArr = openFileIds.filter((fileId) => fileId !== id);
    setOpenFileIds(newArr);
    if (newArr.length) {
      setActiveFileId(newArr[0]);
    } else {
      setActiveFileId("");
    }
  };

  const handleDelete = (id: string) => {
    handleClose(id);

    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        <div className="col-3 bg-light left-panel px-0">
          <FileSearch
            title="我的云文件"
            onFileSearch={(value: string) =>
              setSearchedFiles(
                files.filter((file) => file.title.includes(value))
              )
            }
          />
          <FileList
            files={showFiles}
            fileClick={(id) => {
              setActiveFileId(id);
              if (!openFileIds.includes(id)) {
                setOpenFileIds([...openFileIds, id]);
              }
            }}
            rename={(id, name) => setFiles(updateFile(id, "title", name))}
            fileDelete={handleDelete}
          />
          <div className="row g-0 button-group">
            <div className="col d-grid">
              <button
                type="button"
                className="btn-primary btn no-border"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                新增
              </button>
            </div>
            <div className="col d-grid">
              <button
                type="button"
                className="btn-success btn no-border"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faFileImport} className="me-2" />
                导入
              </button>
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {!!activeFile ? (
            <>
              <TabList
                files={openFiles}
                activeId={activeFileId}
                unsaveIds={unsavedFileIds}
                onTabClick={(id) => setActiveFileId(id)}
                onTabClose={handleClose}
              />
              <SimpleMde
                key={activeFile?.id}
                value={activeFile?.body}
                options={{
                  minHeight: "460px",
                }}
                onChange={(value) => handleEdit(activeFile.id, value)}
              />
            </>
          ) : (
            <div className="empty-text">选择或创建一个新的 markdown 文档</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
