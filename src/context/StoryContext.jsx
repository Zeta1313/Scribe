import { createContext, useContext, useState } from "react";

const StoryContext = createContext();

export function StoryProvider({
    children
}) {

    const [
        currentStory,
        setCurrentStoryState
    ] = useState(
        localStorage.getItem(
            "currentStory"
        ) || "default"
    );

    function setCurrentStory(
        storyId
    ) {

        localStorage.setItem(
            "currentStory",
            storyId
        );

        setCurrentStoryState(
            storyId
        );
    }

    return (

        <StoryContext.Provider
            value={{
                currentStory,
                setCurrentStory
            }}
        >

            {children}

        </StoryContext.Provider>

    );
}

export function useStory() {

    return useContext(
        StoryContext
    );
}