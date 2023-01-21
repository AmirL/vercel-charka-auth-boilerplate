import { Form, useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';

import authenticator, { requireUser } from '~/utils/auth.server';
import type { LoaderArgs } from '@remix-run/node';
import { Button } from '@mui/material';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  return { value: user.email };
}
export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      {/* <Button variant="contained">Hello World</Button> */}
      <h2>{data?.value ? data.value : null}</h2>
      <Form action="/logout" method="post">
        <Button variant="text" type="submit">
          Logout
        </Button>
      </Form>
    </div>
  );
}
