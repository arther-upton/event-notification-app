
<h1 align="center">Event Notification App</h1>

<img width="100%" src="https://github.com/arther-upton/event-notification-app/assets/155370738/e9f392b6-eb79-4e7a-8528-f209f9980eb4">

<h3 align="center">
 Create Events and Invite Participants with Automated Notifications
</h3>


## Tech Stack

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

View the Live WIP Demo at: [event-notification-app.vercel.app](https://event-notification-app.vercel.app/)

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
