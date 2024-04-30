import styled from 'styled-components';
import { useState } from 'react';
import { useFormInput } from '../../../../../utils/hooks/useFormInput';
import { sendBroadcast } from '../../../../../firebase/firestore';
import DatePicker from 'react-datepicker';

const Wrpper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: auto;

  > div {
    display: flex;
    align-items: center;
    label {
      width: 80px;
      display: flex;
      align-items: center;
    }
  }
  .title button {
    background-color: inherit;
    border-radius: 5px;
    margin-left: auto;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #3e477c;
    }
  }
  select {
    border-radius: 5px;
    padding: 5px;
    background-color: inherit;
    border: 1px solid #3e477c;
    outline: none;
    option {
      background-color: inherit; /* 繼承父元素的背景顏色 */
      color: black; /* 文本顏色 */
    }
  }
  .date {
    > div {
      input {
        width: 180px;
      }
    }
    input {
      cursor: pointer;
    }
  }
  .content {
    align-items: start;
    textarea {
      flex-grow: 1;
      height: 90px;
      background-color: inherit;
      border: 1px solid #3e477c;
      border-radius: 5px;
      resize: none;
      outline: none;
      padding: 5px;
    }
  }
`;
export default function BroadCast({ roomId, userId, playerCharName }) {
  const [publishTime, setPublishTime] = useState(new Date());
  const broadCastTitleInput = useFormInput('');
  const broadCastContentInput = useFormInput('');
  const hourSelectedInput = useFormInput(1);

  const handleBroadcastClick = async () => {
    const publishTimeObj = new Date(publishTime);
    const hoursToAdd = parseInt(hourSelectedInput.value, 10);

    const expirationTimeObj = new Date(
      publishTimeObj.getTime() + hoursToAdd * 60 * 60 * 1000
    );
    const expirationTime = expirationTimeObj.toISOString();
    const broadcastData = {
      userId,
      charName: playerCharName,
      title: broadCastTitleInput.value,
      publishTime,
      expirationTime,
      content: broadCastContentInput.value,
    };
    console.log('廣播', broadcastData);
    const response = await sendBroadcast({ roomId, broadcastData });
    console.log('發布玩', response);
    broadCastTitleInput.clear();
    broadCastContentInput.clear();
    hourSelectedInput.reset();
  };
  return (
    <Wrpper>
      <div className="title">
        <label htmlFor="title">標題</label>
        <input
          type="text"
          id="title"
          value={broadCastTitleInput.value}
          onChange={broadCastTitleInput.onChange}
        />
        <button onClick={handleBroadcastClick}>發佈廣播</button>
      </div>
      <div className="date">
        <label htmlFor="datepicker">發佈時間</label>
        <DatePicker
          selected={publishTime}
          onChange={(date) => setPublishTime(date)}
          showTimeSelect
          minDate={new Date()}
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          id="datepicker"
        />
      </div>
      <div>
        <label htmlFor="hour-select">選擇時長：</label>
        <select
          id="hour-select"
          value={hourSelectedInput.value}
          onChange={hourSelectedInput.onChange}
        >
          {[1, 2, 3, 4, 5, 6].map((h) => (
            <option key={h} value={h}>
              {h} 小時
            </option>
          ))}
        </select>
      </div>
      <div className="content">
        <label htmlFor="content">內容</label>
        <textarea
          id="content"
          cols="30"
          rows="10"
          value={broadCastContentInput.value}
          onChange={broadCastContentInput.onChange}
        ></textarea>
      </div>
    </Wrpper>
  );
}