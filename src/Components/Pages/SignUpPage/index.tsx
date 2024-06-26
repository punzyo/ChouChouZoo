import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cat from '@/Components/Cat';
import useValidatedInput from '@/utils/hooks/useValidatedInput';
import { registerUserToAuth } from '@/utils/firebase/auth';
import { saveUserToFirestore } from '@/utils/firebase/firestore';
import Logo from '@/Components/Logo';
import type { InputWrapperProps } from '@/types';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-image: url('/images/signInBg.png');
  background-size: cover;
  > button {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;
const SignUpWrapper = styled.div`
  width: 360px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 25px;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div:first-of-type {
    background-position: -1470px 250px;
  }
  > div:nth-of-type(2) {
    background-position: -1280px 250px;
  }
  > div:nth-of-type(3) {
    background-position: -1410px 250px;
  }
`;

const Middle = styled.div`
  width: 100%;
  font-size: 28px;
  line-height: 42px;
  font-weight: bold;
  text-align: center;
  > p:nth-of-type(odd) {
    font-size: 32px;
  }
  > p {
    display: flex;
    font-family: 'Work Sans', sans-serif;
    font-optical-sizing: auto;
  }
  > p:nth-of-type(even) {
    justify-content: flex-end;
  }
`;
const Bottom = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  label {
    display: block;
  }
`;

const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  input {
    outline: none;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    &:focus {
      border: 1px solid
        ${({ $value, $isValid }) =>
          $value ? ($isValid ? 'green' : 'red') : '#1e84d8'};
    }
  }
`;
const SignUpButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue0};
  font-size: 18px;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue0};
  }
`;
const SignInButton = styled.button`
  display: block;
  width: 60px;
  height: 40px;
  margin: -5px auto 0px auto;
  background-color: inherit;
  font-size: 14px;
  text-decoration-line: underline;
  color: #aaa;
  border: none;
  cursor: pointer;
`;
export default function SignUpPage() {
  const navigate = useNavigate();
  const name = useValidatedInput('', /^[\u4e00-\u9fffA-Za-z0-9，。、\- ]/, 15);
  const email = useValidatedInput('', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const password = useValidatedInput('', /^.{6,}$/);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.isValid) {
      alert('請確認名稱填寫正確');
      return;
    }
    if (!email.isValid) {
      alert('請確認信箱填寫正確');
      return;
    }
    if (!password.isValid) {
      alert('請設置六位以上的密碼');
      return;
    }
    try {
      const authID = await registerUserToAuth(email.value, password.value);
      if (!authID) return;
      const isSaveSuccess = await saveUserToFirestore({
        authID,
        name: name.value,
        email: email.value,
      });
      if (!isSaveSuccess) return;
      navigate('/signIn');
    } catch (error) {
      console.error('註冊過程中發生錯誤:', error);
      alert('註冊過程中發生錯誤');
    }
  };

  const handleSignInClick = () => {
    navigate('/signIn');
  };
  return (
    <Wrapper>
      <Logo />
      <SignUpWrapper>
        <Top>
          <Cat image="brown_8" />
          <Cat image="brown_8" />
          <Cat image="brown_8" />
        </Top>
        <Middle>
          <p>Cater town</p>
          <p>Gather around</p>
        </Middle>
        <Bottom>
          <form
            onSubmit={(e) => {
              handleSignUp(e);
            }}
          >
            <InputWrapper $isValid={name.isValid} $value={name.value}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="John"
                value={name.value}
                onChange={name.onChange}
              />
            </InputWrapper>
            <InputWrapper $isValid={email.isValid} $value={email.value}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="chou@gmail.com"
                value={email.value}
                onChange={email.onChange}
              />
            </InputWrapper>
            <InputWrapper $isValid={password.isValid} $value={password.value}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="******"
                value={password.value}
                onChange={password.onChange}
              />
            </InputWrapper>
            <SignUpButton type="submit">Sign up</SignUpButton>
          </form>
          <SignInButton onClick={handleSignInClick}>Sign in</SignInButton>
        </Bottom>
      </SignUpWrapper>
    </Wrapper>
  );
}
