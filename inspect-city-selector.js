const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://multicine.com.bo", { waitUntil: "networkidle" });
  await page.waitForTimeout(5000);

  const stats = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("*"));
    const textMatches = elements
      .filter(
        (el) =>
          el.textContent &&
          /Santa Cruz|Santa|Cochabamba|La Paz|ciudad|city|Ciudad/i.test(
            el.textContent,
          ),
      )
      .map((el) => ({
        tag: el.tagName,
        className: el.className ? el.className.toString() : "",
        id: el.id || "",
        text: el.textContent.trim().replace(/\s+/g, " "),
        outerHTML: el.outerHTML.slice(0, 200),
      }))
      .slice(0, 30);

    const classCandidates = Array.from(
      new Set(
        elements
          .flatMap((el) =>
            el.className ? el.className.toString().split(/\s+/) : [],
          )
          .filter((cls) => /drop|city|ciudad|select|item|menu/i.test(cls)),
      ),
    ).sort();

    const idCandidates = Array.from(
      new Set(
        elements
          .map((el) => el.id)
          .filter((id) => id && /drop|city|ciudad|select|item|menu/i.test(id)),
      ),
    ).sort();

    const tagCandidates = Array.from(
      new Set(
        elements
          .filter(
            (el) =>
              /select|option|button|a|li/i.test(el.tagName) &&
              el.textContent &&
              /Santa|Ciudad|ciudad|city/i.test(el.textContent),
          )
          .map((el) => el.tagName),
      ),
    ).sort();

    return {
      textMatches,
      classCandidates,
      idCandidates,
      tagCandidates,
      title: document.title,
    };
  });

  console.log("title:", stats.title);
  console.log("textMatches:", JSON.stringify(stats.textMatches, null, 2));
  console.log(
    "classCandidates:",
    JSON.stringify(stats.classCandidates, null, 2),
  );
  console.log("idCandidates:", JSON.stringify(stats.idCandidates, null, 2));
  console.log("tagCandidates:", JSON.stringify(stats.tagCandidates, null, 2));

  await browser.close();
})();
