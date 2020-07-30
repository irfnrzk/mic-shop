import { Microphone } from "../../model/Microphone";
import { GetStaticProps } from "next";
import { openDB } from "../openDB";
import Link from 'next/link'

export interface IndexProps {
  microphones: Microphone[];
}

export default function Index({ microphones }: IndexProps) {
  return (
    <div>
      {microphones.map(mic => {
        return (
          <Link href="/[id]" as={`/${mic.id}`}>
            <a>{mic.brand + mic.model}</a>
          </Link>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone');

  return { props: { microphones } };
}