// Identity and links. Source: docs/CONTENT.md (§1, §7). Do not invent values here.
export const site = {
  name: "Mustafa Şeker",
  domain: "msheker.dev",
  url: "https://msheker.dev",
  email: "hello@msheker.dev", // site only; forwards to the personal inbox (D-008)
  cvEmail: "mustafa652seker@gmail.com", // the CV and its PDF use the personal address, never hello@ (D-008)
  location: "Denizli, Türkiye",
  links: {
    github: "https://github.com/MSheker20",
    linkedin: "https://www.linkedin.com/in/mustafasheker",
  },
} as const;
