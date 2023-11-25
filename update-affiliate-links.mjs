import { globby } from "globby";
import { JSDOM } from "jsdom";
import fs from "node:fs/promises";

const files = await globby("./dist/**/*.html");

const domainList = [
  "amzn.to",
  "amazon.com",
  "shareasale.com",
  "www.shareasale.com",
];

const attributes = {
  target: "_blank",
  rel: "nofollow noopener sponsored",
};

const domainMatch = (domain) => domainList.indexOf(domain) > -1;

const setAttributes = (element, attributes) => {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
};

await Promise.all(
  files.map(async (file) => {
    let html = await fs.readFile(file, "utf-8");
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll("a");
    const linksArr = Array.from(links);

    linksArr.forEach(
      (link) => domainMatch(link.host) && setAttributes(link, attributes)
    );

    html = dom.serialize();

    await fs.writeFile(file, html);
    console.log("Updating links:", file);
  })
);
