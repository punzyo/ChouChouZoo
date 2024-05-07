import styled from 'styled-components';
import InviteButton from '../../../Buttons/InviteButton';
import {
  removeUserFromRoom,
  deleteRoomFromAllUsers,
} from '../../../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Cat from '../../../Cat';
import TrashCanIcon from '../../../Icons/TrashCanIcon';
import LeaveRoomIcon from '../../../Icons/LeaveRoomIcon';
import DeleteDialog from './DeleteDialog';
const Wrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      position: relative;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #333a64;
      }
    }
    svg {
      width: 16px;
      height: 16px;
      fill: #fff;
    }
  }

  .middle {
    height: 80%;
    background-image: url(/images/map2.png);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    cursor: pointer;
  }
  .bottom {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    div {
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

export default function Room({
  room,
  userId,
  showDeleteDialog,
  setShowDeleteDialog,
}) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="top">
        <span className="mapName">{room.roomName}</span>
        {
          <div
            onClick={() => {
              setShowDeleteDialog({ show: true, id: room.id });
            }}
          >
            {room.isCreater ? <TrashCanIcon /> : <LeaveRoomIcon />}
            {showDeleteDialog.show && showDeleteDialog.id === room.id && (
              <DeleteDialog
                room={room}
                userId={userId}
                setShowDeleteDialog={setShowDeleteDialog}
              />
            )}
          </div>
        }
      </div>
      <div
        className="middle"
        onClick={() => {
          navigate(`/chouchouzoo/${room.id}/${room.roomName}`);
        }}
      ></div>
      <div className="bottom">
        <div>
          <Cat image={room.character}></Cat>
          <span>{room.charName}</span>
        </div>
        <div className="right">
          <span className="date">
            {new Date(room.joinDate.toDate()).toISOString().slice(0, 10)}
          </span>
          邀請朋友
          <InviteButton
            link={`${window.location.origin}/invite/${room.id}/${room.roomName}`}
            message="邀請連結已複製!"
          />
        </div>
      </div>
    </Wrapper>
  );
}
