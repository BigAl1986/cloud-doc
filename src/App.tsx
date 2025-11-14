import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import defaultList from "./utils/defaultList.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import TabList from "./components/TabList";

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        <div className="col-3 bg-light left-panel px-0">
          <FileSearch
            title="我的云文件"
            onFileSearch={(value: string) => console.log(value)}
          />
          <FileList
            files={defaultList}
            fileClick={(id) => console.log("click", id)}
            fileEdit={(id, name) => console.log(id, name)}
            fileDelete={(id) => console.log("delete", id)}
          />
          <div className="row g-0">
            <div className="col d-grid">
              <button
                type="button"
                className="btn-primary btn no-border"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faPlus} />
                新增
              </button>
            </div>
            <div className="col d-grid">
              <button
                type="button"
                className="btn-success btn no-border"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faFileImport} />
                导入
              </button>
            </div>
          </div>
        </div>
        <div className="col-9 bg-light right-panel">
          <TabList
            files={defaultList}
            activeId="0"
            unsaveIds={["0", "1"]}
            onTabClick={(id) => console.log("click", id)}
            onTabClose={(id) => console.log("close", id)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
