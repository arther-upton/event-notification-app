
<h1 align="center">Event Notification App</h1>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Tech

- Next.js 14
- TypeScript
- TailwindCSS
- Supabase (Auth, PostgreSQL)
- Nodemailer

## Features

- Authentication - login/signup
- Create events
- Send automated emails to event participants

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Clone the repo

   ```bash
   git clone https://github.com/arther-upton/event-notification-app.git
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd event-notification-app
   ```

4. Update the following in `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT YOUR SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT YOUR SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. Now run the app using:

   ```bash
   npm run dev
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).
