import fs from "fs/promises";
import path from "path";

const DATA_DIR =
    path.join(
        process.cwd(),
        "data"
    );

const STORIES_FILE =
    path.join(
        DATA_DIR,
        "stories.json"
    );

function getStoryDir(
    storyId
) {

    return path.join(
        DATA_DIR,
        "stories",
        storyId
    );
}

export async function loadStories() {

    try {

        const data =
            await fs.readFile(
                STORIES_FILE,
                "utf-8"
            );

        return JSON.parse(data);

    } catch {

        return [];
    }
}

export async function createStory(
    title
) {

    const stories =
        await loadStories();

    const storyId =
        `story-${Date.now()}`;

    const story = {
        id: storyId,
        title,
        createdAt:
            new Date()
                .toISOString()
    };

    stories.push(story);

    await fs.mkdir(
        DATA_DIR,
        {
            recursive: true
        }
    );

    await fs.writeFile(
        STORIES_FILE,
        JSON.stringify(
            stories,
            null,
            2
        )
    );

    const storyDir =
        getStoryDir(storyId);

    await fs.mkdir(
        storyDir,
        {
            recursive: true
        }
    );

    await fs.writeFile(
        path.join(
            storyDir,
            "memory.json"
        ),
        JSON.stringify(
            {
                characters: [],
                locations: [],
                timeline: [],
                worldFacts: []
            },
            null,
            2
        )
    );

    await fs.writeFile(
        path.join(
            storyDir,
            "log.json"
        ),
        JSON.stringify(
            [],
            null,
            2
        )
    );

    return story;
}