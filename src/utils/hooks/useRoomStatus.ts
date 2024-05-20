import { useEffect, useState } from 'react';
import { ref, onDisconnect, onValue, update } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import { rtdb } from '@/utils/firebase/realtime';

export function useRoomStatus({ userId, roomId }:{userId:string,roomId:string}) {
  const [onlineStatus, setOnlineStatus] = useState({});
  const location = useLocation();
  useEffect(() => {
    const userStatusRef = ref(rtdb, `rooms/${roomId}/users/${userId}`);

    update(userStatusRef, { online: true });
    onDisconnect(userStatusRef).update({ online: false });

    const roomUsersRef = ref(rtdb, `rooms/${roomId}/users`);
    const unsubscribe = onValue(roomUsersRef, (snapshot) => {
      const users = snapshot.val() || {};
      setOnlineStatus(users);
    });

    return () => {
      unsubscribe();
      update(userStatusRef, { online: false });
    };
  }, [userId, roomId, rtdb, location.pathname]);

  return onlineStatus;
}