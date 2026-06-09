export interface ShowUpMessageStep {
  id: string;
  step: string;
  title: string;
  /** When to send relative to webinar */
  timing: string;
  /** Example clock time */
  sendAt: string;
  /** Things to verify before hitting send */
  checklist: string[];
  /** Fields in the message that must be updated each session */
  variables: string[];
  message: string;
  image?: {
    src: string;
    downloadName: string;
    alt: string;
  };
  notes?: string[];
}

export const WHATSAPP_GREEN = "#25D366";
export const WHATSAPP_GREEN_DARK = "#075E54";

export const DR_JASMINE_SHOW_UP_MESSAGES: ShowUpMessageStep[] = [
  {
    id: "welcome",
    step: "01",
    title: "Welcome",
    timing: "4 days before webinar",
    sendAt: "3:00 PM (GMT+8)",
    checklist: [
      "Confirm which day the webinar goes live (e.g. if webinar is Monday, send this on Thursday)",
      "Double-check the webinar day and date before sending",
    ],
    variables: [],
    image: {
      src: "/sop/whatsapp-show-up/01-welcome.jpeg",
      downloadName: "dr-jasmine-show-up-01-welcome.jpeg",
      alt: "Dr Jasmine workshop welcome community image",
    },
    message: `Hey everyone! 🎉 Welcome to the official group for Dr. Jasmine's Reversing Diabetes Workshop 😇

You're in and this isn't just another group.

Before the upcoming workshop, we'll be dropping:

✅ Important workshop updates
✅ Bonus health and recovery insights
✅ Zoom links before the session

The real transformation starts during the workshop.
But what happens before that matters too.

So stay close and keep an eye on this group.
This could be the beginning of a very different health journey for you. 💚

If you're ready to learn, reset, and take back control,
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
      "Confirm webinar day and date",
      "Update the workshop day, date, and time in the message before sending",
    ],
    variables: [
      "Workshop day (e.g. Tuesday)",
      "Workshop date (e.g. 9/6)",
      "Workshop time (e.g. 8PM GMT+8)",
    ],
    image: {
      src: "/sop/whatsapp-show-up/02-2day-countdown.jpeg",
      downloadName: "dr-jasmine-show-up-02-2day-countdown.jpeg",
      alt: "Dr Jasmine 2-day countdown community image",
    },
    message: `We're just 2 days away. 🤩

Quick question before we begin…

Have you noticed how sometimes your blood sugar level looks a bit better…
but other times, no matter how careful you are, it still goes up and down?

You try to eat better.
You try to be more disciplined.
You try to follow the advice you've been given.

But the readings still fluctuate.
The energy still drops.
And deep down, there's still that worry about where this is heading.

Most people assume diabetes is something you just have to manage forever.
Control the blood sugar.
Take the medication.
Increase insulin if needed.
And hope complications don't come later.

But what if that's not the full picture? 🤯

What if the real issue is that most people were only taught how to manage the numbers…
but never shown how to understand what may actually be driving the condition underneath?

And if you've ever felt frustrated because you've been trying…
yet your diabetes still doesn't feel truly under control,
this workshop will hit very differently for you.

Because this isn't just about temporary blood sugar control.
It's about understanding:

✅ What may actually be keeping your blood sugar level unstable
✅ Why some people end up needing more medication or insulin over time
✅ What may need to be addressed if you want to reduce the risk of long-term complications

When the right root causes are addressed,
the body can finally start responding differently.
And when they're not,
even a lot of effort can still leave you stuck in the same cycle.

Upcoming {{WORKSHOP_DAY}} - {{WORKSHOP_DATE}} @ {{WORKSHOP_TIME}}, Dr. Jasmine will break this down step by step.

Once you start seeing diabetes from a different perspective,
you stop guessing, stop going in circles,
and start understanding what your body may actually need.

Make sure you're there when it starts.
This could be the session that changes how you look at diabetes completely 🔥`,
  },
  {
    id: "1day-countdown",
    step: "03",
    title: "1-Day Countdown",
    timing: "1 day before webinar",
    sendAt: "8:00 PM (GMT+8)",
    checklist: [
      "Confirm webinar is tomorrow",
      "Verify Zoom link is correct before sending",
    ],
    variables: [
      "Zoom link (default: http://drjasminechiew.com/zoom)",
    ],
    image: {
      src: "/sop/whatsapp-show-up/03-1day-countdown.jpeg",
      downloadName: "dr-jasmine-show-up-03-1day-countdown.jpeg",
      alt: "Dr Jasmine 1-day countdown community image",
    },
    message: `⏰ 1 DAY TO GO ⏰

We go live TOMORROW @ 8PM (GMT+8) for Dr. Jasmine's Reversing Diabetes Workshop 🔥

If you've been struggling with blood sugar levels that keep fluctuating…
If you're worried about needing more medication, more insulin, or future complications…
Then you must attend tomorrow's session.

We will be breaking down:

✨ Why blood sugar levels can still stay unstable even when you're trying
✨ What may be happening beneath the surface with diabetes
✨ Why some people slowly head toward more medication, more insulin, and more complications
✨ What needs to be addressed if you want a different outcome

This is not the kind of session you want to "catch later."
Because once you miss the foundation, you'll miss the full picture of what we are trying to show you.

If you've been worried about your readings…
your medication increasing…
or where your health may be heading in the next few years…
Then make sure you show up live tomorrow.

Don't come in halfway.
Don't get distracted.
And don't treat this like just another health talk.

Here's the zoom link:
>> {{ZOOM_LINK}}

(Feel free to invite your friends & family to join along)

Be there live.
Because the more you understand your condition properly,
the better decisions you can make from here. 🙌

See you tomorrow at 8PM (GMT+8)!`,
  },
  {
    id: "starting-soon",
    step: "04",
    title: "Starting Soon",
    timing: "Webinar day",
    sendAt: "11:00 AM (GMT+8)",
    checklist: [
      "Confirm today's date matches the webinar",
      "Update session date in the message",
      "Verify Zoom link, Zoom ID, and passcode are correct",
    ],
    variables: [
      "Session date (e.g. Jun 9, 2026)",
      "Session time (8:00PM – 10:00PM GMT+8)",
      "Zoom link",
      "Zoom ID (e.g. 846 0992 4700)",
      "Zoom passcode (e.g. 8888)",
    ],
    image: {
      src: "/sop/whatsapp-show-up/04-starting-soon.jpeg",
      downloadName: "dr-jasmine-show-up-04-starting-soon.jpeg",
      alt: "Dr Jasmine workshop starting today community image",
    },
    message: `🚨🚨 Workshop Starting Today 🚨🚨

One thing to remember:
Lowering blood sugar is important.
But understanding why it keeps rising in the first place is what matters even more.

That is the part many people never get properly explained.
And that is also why progress can feel frustrating
because you may be managing the numbers without fully understanding the condition underneath.

Tonight, we will walk through:
- why diabetes is more than just a sugar problem
- what may be keeping the body stuck
- what people often miss when they focus only on control
- what needs to be addressed for a long term health direction

This session is meant to help you see your condition more clearly
so you can stop guessing and start making more informed decisions about your health.

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
    step: "04b",
    title: "LIVE NOW",
    timing: "Webinar day",
    sendAt: "7:58 PM (GMT+8)",
    checklist: [
      "Send exactly at 7:58 PM, 2 minutes before session starts",
      "Verify Zoom link is live and working",
    ],
    variables: [
      "Zoom link (default: http://drjasminechiew.com/zoom)",
    ],
    message: `🚨 We are LIVE now!

==> {{ZOOM_LINK}}

Most people with diabetes were taught how to manage the numbers.
Very few were taught how to understand what may actually be driving the condition underneath.

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
    step: "05",
    title: "After Live Start (Sticker)",
    timing: "Webinar day",
    sendAt: "8:18 PM (GMT+8)",
    checklist: [
      "Send the sticker from inside WhatsApp (not as a downloaded file)",
      "Match the sticker shown in the reference image below",
    ],
    variables: [],
    image: {
      src: "/sop/whatsapp-show-up/05-live-sticker.png",
      downloadName: "dr-jasmine-show-up-05-live-sticker-reference.png",
      alt: "Reference for the WhatsApp sticker to send at 8:18 PM",
    },
    message: "",
    notes: [
      "This step is sticker only. Do not paste text.",
      "The sticker cannot be downloaded and reused outside WhatsApp. It lives inside the WhatsApp app.",
      "Use the reference image below to find the correct sticker, then send it at 8:18 PM.",
    ],
  },
];

export const SHOW_UP_SCHEDULE_SUMMARY = `Dr Jasmine WhatsApp Community Show Up Schedule

01 Welcome          → 4 days before @ 3:00 PM
02 2-Day Countdown  → 2 days before @ 3:00 PM
03 1-Day Countdown  → 1 day before  @ 8:00 PM
04 Starting Soon    → Webinar day   @ 11:00 AM
04b LIVE NOW        → Webinar day   @ 7:58 PM
05 Live Sticker     → Webinar day   @ 8:18 PM

Always verify webinar day, date, Zoom link, Zoom ID, and passcode before sending.`;
