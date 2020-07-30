import { Microphone } from "../../model/Microphone";
import { GetServerSideProps } from "next";
import { openDB } from "../openDB";
import { MicrophoneDetail } from "./microphone/[id]";
import Link from "next/link";

export interface IndexProps {
  microphones: Microphone[];
}

export default function Index({ microphones }: IndexProps) {
  return (
    <div>
      <Link href="/people">
        <a>People</a>
      </Link>
      <pre>{JSON.stringify(microphones, null, 4)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ctx => {
  const db = await openDB();
  const microphones = await db.all<Microphone[]>('select * from microphone');

  await new Promise(acc => {
    setTimeout(acc, 3000)
  });

  return { props: { microphones } };
}