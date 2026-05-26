const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = "https://jolt-edit-44752845.figma.site";
const ROUTES = [
  "/",
  "/about",
  "/initiatives",
  "/impact",
  "/events",
  "/news",
  "/resources",
  "/get-involved",
  "/contact",
];

const OUT = path.join(__dirname, "..", "scrape-output");

async function scrape() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const summary = {};

  for (const route of ROUTES) {
    const url = `${BASE}${route === "/" ? "" : route}`;
    console.log("Scraping", url);
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);

    const slug = route === "/" ? "home" : route.slice(1);
    await page.screenshot({
      path: path.join(OUT, `${slug}.png`),
      fullPage: true,
    });

    const data = await page.evaluate(() => {
      const getText = (el) => (el?.innerText || "").trim();
      const links = [...document.querySelectorAll("a")]
        .map((a) => ({
          href: a.getAttribute("href"),
          text: getText(a),
        }))
        .filter((l) => l.text);

      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
        (h) => ({
          tag: h.tagName,
          text: getText(h),
        }),
      );

      const buttons = [...document.querySelectorAll("button")].map((b) =>
        getText(b),
      );

      const imgs = [...document.querySelectorAll("img")].map((img) => ({
        src: img.src,
        alt: img.alt,
      }));

      const nav = document.querySelector("nav");
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");

      const bodyStyles = window.getComputedStyle(document.body);
      const root = document.getElementById("container") || document.body;

      const sections = [...root.querySelectorAll("section, main > div")].map(
        (s, i) => ({
          index: i,
          tag: s.tagName,
          className: s.className?.toString?.() || "",
          text: getText(s).slice(0, 500),
          bg: window.getComputedStyle(s).backgroundColor,
        }),
      );

      return {
        title: document.title,
        bodyBg: bodyStyles.backgroundColor,
        bodyColor: bodyStyles.color,
        fontFamily: bodyStyles.fontFamily,
        links: links.slice(0, 80),
        headings,
        buttons,
        imgs,
        navText: nav ? getText(nav) : null,
        headerText: header ? getText(header) : null,
        footerText: footer ? getText(footer) : null,
        mainText: getText(
          document.querySelector("main") || document.getElementById("container"),
        ),
        html: document.body.innerHTML.slice(0, 150000),
      };
    });

    summary[slug] = {
      url,
      title: data.title,
      headings: data.headings,
      links: data.links,
      buttons: data.buttons,
      imgs: data.imgs,
      navText: data.navText,
      footerText: data.footerText,
      mainText: data.mainText?.slice(0, 8000),
      bodyBg: data.bodyBg,
      bodyColor: data.bodyColor,
      fontFamily: data.fontFamily,
    };

    fs.writeFileSync(
      path.join(OUT, `${slug}.json`),
      JSON.stringify(data, null, 2),
    );
  }

  fs.writeFileSync(
    path.join(OUT, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
  await browser.close();
  console.log("Done. Output in", OUT);
}

scrape().catch((e) => {
  console.error(e);
  process.exit(1);
});
