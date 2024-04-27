import styled from 'styled-components';
import MemberIcon from '../../../MemberIcon';
import OnlineStatus from '../../../OnlineStatus';
import { useState } from 'react';
import GitHubLogo from '../../../GitHubLogo';
import { useGameSettings } from '../../../../utils/zustand';
const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 90%;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  .onlineBox {
    height: 100%;
    display: flex;
    align-items: end;
    p {
      margin-left: 20px;
    }
    font-size: 10px;
  }
`;
const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
`;
const ProfileWrapper = styled.div`
  position: absolute;
  width: 250px;
  height: 300px;
  top: -310px;
  left: 0;
  padding: 10px;
  background-color: #282d4e;
  border-radius: 5px;
  border: 1px solid #3e477c;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .top {
    width: 100%;
    height: 50px;
    display: flex;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > div {
      &:hover {
        background-color: #3e477c;
      }
      height: 36px;
      display: flex;
      align-items: center;
      padding: 5px;
      > div:first-of-type {
        width: 100px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      border-radius: 5px;
      >svg{
        margin-left: auto;
      }
    }
    svg {
      width: 16px;
      height: 16px;
      fill: white;
    }
  }
`;
export default function PlayerProfile({
  image,
  playerCharName,
  gitHubId,
  permissionLevel,
}) {
  const { setResetPosition } = useGameSettings();
  const [showProfile, setShowProfile] = useState(false);
  return (
    <Wrapper
      onClick={() => {
        setShowProfile(!showProfile);
      }}
    >
      <IconWrapper>
        <MemberIcon image={image} isOnline={null} unreadMessages={0} />
      </IconWrapper>
      <span>{playerCharName}</span>
      <div className="onlineBox">
        <p>上線中</p>
        <OnlineStatus isOnline={true} />
      </div>
      <ProfileWrapper>
        <div className="top">
          <div className="left">
            <IconWrapper>
              <MemberIcon image={image} isOnline={null} unreadMessages={0} />
            </IconWrapper>
          </div>
          <div className="right">
            <span>{playerCharName}</span>
          </div>
        </div>
        <div className="middle">
          <div>
            <div className="github">
              <GitHubLogo />
              <span>GitHub </span>
            </div>
            <span>{gitHubId ? gitHubId : '尚未填寫'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z" />
              </svg>
              <span>權限</span>
            </div>
              <span>{permissionLevel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>

          </div>
          <div onClick={() => setResetPosition(true)}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
              </svg>
              <span>回到起點</span>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    </Wrapper>
  );
}