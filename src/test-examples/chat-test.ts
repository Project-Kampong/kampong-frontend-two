export interface Message {
  message_id: string;
  receiver: string;
  sender: string;
  message: string;
  reply_id: string | null;
  created_on: string;
  updated_on: string;
  is_seen: boolean;
}

export interface Preview {
  preview_id: string;
  chat_id: string;
  user_id: string;
  nickname: string;
  recent_message: Message;
}

export const messages: Message[] = [
  {
    message_id: '123',
    receiver: 'abc',
    sender: 'myself',
    message: 'This is a message',
    reply_id: null,
    created_on: '19:20',
    updated_on: '19:20',
    is_seen: true,
  },
  {
    message_id: '234',
    receiver: 'myself',
    sender: 'def',
    message:
      'This is a second preview message that is absurdly long, so Im going to write so much bullshit and watch the overflow of the text and I need to make sure that all this is hidden from the user until they click on the chat.',
    reply_id: null,
    created_on: '05:20',
    updated_on: '05:20',
    is_seen: false,
  },
];

export const previews: Preview[] = [
  {
    preview_id: '1',
    chat_id: '1',
    user_id: 'abc',
    nickname: 'Trump',
    recent_message: {
      message_id: '123',
      receiver: 'abc',
      sender: 'myself',
      message: 'This is a message',
      reply_id: null,
      created_on: '19:20',
      updated_on: '19:20',
      is_seen: true,
    },
  },
  {
    preview_id: '2',
    chat_id: '2',
    user_id: 'def',
    nickname: 'Putin',
    recent_message: {
      message_id: '234',
      receiver: 'myself',
      sender: 'def',
      message:
        'This is a second preview message that is absurdly long, so Im going to write so much bullshit and watch the overflow of the text and I need to make sure that all this is hidden from the user until they click on the chat.',
      reply_id: null,
      created_on: '05:20',
      updated_on: '05:20',
      is_seen: false,
    },
  },
];
