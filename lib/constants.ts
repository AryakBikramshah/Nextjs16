export const events = [
  {
    title: "React Conf 2024",
    image: "/images/event1.png",
    slug: "react-conf-2024",
    location: "San Francisco, CA",
    date: "2024-05-15",
    time: "09:00 AM"
  },
  {
    title: "Next.js Conf 2024",
    image: "/images/event2.png",
    slug: "nextjs-conf-2024",
    location: "Virtual Event",
    date: "2024-06-20",
    time: "10:00 AM"
  },
  {
    title: "AI Innovation Hackathon",
    image: "/images/event3.png",
    slug: "ai-innovation-hackathon",
    location: "Austin, TX",
    date: "2024-07-12",
    time: "06:00 PM"
  },
  {
    title: "JavaScript Developers Meetup",
    image: "/images/event4.png",
    slug: "js-developers-meetup",
    location: "New York, NY",
    date: "2024-04-25",
    time: "07:00 PM"
  },
  {
    title: "DevOps Summit 2024",
    image: "/images/event5.png",
    slug: "devops-summit-2024",
    location: "Seattle, WA",
    date: "2024-08-08",
    time: "09:00 AM"
  },
  {
    title: "Web3 Builder Hackathon",
    image: "/images/event6.png",
    slug: "web3-builder-hackathon",
    location: "Miami, FL",
    date: "2024-09-15",
    time: "12:00 PM"
  }
];

export type Event = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};