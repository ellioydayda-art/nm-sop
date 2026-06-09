export interface ShowUpMessageStep {
  id: string;
  step: string;
  title: string;
  timing: string;
  sendAt: string;
  checklist: string[];
  message: string;
  image?: {
    src: string;
    downloadName: string;
    alt: string;
    /** When false, download is hidden (e.g. WhatsApp in-app stickers). Default true. */
    allowDownload?: boolean;
  };
  /** Sticker-only step: no text message, in-app sticker required */
  stickerOnly?: boolean;
  notes?: string[];
}

export const DR_JASMINE_SHOW_UP_MESSAGES: ShowUpMessageStep[] = [
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
      "Fill in Custom Values at the top before copying",
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
      "Fill in Zoom link in Custom Values before copying",
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

See you tomorrow at 8PM（GMT +8）!`,
  },
  {
    id: "starting-soon",
    step: "04",
    title: "Starting Soon",
    timing: "Webinar day",
    sendAt: "11:00 AM (GMT+8)",
    checklist: [
      "Confirm today's date matches the webinar",
      "Fill in session date, time, Zoom link, ID, and passcode in Custom Values",
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
because you may be managing the numbers without fully understanding the
condition underneath.

Tonight, we will walk through:
- why diabetes is more than just a sugar problem
- what may be keeping the body stuck
- what people often miss when they focus only on control
- what needs to be addressed for a long term health direction

This session is meant to help you see your condition more clearly
so you can stop guessing and start making more informed decisions about your
health.

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

Most people with diabetes were taught how to manage the numbers.
Very few were taught how to understand what may actually be driving the condition
underneath.

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
    image: {
      src: "/sop/whatsapp-show-up/05-live-sticker.png",
      downloadName: "dr-jasmine-show-up-05-live-sticker-reference.png",
      alt: "Reference only: find this sticker inside WhatsApp",
      allowDownload: false,
    },
    message: "",
    notes: [
      "NO TEXT for this step. Sticker only.",
      "DO NOT download the image below and upload it as a photo. That is wrong.",
      "DO NOT screenshot and send as image. That is wrong.",
      "You MUST pick the sticker from WhatsApp's in-app sticker panel.",
      "The reference image is only so you know which sticker to tap.",
    ],
  },
];

export const SHOW_UP_SCHEDULE_SUMMARY = `Dr Jasmine WhatsApp Community Show Up Schedule

01 Welcome          → 4 days before @ 3:00 PM
02 2-Day Countdown  → 2 days before @ 3:00 PM
03 1-Day Countdown  → 1 day before  @ 8:00 PM
04 Starting Soon    → Webinar day   @ 11:00 AM
05 LIVE NOW         → Webinar day   @ 7:58 PM
06 Live Sticker     → Webinar day   @ 8:18 PM

Fill in Custom Values at the top of the SOP before copying any message.`;

export interface CombinedScheduleItem {
  day: string;
  time: string;
  type: "show-up" | "value-post";
  label: string;
  note?: string;
  stepId?: string;
}

/** Full community calendar: show-up reminders + where value posts slot in. */
export const COMBINED_COMMUNITY_SCHEDULE: CombinedScheduleItem[] = [
  { day: "4 days before webinar", time: "3:00 PM", type: "show-up", label: "01 Welcome", stepId: "welcome" },
  { day: "3 days before webinar", time: "11:00 AM", type: "value-post", label: "Value Post", note: "1 day after Welcome Post" },
  { day: "2 days before webinar", time: "3:00 PM", type: "show-up", label: "02 2-Day Countdown", stepId: "2day-countdown" },
  { day: "1 day before webinar", time: "11:00 AM", type: "value-post", label: "Value Post", note: "Morning of 1-day before" },
  { day: "1 day before webinar", time: "8:00 PM", type: "show-up", label: "03 1-Day Countdown", stepId: "1day-countdown" },
  { day: "Webinar day", time: "11:00 AM", type: "show-up", label: "04 Starting Soon", stepId: "starting-soon" },
  { day: "Webinar day", time: "7:58 PM", type: "show-up", label: "05 LIVE NOW", stepId: "live-now" },
  { day: "Webinar day", time: "8:18 PM", type: "show-up", label: "06 Sticker", stepId: "live-sticker" },
  { day: "Day after live", time: "11:00 AM", type: "value-post", label: "Value Post", note: "Post-webinar follow-up" },
];

export const VALUE_POST_SLOT_RULES: string[] = [
  "1 day after Welcome Post → 11:00 AM",
  "Morning 11:00 AM on 1-day before webinar",
  "Day after live → 11:00 AM",
  "All other days in the pre-webinar window → alternate days (one value post every other day)",
];

export const VALUE_POST_SOP_SLUG = "whatsapp-community-value-posts";
