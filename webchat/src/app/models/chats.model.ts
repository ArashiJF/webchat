import { Messages } from './messages.model';

//model that takes the structure of the chats from the api

export class Chats {
    id: string;
    title: string;
    userlist: string[];
    message: Messages[];
    chattype: number;
}