import React, { useEffect, useRef, useState } from "react";
import { FileSearchProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function FileSearch(props: FileSearchProps) {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const closeInput = (
    e: KeyboardEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActive(false);
    setValue("");
  };

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  useEffect(() => {
    const handleInputKeyup = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "Enter" && active) {
        props.onFileSearch?.(value);
      } else if (key === "Escape" && active) {
        closeInput(e);
      }
    };
    document.addEventListener("keyup", handleInputKeyup);
    return () => {
      document.removeEventListener("keyup", handleInputKeyup);
    };
  });

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center file-search">
      {active ? (
        <>
          <input
            className="form-control"
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" className="btn-icon" onClick={closeInput}>
            <FontAwesomeIcon icon={faTimes} title="关闭" />
          </button>
        </>
      ) : (
        <>
          <span>{props.title}</span>
          <button
            type="button"
            className="btn-icon"
            onClick={() => setActive(true)}
          >
            <FontAwesomeIcon icon={faSearch} title="搜索" />
          </button>
        </>
      )}
    </div>
  );
}
