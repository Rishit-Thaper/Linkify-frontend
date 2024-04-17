export interface User {
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface ProfileType {
    bio: string;
    avatar: FileList;
    dateOfBirth: string;
}
export interface Profile {
    bio: string;
    avatar: string;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}
export interface LinkType {
    updatedAt: string | number | Date;
    _id: string;
    url: string;
    title: string;
}

export interface CompleteProfile {
    bio: string;
    avatar: string;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    users: User[];
    links: LinkType[];
}
