export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Profile {
  bio: string;
  avatar: string;
  dateOfBirth: string;
}

export interface Link {
  url: string;
  title: string;
}
