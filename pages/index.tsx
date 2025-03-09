import Link from 'next/link';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type HomeProps = {};

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>
        <Link href={{ pathname: '/search', query: { page: '1' } }}>
          Welcome to the Poke API Search!
        </Link>
      </h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  return {
    props: {},
  };
};

export default Home;