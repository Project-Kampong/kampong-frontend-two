export interface Chatroom {
  chatroom_id: string;
  chatroom_pic: string;
  is_dm: boolean;
  last_seen: string;
  most_recent_msg: Message;
}

export interface Message {
  chatmessage_text: string;
  created_on: string;
  user_id: string;
}
