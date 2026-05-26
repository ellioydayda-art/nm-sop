import type { SOPDoc } from "./meta-ads";

const automaticsalesSalesSOP: SOPDoc = {
  slug: "automaticsales-sales",
  title: "AutomaticSales — Sales Tracking",
  department: "AutomaticSales",
  sections: [
    {
      id: "access-notice",
      title: "Access Notice",
      blocks: [
        {
          type: "callout",
          variant: "warning",
          title: "Restricted — confirmed staff only",
          content:
            "This page is for confirmed, non-probation staff only. If you have not been explicitly cleared by CMC to access sales data, stop here and do not proceed.",
        },
        {
          type: "text",
          content:
            "Sales data is sensitive. Access to this information is limited to protect client trust and maintain data integrity. If you believe you should have access and have not been cleared, speak to CMC directly.",
        },
      ],
    },
    {
      id: "during-webinar",
      title: "During the Webinar — What to Monitor",
      blocks: [
        {
          type: "text",
          content:
            "The project manager (CMC) is responsible for monitoring sales activity during the webinar. The tracking data is captured automatically by AS and our integrations — your job is to keep an eye on the sheets and be ready to act if something looks off.",
        },
        {
          type: "text",
          content:
            "The tracking sheet has two key tabs to watch:",
        },
        {
          type: "bold-text",
          content: "1. Database Tab — Payment Tracking",
        },
        {
          type: "text",
          content:
            "This tab logs every payment in real time. Each row is one transaction. Columns captured include: date and time, name, email, mobile number, payment source, payment status, currency, initial course fee, UTM data, and whether the contact has been tagged and onboarded.",
        },
        {
          type: "image",
          url: "/sop-assets/payment-tracking-sheet.png",
          alt: "Payment tracking sheet showing the Database tab with columns for name, email, source, status, currency, initial course fee, UTM, and onboarding status",
        },
        {
          type: "bold-text",
          content: "2. Checkout Page Viewed Tab",
        },
        {
          type: "text",
          content:
            "This tab automatically logs every contact who clicks on the checkout page link — even if they do not complete a payment. This list is used after the webinar to identify warm leads for follow-up: people who showed enough intent to click checkout but did not buy.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Why this tab matters",
          content:
            "Someone who visited the checkout page is significantly more likely to convert than a general attendee. This list is the priority target for any post-webinar follow-up campaign.",
        },
      ],
    },
    {
      id: "post-webinar",
      title: "Post-Webinar — Importing Attendees",
      blocks: [
        {
          type: "text",
          content:
            "After the webinar ends, the attendee list from Zoom is imported into AS. This enables post-webinar automations — such as follow-up sequences — to run on people who actually attended the session.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Step-by-step process",
          content:
            "For detailed steps on importing attendees, ask CMC. The exact steps may vary depending on the project setup.",
        },
      ],
    },
  ],
};

export default automaticsalesSalesSOP;
