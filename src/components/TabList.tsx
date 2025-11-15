import React from "react";
import { TabListProps } from "./types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./TabList.css";

export default function TabList({
  files,
  activeId,
  unsaveIds = [],
  onTabClick,
  onTabClose,
}: TabListProps) {
  const handleClose = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    onTabClose(id);
  };

  return (
    <ul className="nav nav-pills tab-list">
      {files.map((file) => {
        const unsaved = unsaveIds.includes(file.id);
        const finalClassNames = classNames({
          "nav-link": true,
          active: file.id === activeId,
          unsaved,
        });
        return (
          <li
            className="nav-item"
            key={file.id}
            onClick={() => onTabClick(file.id)}
          >
            <a href="#" className={finalClassNames}>
              {file.title}
              <FontAwesomeIcon
                icon={faTimes}
                title="删除"
                className="ms-2 close-icon"
                onClick={(e) => handleClose(e, file.id)}
              />
              {unsaved && (
                <span className="rounded-circle unsaved-icon ms-2"></span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
