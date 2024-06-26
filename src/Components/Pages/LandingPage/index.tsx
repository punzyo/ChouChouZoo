import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Buttons/Button';
import Logo from '@/Components/Logo';
import InfoCard from './InfoCard';
import { CalicoCat, GreyCat, OrangeCat } from '@/Components/Icons/CatIcons';
const containerStyles = css`
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background-color 200ms ease 0s, border-color 200ms ease 0s;
`;
const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 10px 30px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue4};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 50px;
    height: 100%;
    span {
      color: ${({ theme }) => theme.colors.white};
      font-size: 50px;
      letter-spacing: 6px;
    }
  }
  .right {
    align-items: center;
    display: flex;
    gap: 20px;
    min-width: 200px;
    height: 100%;
  }
  input {
    width: 50px;
  }
`;
const Main = styled.main`
  width: 100%;
  min-height: calc(100% - 80px);
  padding: 120px 40px 20px;
  color: white;
  letter-spacing: 1px;
  background-color: #373e6c;
  ${({ theme }) => theme.breakpoints.sm} {
    gap: 25px;
    padding: 50px 15px;
  }
  .top {
    height: 450px;
    display: flex;
    ${({ theme }) => theme.breakpoints.sm} {
      height: 300px;
    }
    .left {
      width: 50%;
      color: white;
      animation: slideIn5 0.7s ease-out;
      > div {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
      }
      h1 {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1.2;
        ${({ theme }) => theme.breakpoints.sm} {
          font-size: 2.8rem;
        }
      }
    }
    .right {
      width: 50%;
      border-radius: 10px;
      aspect-ratio: 1/1;
      overflow: hidden;
      animation: slideIn 0.7s ease-out;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(20%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideIn5 {
      from {
        transform: translateX(-20%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
  .bottom {
    width: 100%;
    min-height: 200px;
    display: grid;
    margin: 80px 0;
    gap: 50px;
    grid-template-columns: repeat(3, 1fr);
    ${({ theme }) => theme.breakpoints.sm} {
      gap: 15px;
      grid-template-columns: repeat(1, 1fr);
    }
    > div {
      border-radius: 10px;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.backgroundBlue3};
      padding: 30px;
      ${({ theme }) => theme.breakpoints.sm} {
        padding: 15px;
      }
      h2 {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      svg {
        width: 30px;
        height: 30px;
        padding-bottom: 2px;
        margin-right: 5px;
      }
    }
    > div:first-of-type {
      animation: slideIn2 0.5s ease-out;
    }
    > div:nth-of-type(2) {
      animation: slideIn3 0.6s ease-out;
    }
    > div:nth-of-type(3) {
      animation: slideIn4 0.7s ease-out;
    }
    @keyframes slideIn2 {
      from {
        transform: translateY(20%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideIn3 {
      from {
        transform: translateY(30%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideIn4 {
      from {
        transform: translateY(40%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`;

const SignUp = styled.div`
  ${containerStyles}
  width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue6};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue7};
  }
  button {
    font-size: 16px;
    font-weight: bold;
    background-color: inherit;
    color: ${({ theme }) => theme.colors.white};
  }
`;
const SignIn = styled.div`
  width: 90px;
  height: 40px;
  > button {
    width: 100%;
  }
`;
export default function LandingPage() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Header>
        <div className="left">
          <Logo></Logo>
          <span>Cater town</span>
        </div>
        <div className="right">
          <SignUp onClick={() => handleNavigation('/signUp')}>
            <button>註冊</button>
          </SignUp>
          <SignIn onClick={() => handleNavigation('/signIn')}>
            <Button content="登入" />
          </SignIn>
        </div>
      </Header>
      <Main>
        <div className="top">
          <div className="left">
            <div>
              <h1>讓你的團隊協作，沒有距離</h1>
              <SignUp onClick={() => handleNavigation('/signUp')}>
                <button>註冊</button>
              </SignUp>
            </div>
          </div>
          <div className="right">
            <img src="/images/map2.png" alt="" />
          </div>
        </div>
        <div className="bottom">
          <InfoCard
            IconComponent={OrangeCat}
            title="讓協作團隊一起在線上相聚"
            description="Cater town提供了一個溫暖的線上虛擬環境，不只有提供視音訊的服務，還有高達50種可愛貓咪可供選擇，讓我們不管身在何方，都能用自己最喜歡的樣貌，和夥伴們一起在線上交流。"
          />
          <InfoCard
            IconComponent={CalicoCat}
            title="獨立空間，各自討論不打擾"
            description="需要分組討論怎麼辦?不用擔心，只要進入特定空間，就不會收到外面視音訊的打擾，只能接收相同空間的訊息，讓分組討論變得更有效率!"
          />
          <InfoCard
            IconComponent={GreyCat}
            title="追蹤PR，變得簡單又有趣"
            description="藉由串接GitHub webhook，當追蹤的repository 收到pull requests時，對應貓咪的頭上就會跑出驚嘆號的通知，讓多人協作的同時享受更多的樂趣。"
          />
        </div>
      </Main>
    </>
  );
}
