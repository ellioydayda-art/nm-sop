import type { CombinedScheduleItem, ShowUpMessageStep } from "@/data/sop/show-up-types";

export const CAE_SHOW_UP_MESSAGES: ShowUpMessageStep[] = [
  {
    id: "welcome",
    step: "01",
    title: "Welcome",
    timing: "4 days before webinar",
    sendAt: "3:00 PM (GMT+8)",
    checklist: [
      "If webinar is Monday, send this on Thursday at 3:00 PM",
      "Confirm the webinar day and date before sending",
    ],
    image: {
      src: "/sop/cae-show-up/01-welcome.png",
      downloadName: "cae-purple-star-show-up-01-welcome.png",
      alt: "Purple Star Astrology Workshop welcome community banner",
    },
    message: `Hey everyone! 👋🏼

Welcome to the official group for the Purple Star Astrology Workshop 😇

You're in! And this isn't just another group.

Over the next few days, we'll be dropping:

✅ Important event updates & reminders
✅ Bonus Purple Star Astrology insights
✅ Zoom links before the workshop
✅ Additional resources to help you get the most out of the session

The real magic starts on:

🗓️ {{SESSION_DATE}}
🕗 {{WORKSHOP_TIME}}

But what happens before that matters just as much.

Because sometimes it's not a lack of effort, experience, or opportunity that's holding people back...

It's simply not seeing the hidden patterns influencing their decisions, timing, and direction.

So stay close. Keep an eye on this group.

We'll make sure you're fully prepared before we go live. 😎

If you're excited...

🔥 Drop a quick reaction below to show you're READY!

Let's do this!`,
  },
  {
    id: "2day-countdown",
    step: "02",
    title: "2-Day Countdown",
    timing: "2 days before webinar",
    sendAt: "3:00 PM (GMT+8)",
    checklist: [
      "If webinar is Monday, send this on Saturday at 3:00 PM",
      "Confirm webinar day and date",
      "Fill in Custom Values at the top before copying",
    ],
    message: `We're just 2 days away. 🤩

Quick question before we begin…

Have you ever felt like you're doing everything "right"…
yet life still doesn't seem to move in the direction you expected?

You put in the effort.
You make careful decisions.
You try to stay patient.

But the timing feels off.
The opportunities don't line up.
And deep down, you wonder if you're missing something important.

Most people look only at what's happening on the surface.

They focus on effort, strategy, or luck.
But Purple Star Astrology looks deeper — at the hidden patterns shaping your path, your timing, and your direction.

And if you've ever felt stuck despite trying hard,
this workshop will hit very differently for you.

Because this isn't just about generic advice.
It's about understanding:

✅ The hidden patterns that may be influencing your decisions and timing
✅ Why some periods feel easier while others feel blocked — no matter how hard you try
✅ What to pay attention to if you want clearer direction in life and work

Upcoming {{WORKSHOP_DAY}} - {{WORKSHOP_DATE}} @ {{WORKSHOP_TIME}}, we'll break this down step by step.

Make sure you're there when it starts.
This could be the session that changes how you see your path completely 🔥`,
  },
  {
    id: "1day-countdown",
    step: "03",
    title: "1-Day Countdown",
    timing: "1 day before webinar",
    sendAt: "8:00 PM (GMT+8)",
    checklist: [
      "If webinar is Monday, send this on Sunday at 8:00 PM",
      "Confirm webinar is tomorrow",
      "Fill in Zoom link in Custom Values before copying",
    ],
    message: `⏰ 1 DAY TO GO ⏰

We go live TOMORROW @ {{WORKSHOP_TIME}} for the Purple Star Astrology Workshop 🔥

If you've been wondering why certain seasons of life feel harder than others…
If you've been trying to make better decisions but still feel unsure about timing and direction…
Then you must attend tomorrow's session.

We will be breaking down:

✨ The hidden patterns that may be shaping your path right now
✨ Why timing matters as much as effort
✨ What people often miss when they only look at surface-level results
✨ What to pay attention to if you want clearer direction going forward

This is not the kind of session you want to "catch later."
Because once you miss the foundation, you'll miss the full picture of what we are trying to show you.

Here's the zoom link:
>> {{ZOOM_LINK}}

(Feel free to invite your friends & family to join along)

Be there live.
Because the more you understand your patterns properly,
the better decisions you can make from here. 🙌

See you tomorrow at {{WORKSHOP_TIME}}!`,
  },
  {
    id: "starting-soon",
    step: "04",
    title: "Starting Soon",
    timing: "Webinar day",
    sendAt: "11:00 AM (GMT+8)",
    checklist: [
      "Send on webinar morning (e.g. Monday 11:00 AM if live is Monday evening)",
      "Fill in session date, time, Zoom link, ID, and passcode in Custom Values",
    ],
    message: `🚨🚨 Workshop Starting Today 🚨🚨

One thing to remember:
Effort matters.
But understanding the hidden patterns behind your timing and direction matters even more.

That is the part many people never get properly explained.

And that is also why progress can feel frustrating —
because you may be pushing forward without fully seeing what is influencing the path underneath.

Tonight, we will walk through:

- why Purple Star Astrology looks beyond surface outcomes
- what may be shaping your timing and direction right now
- what people often miss when they focus only on effort or luck
- what to pay attention to for clearer decisions ahead

This session is meant to help you see your path more clearly
so you can stop guessing and start making more informed choices.

If that is something you've been needing,
be there live tonight.

🗓 {{SESSION_DATE}}
🕗 {{SESSION_TIME}}
📍 Online

Zoom Link: {{ZOOM_LINK}}
Zoom ID: {{ZOOM_ID}}
Zoom Passcode: {{ZOOM_PASSCODE}}

Remember to invite your friends & family along.
See you tonight.`,
  },
  {
    id: "live-now",
    step: "05",
    title: "LIVE NOW",
    timing: "Webinar day",
    sendAt: "7:58 PM (GMT+8)",
    checklist: [
      "Send exactly at 7:58 PM, 2 minutes before session starts",
      "Fill in Zoom link in Custom Values before copying",
    ],
    message: `🚨 We are LIVE now!

==> {{ZOOM_LINK}}

Most people only look at what is happening on the surface.
Very few were taught how to read the hidden patterns shaping their timing and direction underneath.

That is what we are breaking down right now.
Once you see it, your entire perspective can change.

Join now:

👉 {{ZOOM_LINK}}`,
    notes: [
      "No image for this message. Text only.",
    ],
  },
  {
    id: "live-sticker",
    step: "06",
    title: "After Live Start (Sticker)",
    timing: "Webinar day",
    sendAt: "8:18 PM (GMT+8)",
    stickerOnly: true,
    checklist: [
      "Open WhatsApp Community on your phone",
      "Tap the sticker icon inside the chat (NOT attach image from gallery)",
      "Find and send the sticker that matches the reference below",
      "Send at exactly 8:18 PM (GMT+8)",
    ],
    message: "",
    notes: [
      "NO TEXT for this step. Sticker only.",
      "DO NOT download the image below and upload it as a photo. That is wrong.",
      "DO NOT screenshot and send as image. That is wrong.",
      "You MUST pick the sticker from WhatsApp's in-app sticker panel.",
      "Sticker reference image to be added — ask your PM which sticker to use.",
    ],
  },
];

