import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import { codingLessons } from '../constants/lessons';
interface LessonWindowProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    language: string;
}

type Lesson = {
    title: string;
    details: {
      description: string;
      activities: string[];
    };
  };

type Message = {
type: 'user' | 'tutor';
content: string;
};

const LessonWindow: React.FC<LessonWindowProps> = ({setMessages, setActiveTab, language}) =>{
    const [openLessonIndex, setOpenLessonIndex] = useState(-1);

    const toggleLesson = (index : number) => {
        if (openLessonIndex === index) {
            setOpenLessonIndex(-1);
        } else {
            setOpenLessonIndex(index);
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

    const onLessonSelect = async (lesson: Lesson, moudleIndex: number, lessonIndex: number) => {
        try {
            console.log(language)
            const response = await axios.post('http://localhost:3000/load-context', {lesson, language});
            setActiveTab('chat');
            setMessages(messages => [...messages, { type: 'tutor', content: response.data.message }]);
            setOpenLessonIndex(-1);
            showSuccessToast(`Lesson ${moudleIndex + 1}.${lessonIndex + 1} loaded!`);

        } catch (error) {
            showErrorToast('Error loading lesson context');
        }
    }


    return (
        <div className="lesson-window max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center my-4">Programming Lessons</h2>
            {codingLessons.map((module, moduleIndex) => (
                <div key={moduleIndex} className="mb-2">
                    <div 
                        onClick={() => toggleLesson(moduleIndex)}
                        className="flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                        <span className={`mr-2 transform ${openLessonIndex === moduleIndex ? 'rotate-90' : ''}`}>
                            &#9654; {/* Unicode for right arrow */}
                        </span>
                        <h3 className="text-lg font-semibold flex-grow">
                            Module {moduleIndex + 1}: {module.title}
                        </h3>
                    </div>
                    {openLessonIndex === moduleIndex && (
                        <ul className="bg-gray-100 p-4 rounded-b-md">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="grid grid-cols-3 mb-2 items-center">
                                    <div className="col-span-2">
                                        <span className="font-medium">Lesson {lessonIndex + 1}: </span>
                                        {lesson.title}
                                        <p className="text-sm mt-1">{lesson.details.description}</p>
                                    </div>
                                    <button 
                                        onClick={() => onLessonSelect(lesson, moduleIndex, lessonIndex)}
                                        className="bg-green-500 hover:bg-blue-600 text-white font-bold px-2 rounded justify-self-end text-sm"
                                    >
                                        Load Lesson
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
} 

export default LessonWindow;