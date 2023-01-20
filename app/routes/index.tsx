import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';

import { PrismaClient } from '@prisma/client';

export async function loader() {
  const value = await db.test.findFirst();

  return { value: value?.name };
}
export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      {/* <Button variant="contained">Hello World</Button> */}
      <h2>{data?.value ? data.value : null}</h2>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
