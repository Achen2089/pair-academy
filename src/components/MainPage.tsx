import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";

import { languageOptions } from "../constants/languageOptions";
import { classnames } from "../utils/general";

import { ToastContainer, toast } from "react-toastify";
import Split from "react-split";
import "react-toastify/dist/ReactToastify.css";

import ChatWindow from "./ChatWindow";
import LessonWindow from "./LessonWindow";
import DiagramWindow from "./DiagramWindow";
import HelpWindow from "./HelpWindow";
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

type Message = {
  type: 'user' | 'tutor';
  content: string;
};

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("lessons");
  const [code, setCode] = useState(pythonDefault);
  const [messages, setMessages] = useState<Message[]>([]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
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
    setShowOutput(true)
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
      <Split 
        className="flex flex-row" 
        sizes={[33, 67]} 
        minSize={100} 
        gutterSize={5}
        gutterStyle={(dimension) => ({
          backgroundColor: '#ddd', // Light grey color
          margin: '5px',
          width: dimension === 'width' ? '10px' : undefined, // Set width only if the dimension is 'width'
        })}
      >
        <div className="flex flex-col">
            {/* Tab buttons */}
            <div className="bg-gray-100 p-2 flex space-x-1">
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-t-lg ${
                  activeTab === 'lessons' ? 'bg-white' : 'text-gray-500 bg-gray-200 hover:bg-white'
                }`}
                onClick={() => setActiveTab('lessons')}
              >
                Lessons
              </button>
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-t-lg ${
                  activeTab === 'chat' ? 'bg-white' : 'text-gray-500 bg-gray-200 hover:bg-white'
                }`}
                onClick={() => setActiveTab('chat')}
              >
                Chat
              </button>
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-t-lg ${
                  activeTab === 'diagram' ? 'bg-white' : 'text-gray-500 bg-gray-200 hover:bg-white'
                }`}
                onClick={() => setActiveTab('diagram')}
              >
                Diagram
              </button>
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-t-lg ${
                  activeTab === 'help' ? 'bg-white' : 'text-gray-500 bg-gray-200 hover:bg-white'
                }`}
                onClick={() => setActiveTab('help')}
              >
                Help
              </button>
            </div>

            {/* Tab content */}
            <div className="border p-4">
              {activeTab === 'lessons' && <LessonWindow messages = {messages} setMessages={setMessages} setActiveTab={setActiveTab} language = {language.name}/>}
              {activeTab === 'chat' && <ChatWindow messages={messages} setMessages={setMessages} />}
              {activeTab === 'help' && <HelpWindow />}
              {activeTab === 'diagram' && <DiagramWindow />}
            </div>
          </div>        
        <div className="w-full px-3">
          <div className="flex flex-row justify-between px-4 py-2">
            <LanguagesDropdown
              onSelectChange={onSelectChange}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={`py-1 px-4 text-xs font-semibold rounded-lg ${
                !code ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition duration-150 ease-in-out disabled:opacity-50`}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
            <div className="">
              <CodeEditor
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={'vs-dark'}
              />
            </div>
            {showOutput && (
              <div>
                <OutputWindow outputDetails={outputDetails} />
                {outputDetails && <OutputDetails outputDetails={outputDetails} />}
              </div>
            )}
            <br/>
            <button
              onClick={() => setShowOutput(prev => !prev)}
              className={`py-1 px-4 text-xs font-semibold rounded-lg ${
                showOutput ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
              } transition duration-150 ease-in-out`}
            >
              {showOutput ? "Hide Output" : "Show Output"}
            </button>
        </div>
      </Split>
    </>

  );
};

export default MainPage;