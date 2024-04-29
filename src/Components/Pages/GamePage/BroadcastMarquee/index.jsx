import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import { Timestamp } from 'firebase/firestore';
import { deleteBroadcast } from '../../../../firebase/firestore';
import { useState } from 'react';

const StyledMarquee = styled(Marquee)`
  background-color: rgba(0 0, 0, 0.7);
  padding: 10px;
`;

const Messages = styled.span`
  cursor: ${(props) =>
    props.$canedit ? `url(/images/trashIconO.png), pointer` : 'auto'};
`;
const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 160px;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  background-color: #282d4e;
  z-index: 100;
  display: flex;
  flex-direction: column;
  cursor: auto;
  align-items: center;
  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      gap: 15px;
      button {
        padding: 5px 10px;
        height: 30px;
        background-color: inherit;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: #3e477c;
        }
      }
    }
  }
`;

export default function BroadcastMarquee({ broadcasts, userId, roomId }) {
  const [showDialog, setShowDialog] = useState(false);
  const [docId, setDocId] = useState('');

  const handleBroadcastDelete = (docId) => {
    deleteBroadcast({ roomId, docId });
  };

  const Dialog = ({ docId, setShowDialog }) => {
    return (
      <Wrapper>
        <div>
          <span>要刪除此廣播嗎?</span>
          <div>
            <button onClick={() => handleBroadcastDelete(docId)}>確認</button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDialog(false);
              }}
            >
              取消
            </button>
          </div>
        </div>
      </Wrapper>
    );
  };
  return (
    <>
      <StyledMarquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        play={!showDialog}
      >
        {broadcasts.map((broadcast, index) => {
          const fireTimestamp = new Timestamp(
            broadcast.publishTime.seconds,
            broadcast.publishTime.nanoseconds
          );
          const publishTime = fireTimestamp.toDate();
          const formattedTime = `${publishTime.getFullYear()}-${
            publishTime.getMonth() + 1
          }-${publishTime.getDate()} ${publishTime.getHours()}:${publishTime.getMinutes()}`;
          return (
            <Messages
              key={index}
              style={{ display: 'inline-block', marginRight: '300px' }}
              $canedit={broadcast.userId === userId}
              onClick={() => {
                if (broadcast.userId !== userId) return;
                setShowDialog(true);
                setDocId(broadcast.id);
              }}
            >
              {`${broadcast.charName}(${formattedTime}): ${broadcast.content}`}
            </Messages>
          );
        })}
      </StyledMarquee>
      {showDialog && <Dialog docId={docId} setShowDialog={setShowDialog} />}
    </>
  );
}
