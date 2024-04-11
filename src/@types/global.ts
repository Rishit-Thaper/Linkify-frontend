export interface User {
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface Profile {
    bio: string;
    avatar: FileList;
    dateOfBirth: string;
}

export interface Link {
    url: string;
    title: string;
}
