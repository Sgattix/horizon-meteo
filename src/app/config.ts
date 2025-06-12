export const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Forecast",
    children: [
      {
        label: "In my City",
        href: "/forecast/in-my-city",
      },
      {
        label: "Search by City",
        href: "/forecast/search-by-city",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
