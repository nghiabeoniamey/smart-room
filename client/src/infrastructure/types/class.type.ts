export enum TABS {
    INCOMING = "incoming",
    PASSED = "passed"
}

export interface IRoom {
    title: string;
    code: string;
    duration: string | number;
    date: string;
}

export interface TPRoom extends IRoom {
    record: string;
}

export const sampleIRooms: IRoom[] = [
    {
        title: "Lớp học Toán nâng cao",
        code: "MATH101",
        duration: "90",
        date: "09:00 15/11/2023"
    },
    {
        title: "Lớp học Văn học hiện đại",
        code: "LIT202",
        duration: "120",
        date: "09:00 15/11/2023"
    },
    {
        title: "Lớp học Lập trình React",
        code: "DEV303",
        duration: "180",
        date: "09:00 15/11/2023"
    }
];

export const sampleTPRooms: TPRoom[] = [
    {
        title: "Lớp học Lịch sử thế giới",
        code: "HIS101",
        duration: "90",
        date: "09:00 15/11/2023",
        record: "https://example.com/recordings/his101"
    },
    {
        title: "Lớp học Vật lý lượng tử",
        code: "PHY202",
        duration: "120",
        date: "09:00 15/11/2023",
        record: "https://example.com/recordings/phy202"
    },
    {
        title: "Lớp học Thiết kế đồ họa",
        code: "DES303",
        duration: "180",
        date: "09:00 15/11/2023",
        record: "https://example.com/recordings/des303"
    }
];

export const sampleSPRooms: IRoom[] = [
    {
        title: "Lớp học Toán nâng cao",
        code: "MATH101",
        duration: "90",
        date: "09:00 15/11/2023"
    },
    {
        title: "Lớp học Văn học hiện đại",
        code: "LIT202",
        duration: "120",
        date: "09:00 15/11/2023"
    },
    {
        title: "Lớp học Lập trình React",
        code: "DEV303",
        duration: "180",
        date: "09:00 15/11/2023"
    }
];