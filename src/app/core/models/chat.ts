export interface Chatroom {
  chatroom_id: string;
  chatroom_name: string;
  chatroom_pic: string;
  is_dm: boolean;
  last_seen: Date;
  unread_msg_count: number;
  most_recent_msg: Message;
}

export interface Message {
  chatmessage_id: number;
  chatroom_id: string;
  user_id: string;
  chatmessage_text: string;
  reply_to: number;
  file_links: string[];
  created_on: Date;
  updated_on: Date;
}

export interface ChatUser {
  user_id: string;
  nickname: string;
  profile_picture: string;
}

export interface ChatWindow {
  users: ChatUser[];
  messages: Message[];
}
