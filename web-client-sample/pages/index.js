import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';

class Training {
  constructor(title, duration, techStack, instructors) {
    this.title = title;
    this.duration = duration;
    this.techStack = techStack;
    this.instructors = instructors;
  }
}

export default function Home({ training }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {training ? (
            <div>
              <h2 className={styles.title}> {training.title} </h2>
              <p className={styles.description}>Duration: {training.duration}</p>
              <p className={styles.description}>Tech Stack: {training.techStack}</p>
              <p className={styles.description}>Instructors: {training.instructors.join('; ')}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/training`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    const trainingData = {
      title: responseData.title,
      duration: responseData.duration,
      techStack: responseData.techStack,
      instructors: responseData.instructors
    };
    return { props: { training: trainingData } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { training: null } };
  }
}
