import { useState, useEffect, useRef, useReducer } from 'react';
import styled from 'styled-components';
import BaseGlobalStyle from './BaseGlobalStyle';
import {
  updatePlayerPosition,
  getPlayerPosition,
} from './firebase/firestore';
import { useOtherPlayer } from './utils/hooks/useOherPlayer';
const wrapperWidth = '1400';
const wrapperHeight = '1000';
const mapBorder = '100';
const playerWidth = '100';
const playerHeight = '100';
const Wrapper = styled.div`
  position: relative;
  width: ${wrapperWidth}px;
  height: ${wrapperHeight}px;
  overflow: hidden;
  user-select: none;
`;
const Map = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: ${mapBorder}px solid gray;
  transition: top 0.2s, left 0.2s;
`;
const Player = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  border: 1px solid red;
  background-color: black;
  color: white;
`;
const OtherPlayer = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  background-color: black;
  color: white;
`;
function positionReducer(state, action) {
  switch (action.type) {
    case 'move':
      return {
        ...state,
        top:
          action.payload.top !== undefined
            ? state.top + action.payload.top
            : state.top,
        left:
          action.payload.left !== undefined
            ? state.left + action.payload.left
            : state.left,
      };
    case 'SET_POSITION':
      return action.payload;
    default:
      return state;
  }
}

function App() {
  const [position, dispatchPosition] = useReducer(positionReducer, null);

  const [playerName, setPlayerName] = useState('');
  const nameInput = useRef(null);
  const otherPlayers = useOtherPlayer(playerName);
  
  useEffect(() => {
    if (!playerName) return;
    const handleKeyPress = async (e) => {
      if (!playerName) return;
      let move = { top: 0, left: 0 };
      const moveAmount = 10;

      switch (e.key) {
        case 'ArrowUp':
          move.top = moveAmount;
          break;
        case 'ArrowDown':
          move.top = -moveAmount;
          break;
        case 'ArrowLeft':
          move.left = moveAmount;
          break;
        case 'ArrowRight':
          move.left = -moveAmount;
          break;
        default:
          return;
      }

      dispatchPosition({ type: 'move', payload: move });
      const absolutePosition = playerPosToAbsolute({
        top: position?.top + move.top,
        left: position?.left + move.left,
      });
      await updatePlayerPosition(playerName, absolutePosition);
    };
 
        window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    };
  }, [position]);

  useEffect(() => {
    if (!playerName) return;
    const updatePosition = async () => {
      try {
        const playerPosition = await getPlayerPosition(playerName);
        const mapPosition = playerAbsoluteToMapPos(playerPosition);
        dispatchPosition({ type: 'SET_POSITION', payload:mapPosition });
      } catch (error) {
        console.error('Error updating position:', error);
      }
    };
    updatePosition();
  }, [playerName]);
  const playerPosToAbsolute = (position) => {
    const absoluteLeft =
      wrapperWidth / 2 - playerWidth / 2 - mapBorder - position.left;
    const absoluteTop =
      wrapperHeight / 2 - playerHeight / 2 - mapBorder - position.top;
    console.log(absoluteLeft, absoluteTop);
    return { left: absoluteLeft, top: absoluteTop };
  };

  const playerAbsoluteToMapPos = (position) => {
    const mapLeft =
      wrapperWidth / 2 - playerWidth / 2 - mapBorder - position.left;
    const mapTop =
      wrapperHeight / 2 - playerHeight / 2 - mapBorder - position.top;
    return { left: mapLeft, top: mapTop };
  };
  return (
    <>
      <BaseGlobalStyle />
      {playerName && (
        <Wrapper>
          {position && (
            <Map
              style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
              {otherPlayers &&
                otherPlayers.map((player) => (
                  <OtherPlayer
                    style={{
                      top: `${player.position.top}px`,
                      left: `${player.position.left}px`,
                    }}
                    key={player.name}
                  >
                    {player.name}
                  </OtherPlayer>
                ))}
            </Map>
          )}
          {position && <Player>{playerName}</Player>}
        </Wrapper>
      )}
      <input type="text" placeholder="輸入你的名稱" ref={nameInput} />
      <button
        onClick={() => {
          setPlayerName(nameInput.current.value);
        }}
      >
        送出
      </button>
    </>
  );
}

export default App;
