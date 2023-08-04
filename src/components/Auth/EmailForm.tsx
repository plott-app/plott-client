import { motion } from 'framer-motion';
import { FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ActionFunctionArgs, useSubmit } from 'react-router-dom';
import { styled } from 'styled-components';
import useInput, { InputDataType } from '../../hooks/useInput';
import Button from '../UI/button/Button';
import Inform from '../UI/general/Inform';
import InputField from '../UI/input/InputField';
import CodeField, { CodeHandle } from './CodeField';

interface EmailFormProps {
  isLogin: boolean;
}

const EmailFormWrapper = styled(motion.div)`
  margin: 1rem auto;
`;

const ErrorInform = ({ children }: PropsWithChildren) => {
  return (
    <Inform isError={true} isLeft={true}>
      {children}
    </Inform>
  );
};

const EmailForm = ({ isLogin }: EmailFormProps) => {
  const submit = useSubmit();

  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<CodeHandle>(null);

  const [isVerify, setIsVerify] = useState(false);
  const [isRetype, setIsRetype] = useState(false);

  const [{ email, password, passwordVerify }, dataHandler, setData] = useInput({
    email: '',
    password: '',
    passwordVerify: '',
  } as InputDataType);

  useEffect(() => {
    if (isLogin) {
      setIsVerify(false);
    }
  }, [isLogin]);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isLogin, isRetype]);

  const verifyHandler = () => {
    setIsVerify(true);
    setIsRetype(false);
  };

  const retypeHandler = () => {
    setIsRetype(true);
    setData((prev) => {
      return { ...prev, email: '' };
    });
    emailRef.current?.focus();
  };

  const registerHandler = (event: FormEvent) => {
    event.preventDefault();
    const code = codeRef.current?.value() || '';
    // TODO: 서버 측에서 정의된 요청 파라미터에 맞게 수정 필요
    submit(`email=${email}&code=${code}&password=${password}`, { method: 'POST' });
  };

  return (
    <EmailFormWrapper layout className="w-85">
      <motion.form layout className="flex-column gap-sm" onSubmit={registerHandler}>
        <InputField>
          <div className="flex j-between i-center">
            <label>이메일</label>
            {!isLogin && isVerify && (
              <div className="flex">
                <Button
                  styleClass="extra"
                  sizeClass="sm"
                  isFit={true}
                  onClick={retypeHandler}
                >
                  <u>다시 입력</u>
                </Button>
                <Button
                  sizeClass="sm"
                  isFit={true}
                  onClick={verifyHandler}
                  isPending={false}
                  name="intent"
                  value="verify"
                >
                  재전송
                </Button>
              </div>
            )}
          </div>
          <input
            ref={emailRef}
            type="email"
            name="email"
            value={email}
            onChange={dataHandler}
            disabled={isVerify && !isRetype && !isLogin}
          />
          <ErrorInform>올바른 이메일을 입력하세요.</ErrorInform>
        </InputField>
        {!isLogin && !isVerify && (
          <Button onClick={verifyHandler} isPending={false} name="intent" value="verify">
            인증코드 전송
          </Button>
        )}
        {!isLogin && isVerify && <CodeField ref={codeRef} />}
        <ErrorInform>올바른 코드를 입력하세요.</ErrorInform>
        {(isLogin || isVerify) && (
          <>
            <InputField className={isLogin ? '' : 'mt-md'}>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={dataHandler}
              />
              <ErrorInform>비밀번호는 n자 이상의 문자/숫자/?여야 합니다.</ErrorInform>
            </InputField>
            {!isLogin && (
              <InputField>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  name="passwordVerify"
                  value={passwordVerify}
                  onChange={dataHandler}
                />
                <ErrorInform>비밀번호와 일치하지 않습니다.</ErrorInform>
              </InputField>
            )}
            <Button
              type="submit"
              className="mt-md"
              sizeClass="md"
              isPending={false}
              name="intent"
              value={isLogin ? 'login' : 'register'}
            >
              {isLogin ? '로그인하기' : '회원가입하기'}
            </Button>
          </>
        )}
      </motion.form>
    </EmailFormWrapper>
  );
};

export default EmailForm;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const code = formData.get('code');

  // TODO: requestFetch 함수를 활용하여 서버로 인증/회원가입/로그인 요청 보내기
  switch (formData.get('intent')) {
    case 'verify':
      break;
    case 'register':
      break;
    case 'login':
      break;
  }
};
