const https = require("https");
const zlib = require("zlib");
const url = "https://www.multicine.com.bo";
const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "es-BO,es;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip,deflate,br",
    Connection: "keep-alive",
  },
};
https
  .get(url, options, (res) => {
    console.log("statusCode", res.statusCode);
    console.log("content-encoding", res.headers["content-encoding"]);
    let chunks = [];
    res.on("data", (chunk) => chunks.push(chunk));
    res.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const encoding = res.headers["content-encoding"];
      const decode =
        encoding === "br"
          ? zlib.brotliDecompressSync(buffer)
          : encoding === "gzip"
            ? zlib.gunzipSync(buffer)
            : buffer;
      const html = decode.toString("utf8");

      const terms = [
        "cinema_locations",
        "locationKey",
        "location=",
        "locationName",
        "page_location",
        "cinema_location_id",
        "location_name",
        "location_slug",
      ];
      terms.forEach((term) => {
        let idx = html.indexOf(term);
        while (idx !== -1) {
          console.log("TERM:", term);
          console.log(
            html.slice(
              Math.max(0, idx - 300),
              Math.min(html.length, idx + 300),
            ),
          );
          console.log("---");
          idx = html.indexOf(term, idx + term.length);
        }
      });

      const scripts = [
        ...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi),
      ].map((m) => m[1]);
      console.log("script count", scripts.length);
      if (scripts.length > 0) {
        const found = scripts.filter((s) =>
          /cinema_locations|locationKey|location_name|page_location|cinema_location_id|select.*location|w-dropdown|dropdown|location=/i.test(
            s,
          ),
        );
        console.log("script matches count", found.length);
        found.slice(0, 5).forEach((s, i) => {
          console.log(`--- script ${i} ---`);
          console.log(s.slice(0, 2000));
        });
      }
    });
  })
  .on("error", (err) => {
    console.error(err);
  });
