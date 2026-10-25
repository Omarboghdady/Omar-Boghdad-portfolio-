import { Mail, Phone } from "lucide-react";
import { createElement } from "react";
import type { SVGProps } from "react";

type BrandIconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function GithubIcon({ size = 24, ...props }: BrandIconProps) {
  return createElement(
    "svg",
    { ...props, viewBox: "0 0 24 24", width: size, height: size, fill: "currentColor" },
    createElement("path", {
      d: "M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.52-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.11 2.99.73.8 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z",
    }),
  );
}

function LinkedinIcon({ size = 24, ...props }: BrandIconProps) {
  return createElement(
    "svg",
    { ...props, viewBox: "0 0 24 24", width: size, height: size, fill: "currentColor" },
    createElement("path", {
      d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8ZM7 6.67a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM18.34 13.42c0-2.42-1.29-3.55-3.01-3.55a2.6 2.6 0 0 0-2.34 1.29V10h-2.67v8h2.67v-4.34c0-1.14.22-2.24 1.63-2.24 1.38 0 1.4 1.3 1.4 2.31V18h2.32v-4.58Z",
    }),
  );
}

export const contactLinks = [
  {
    id: "email",
    label: "Email me",
    href: "mailto:boghdadyo350@gmail.com",
    Icon: Mail,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omar-kamal-boghdady-37a456287",
    Icon: LinkedinIcon,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Omarboghdady",
    Icon: GithubIcon,
    external: true,
  },
  {
    id: "phone",
    label: "Call me",
    href: "tel:01064590303",
    Icon: Phone,
  },
];
