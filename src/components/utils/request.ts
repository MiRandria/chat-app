export type User = {
    name: String;
    email: String;
    password: String;
    bio: String;
}

export type UserLogin = {
    email: String;
    password: String;
    name: String;
}

export type Message = {
    channelName: String;
    content: String;
}