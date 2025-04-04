export interface Audio {
    name: string;
    duration: string;
    download: string;
    src: string;
    active: boolean;
}


export const sampleAudioList: Audio[] = [
    {
        name: "Group 1 - Morning Session",
        duration: "24:35",
        download: 'link',
        src: "/audio/group1-morning.mp3",
        active: false
    },
    {
        name: "Group 2 - Workshop Discussion",
        duration: "42:18",
        download: 'link',
        src: "/audio/group2-workshop.mp3",
        active: false
    },
    {
        name: "Group 3 - Keynote Speech",
        duration: "36:50",
        download: 'link',
        src: "/audio/group3-keynote.mp3",
        active: false
    },
    {
        name: "Group 4 - Panel Debate",
        duration: "58:22",
        download: 'link',
        src: "/audio/group4-panel.mp3",
        active: false
    },
    {
        name: "Group 5 - Q&A Session",
        duration: "31:07",
        download: 'link',
        src: "/audio/group5-qa.mp3",
        active: false
    },
    {
        name: "Group 6 - Closing Remarks",
        duration: "15:45",
        download: 'link',
        src: "/audio/group6-closing.mp3",
        active: false
    },
    {
        name: "Group 7 - Networking Highlights",
        duration: "19:30",
        download: 'link',
        src: "/audio/group7-networking.mp3",
        active: false
    },
    {
        name: "Group 7 - Networking Highlights",
        duration: "19:30",
        download: 'link',
        src: "/audio/group7-networking.mp3",
        active: false
    }
];