import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

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
              <Input
                name="nomeDoUsuario"
                onChange={(e) => {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
                placeholder="Informe seu nome"
                value={name}
                type="text"
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar  ${name}` }
              </Button>
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
