import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Link from '../src/components/Link';
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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quiz da Galera</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser} / ${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>

          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/lmcezar" />
    </QuizBackground>
  );
}
