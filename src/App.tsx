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
import { v4 } from "uuid";
import { flattenArr, reverseFlattern } from "./utils/helper";

function App() {
  const [files, setFiles] = useState<{ [key: string]: MarkdownFile }>(
    flattenArr(defaultList)
  );
  const filesArr = reverseFlattern(files);

  const [activeFileId, setActiveFileId] = useState<string>("");
  const activeFile = files[activeFileId];

  const [openFileIds, setOpenFileIds] = useState<string[]>([]);
  const openFiles = openFileIds.map((id) => {
    return files[id];
  });

  const [unsavedFileIds, setUnsavedFileIds] = useState<string[]>([]);

  const [searchedFiles, setSearchedFiles] = useState<MarkdownFile[]>([]);
  const showFiles = searchedFiles.length ? searchedFiles : filesArr;

  const [addingFiles, setAddingFiles] = useState<{
    [key: string]: MarkdownFile;
  }>({});
  const addingFilesArr = reverseFlattern(addingFiles);

  const updateFile = (
    id: string,
    key: "title" | "body",
    value: string
  ): MarkdownFile => {
    return { ...files[id], [key]: value };
  };

  const handleEdit = (id: string, value: string) => {
    setFiles({ ...files, [id]: updateFile(id, "title", value) });

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

  const handleTitleClick = (id: string) => {
    setActiveFileId(id);
    if (!openFileIds.includes(id)) {
      setOpenFileIds([...openFileIds, id]);
    }
  };

  const handleFinish = (name: string) => {
    name &&
      setFiles({
        ...files,
        [addingFilesArr[0].id]: { ...addingFilesArr[0], title: name },
      });
    setAddingFiles({});
  };

  const handleDelete = (id: string) => {
    handleClose(id);

    delete files[id];
    setFiles(files);
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        <div className="col-3 bg-light left-panel px-0">
          <FileSearch
            title="我的云文件"
            onFileSearch={(value: string) =>
              setSearchedFiles(
                filesArr.filter((file) => file.title.includes(value))
              )
            }
          />
          <FileList
            files={showFiles}
            fileClick={handleTitleClick}
            rename={(id, name) => {
              setFiles({ ...files, [id]: updateFile(id, "title", name) });
            }}
            fileDelete={handleDelete}
          />
          {/* 这里的第二个 FileList 组件就等于经典的 CRUD 构型中的【添加、编辑对话框】*/}
          <FileList files={addingFilesArr} adding onFinish={handleFinish} />
          <div className="row g-0 button-group">
            <div className="col d-grid">
              <button
                type="button"
                className="btn-primary btn no-border"
                onClick={() => {
                  const newId = v4();
                  setAddingFiles({
                    newId: {
                      id: newId,
                      title: "",
                      body: "",
                      createAt: new Date().getTime(),
                    },
                  });
                }}
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
