import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import EventifyLogo from '@/components/EventifyLogo';
import CreateEventForm from '@/components/CreateEventForm';
import nodemailer from 'nodemailer';

export default async function Create() {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const createEvent = async (participants: string[], clientTimestamp: string, formData: FormData) => {
    'use server'

    const title = formData.get('title') as string;
    const venue = formData.get('venue') as string;
    const venueType = formData.get('venueType') as string;
    const link = formData.get('link') as string;
    const description = formData.get('description') as string;
    const dateString = formData.get('date') as string;
    const timeString = formData.get('time') as string;

    // having to do this as timestamp generation code runs on server and does not have the client's time zone
    const eventDate = new Date(clientTimestamp);
    const [eventYear, eventMonth, eventDay] = dateString.split('-');
    const [eventHour, eventMinutes] = timeString.split(':');
    eventDate.setFullYear(parseInt(eventYear), parseInt(eventMonth) - 1, parseInt(eventDay));
    eventDate.setHours(parseInt(eventHour), parseInt(eventMinutes));

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('event')
        .insert({
          user_id: user.id,
          title: title,
          description: (description ? description : null),
          venue: venue,
          remote: (venueType === "remote" ? true : false),
          link: (link ? link : ""),
          date_time: eventDate.toISOString(),
          participants: participants,
        })
        .select();
  
      if (error) {
        console.log(error);
        return redirect('/create?message=Event creation failed');
      }
  
      console.log(data);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: participants.join(', '),
        subject: `Eventify Invitation: ${title}`,
        text: `${user.email} is inviting you to an Eventify event.`,
        html: `<head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Responsive HTML Email With Button</title>
        <style media="all" type="text/css">
              /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
    
          /*All the styling goes here*/
    
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #eaebed;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            min-width: 100%;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #eaebed;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            Margin: 0 auto !important;
            /* makes it centered */
            max-width: 380px;
            padding: 10px;
            width: 380px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            Margin: 0 auto;
            max-width: 380px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .header {
            padding: 20px 0;
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 5px 20px 10px 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            Margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #9a9ea6;
              font-size: 12px;
              text-align: center; 
          }
    
          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h3,
          h4 {
            color: #06090f;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          h2 {
            text-align: center;
            text-transform: capitalize;
            margin-bottom: 25px;
          }
    
          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #EA580C;
            text-decoration: underline; 
          }
    
          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              min-width: auto;
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #EA580C;
              border-radius: 5px;
              box-sizing: border-box;
              color: #EA580C;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          .btn-primary table td {
            background-color: #EA580C; 
          }
    
          .btn-primary a {
            background-color: #EA580C;
            border-color: #EA580C;
            color: #ffffff; 
          }
    
          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            Margin: 20px 0; 
          }
    
          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
              font-size: 16px !important; 
            }
            table[class=body] .wrapper,
            table[class=body] .article {
              padding: 10px !important; 
            }
            table[class=body] .content {
              padding: 0 !important; 
            }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table[class=body] .btn table {
              width: 100% !important; 
            }
            table[class=body] .btn a {
              width: 100% !important; 
            }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            .btn-primary table td:hover {
              background-color: #EA580C !important; 
            }
            .btn-primary a:hover {
              background-color: #da540b !important;
              border-color: #da540b !important; 
            } 
          }
        </style>
      </head>
      <body class="">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="header">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td class="align-center" width="100%">
                      <a href="https://event-notification-app.vercel.app"><img src="https://github.com/arther-upton/event-notification-app/assets/155370738/e9f392b6-eb79-4e7a-8528-f209f9980eb4" height="40" alt="Eventify"></a>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader">Eventify Invite</span>
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h2>${title}</h2>
                            <p>👋&nbsp; You are invited by ${user.email} to ${title}</p>
                            <p>🗺&nbsp; At ${venue} (${venueType})</p>
                            ${link ? `<p>🔗&nbsp; ${link}</p>` : ``}
                            <p>⏲&nbsp; ${eventDate.toString()}</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href="https://event-notification-app.vercel.app/login" target="_blank">Sign Up At Eventify</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
    
                <!-- START FOOTER -->
                <div class="footer">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block">
                        <span class="apple-link">Send out free email notifications to event participants and more</span>
                        <br> Visit <a href="https://event-notification-app.vercel.app">Eventify</a> now.
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by">
                        Powered by <a href="https://nodemailer.com/">Nodemailer</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              <!-- END CENTERED WHITE CONTAINER -->
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>`,
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log(err);
            reject(err);
            return redirect('/create?message=Participant Invites Failed');
          } else {
            console.log(response);
            resolve(response);
          }
        });
      });

      return redirect('/');
    }

    return redirect('/create?message=Event creation failed');
  }

  return (
    <>
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-orange-600 backdrop-blur-xl hover:bg-white/30 flex items-center group text-sm transition-colors duration-300 transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <div className="flex flex-col py-8 px-10 justify-center gap-2 mt-28 bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl shadow-lg backdrop-blur-xl">
        <p className="text-3xl font-bold text-white">
          Create Event
        </p>
        <CreateEventForm createEvent={createEvent} />
      </div>
    </>
  )
}
