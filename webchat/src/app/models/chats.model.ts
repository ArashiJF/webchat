import { Messages } from './messages.model';

export class Chats {
    id: string;
    title: string;
    userlist: string[];
    message: Messages[];
    chattype: number;
}