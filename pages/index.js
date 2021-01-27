import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('retornou do use state', setName);
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>NFL Quiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>NFL Quiz</h1>
          </Widget.Header>
          <Widget.Content>

            <p>
              Teste seu conhecimento nesse quiz e prove que você sabe tudo
              sobre o maior e melhor esporte de todos os tempos.
              Are you ready?
            </p>
            <form onSubmit={function (e) {
              router.push(`/quiz?name=${name}`);
              e.preventDefault();
            }}
            >
              <input
                onChange={function (e) {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
                placeholder="Diz aí seu nome"
                type="text"
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar
              </button>
            </form>

          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz da Galera</h1>
            <p>Lorem ipsum dolor sit amet.</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/lmcezar" />
    </QuizBackground>
  );
}
