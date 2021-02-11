/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
      {/* <pre style={{ color: '#000' }}>
        {JSON.stringify(dbExterno.questions, null, 4)}
      </pre> */}
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  // console.log('Infos que o Next da para nos', context.query.id);
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      }).then((respostaConversidaEmObjeto) => respostaConversidaEmObjeto);
    // console.log('teste', dbExterno);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
