import React, { useState } from "react";
import { FileSearchProps } from "./types";

export default function FileSearch(props: FileSearchProps) {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className="alert alert-primary">
      {active ? (
        <div className="row">
          <div className="col-8">
            <input
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary col-4"
            onClick={() => setActive(false)}
          >
            关闭
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <span>{props.title}</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setActive(true)}
          >
            搜索
          </button>
        </div>
      )}
    </div>
  );
}
