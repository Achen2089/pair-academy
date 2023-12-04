import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";

import { languageOptions } from "../constants/languageOptions";
import { classnames } from "../utils/general";

import { ToastContainer, toast } from "react-toastify";
import Split from "react-split";
import "react-toastify/dist/ReactToastify.css";

import ChatWindow from "./ChatWindow";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";
import useKeyPress from "../hooks/useKeyPress";


const pythonDefault = `# Start Coding Here!`;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log('apiBaseUrl', apiBaseUrl);
interface LanguageType {
  id: number;
  name: string;
  label: string;
  value: string;
}

const MainPage: React.FC = () => {
  const [code, setCode] = useState(pythonDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: LanguageType) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
    };
    axios.post(`${apiBaseUrl}/compile`, formData)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        const  error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      })
  };

  const checkStatus = async (token: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/check-status/${token}`);
      const statusId = response.data.status.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        showSuccessToast(`Compiled Successfully!`)
        console.log('response.data', response.data)
        return
      }
    } catch(err) {
      console.log('err', err);
      setProcessing(false);
      showErrorToast();
    }
  };

  const showSuccessToast = (msg : string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg?: string, timer?: number) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Split className="flex flex-row" sizes={[33, 67]} minSize={100} gutterSize={10}>
        <div> 
          <ChatWindow />
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between px-4 py-2">
            <LanguagesDropdown onSelectChange={onSelectChange} />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white",
                !code ? "opacity-50" : ""
              )}>
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          <Split className="flex-grow" direction="vertical" sizes={[66, 34]} minSize={50} gutterSize={10}>
            <div>
              <CodeEditor
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={'vs-dark'}
              />
            </div>
            <div>
              <OutputWindow outputDetails={outputDetails} />
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          </Split>
        </div>
      </Split>
    </>

  );
};

export default MainPage;