export const CAE_SHOW_UP_SCHEDULE_SUMMARY = `CAE WhatsApp Community Show Up Schedule
(Purple Star Astrology Workshop — example: webinar on Monday)

01 Welcome          → 4 days before @ 3:00 PM  (Thu if Mon live)
02 2-Day Countdown  → 2 days before @ 3:00 PM  (Sat if Mon live)
03 1-Day Countdown  → 1 day before  @ 8:00 PM  (Sun if Mon live)
04 Starting Soon    → Webinar day   @ 11:00 AM
05 LIVE NOW         → Webinar day   @ 7:58 PM
06 Live Sticker     → Webinar day   @ 8:18 PM

Fill in Custom Values at the top of the SOP before copying any message.`;

export const CAE_COMBINED_SCHEDULE: CombinedScheduleItem[] = [
  { day: "4 days before webinar", time: "3:00 PM", type: "show-up", label: "01 Welcome", stepId: "welcome" },
  { day: "2 days before webinar", time: "3:00 PM", type: "show-up", label: "02 2-Day Countdown", stepId: "2day-countdown" },
  { day: "1 day before webinar", time: "8:00 PM", type: "show-up", label: "03 1-Day Countdown", stepId: "1day-countdown" },
  { day: "Webinar day", time: "11:00 AM", type: "show-up", label: "04 Starting Soon", stepId: "starting-soon" },
  { day: "Webinar day", time: "7:58 PM", type: "show-up", label: "05 LIVE NOW", stepId: "live-now" },
  { day: "Webinar day", time: "8:18 PM", type: "show-up", label: "06 Sticker", stepId: "live-sticker" },
];
