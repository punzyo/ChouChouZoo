import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase/firestore';
import { resetUnreadMessage } from '@/utils/firebase/firestore';

interface UseUnreadMessagesParams {
  userId: string;
  roomId: string;
  privateChannelId: string;
  isPublicChannel: boolean;
  minimizeMessages: boolean;
}
export function useUnreadMessages({
  userId,
  roomId,
  privateChannelId,
  isPublicChannel,
  minimizeMessages,
}: UseUnreadMessagesParams) {
  const [messages, setMessages] = useState<{
    [key: string]: { count: number };
  }>({});

  useEffect(() => {
    if (!roomId || !userId) return;

    const messageRef = doc(db, `rooms/${roomId}/unReadMessages/${userId}`);

    const unsubscribe = onSnapshot(
      messageRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          const privateChannelCount =
            data?.messages[privateChannelId]?.count || 0;

          if (
            !minimizeMessages &&
            !isPublicChannel &&
            privateChannelCount > 0
          ) {
            resetUnreadMessage({ roomId, userId, privateChannelId });
          } else {
            setMessages(data.messages || []);
          }
        } else {
          setMessages({});
        }
      },
      (err) => {
        console.error('Error while fetching the message:', err);
      }
    );

    return () => unsubscribe();
  }, [userId, roomId, privateChannelId, isPublicChannel, minimizeMessages]);

  return messages;
}
