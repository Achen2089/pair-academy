import { useState } from 'react';
import axios from 'axios';

import { codingLessons } from '../constants/lessons';

export default function LessonWindow() {
    const [openLessonIndex, setOpenLessonIndex] = useState(-1);

    const toggleLesson = (index : number) => {
        if (openLessonIndex === index) {
            setOpenLessonIndex(-1);
        } else {
            setOpenLessonIndex(index);
        }
    };

    return (
        <div className="lesson-window max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center my-4">Programming Lessons</h2>
            {codingLessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="mb-2">
                    <div 
                        onClick={() => toggleLesson(lessonIndex)}
                        className="flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                        <span className={`mr-2 transform ${openLessonIndex === lessonIndex ? 'rotate-90' : ''}`}>
                            &#9654; {/* Unicode for right arrow */}
                        </span>
                        <h3 className="text-lg font-semibold flex-grow">
                            Lesson {lessonIndex + 1}: {lesson.title}
                        </h3>
                    </div>
                    {openLessonIndex === lessonIndex && (
                        <ul className="bg-gray-100 p-4 rounded-b-md">
                            {lesson.sublessons.map((sublesson, sublessonIndex) => (
                                <li key={sublessonIndex} className="grid grid-cols-3 mb-2 items-center">
                                    <div className="col-span-2">
                                        <span className="font-medium">Sublesson {sublessonIndex + 1}: </span>
                                        {sublesson.title}
                                        <p className="text-sm mt-1">{sublesson.details.description}</p>
                                    </div>
                                    <button 
                                        onClick={() => onSublessonSelect(lessonIndex, sublessonIndex)}
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