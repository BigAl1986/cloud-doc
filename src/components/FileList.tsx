import React, { useEffect, useState } from "react";
import { FileListProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useKeyPress } from "../hooks/useKeyPress";

export default function FileList({
  files,
  adding = false,
  fileAdd,
  fileClick,
  rename,
  fileDelete,
}: FileListProps) {
  const [editingId, setEditingId] = useState<string>("");
  const [editingName, setEditingName] = useState<string>("");

  const closeInput = () => {
    setEditingId("");
    setEditingName("");
  };
  const enterPressed = useKeyPress("Enter");
  const escPressed = useKeyPress("Escape");

  useEffect(() => {
    if (enterPressed && editingId && editingName.trim() !== "") {
      if (adding && fileAdd) {
        fileAdd(editingName);
      } else {
        rename && rename(editingId, editingName);
      }
      closeInput();
    }
    if (escPressed && editingId) {
      if (adding && fileAdd) fileAdd("");
      closeInput();
    }
  });

  useEffect(() => {
    adding && files.length && setEditingId(files[0].id);
  }, [adding, files]);

  return (
    <ul className="list-group list-group-flush">
      {files.map((file) => {
        return (
          <li className="list-group-item d-flex file-item" key={file.id}>
            {file.id === editingId ? (
              <>
                <input
                  autoFocus
                  className="form-control"
                  value={editingName}
                  placeholder="请输入文件名"
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button
                  type="button"
                  className="btn-icon ms-2"
                  onClick={() => {
                    if (adding && fileAdd) fileAdd("");
                    closeInput();
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} title="关闭" />
                </button>
              </>
            ) : (
              <>
                <span className="me-2">
                  <FontAwesomeIcon icon={faMarkdown} />
                </span>
                <span
                  className="flex-grow-1 cursor-pointer"
                  onClick={() => fileClick && fileClick(file.id)}
                >
                  {file.title}
                </span>
                <button
                  type="button"
                  className="btn-icon px-0"
                  onClick={() => {
                    setEditingId(file.id);
                    setEditingName(file.title);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} title="编辑" />
                </button>
                <button
                  type="button"
                  className="btn-icon px-0"
                  onClick={() => fileDelete && fileDelete(file.id)}
                >
                  <FontAwesomeIcon icon={faTrash} title="删除" />
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
