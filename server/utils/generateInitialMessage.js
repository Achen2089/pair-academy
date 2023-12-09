function generateInitialMessage(lesson, language) {
    return `
    ## Welcome to our lesson on "${lesson.title}"!

    Today, we will delve into:
    
    ${lesson.details.description}
    
    We have planned the following activities to enhance your learning:
    
    ${lesson.details.activities.map((activity) => `* ${activity}`).join('\n')}
    
    These activities are designed to give you practical experience and reinforce the concepts we'll cover.
    
    Feel free to ask questions and interact as much as you need. Let's start exploring the fascinating world of ${language} programming with this topic.
    
    Are you ready to get started?`;
}

export default generateInitialMessage;