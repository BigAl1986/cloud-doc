import React, { useEffect, useRef, useState } from "react";
import { FileSearchProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useKeyPress } from "../hooks/useKeyPress";

export default function FileSearch(props: FileSearchProps) {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const closeInput = () => {
    setActive(false);
    setValue("");
    props.onFileSearch("");
  };
  const enterPressed = useKeyPress("Enter");
  const escPressed = useKeyPress("Escape");

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  useEffect(() => {
    if (enterPressed && active) props.onFileSearch(value);
    if (escPressed && active) closeInput();
    // const handleInputKeyup = (e: KeyboardEvent) => {
    //   const { key } = e;
    //   if (key === "Enter" && active) {
    //     props.onFileSearch?.(value);
    //   } else if (key === "Escape" && active) {
    //     closeInput(e);
    //   }
    // };
    // document.addEventListener("keyup", handleInputKeyup);
    // return () => {
    //   document.removeEventListener("keyup", handleInputKeyup);
    // };
  });

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center file-search mb-0">
      {active ? (
        <>
          <input
            className="form-control"
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" className="btn-icon ms-2" onClick={closeInput}>
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
