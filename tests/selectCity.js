export async function registerSelectCity(page) {
  await page.addInitScript(() => {
    window.selectCity = async (city) => {
      const dropdown = document.querySelector(
        "body > div.page-wrap-container > div.nav > div > div.bottom-nav_container > div > div > div.locationDropdown.undefined > div.navselectwrap.is-location.is-mobile",
      );
      if (!dropdown) {
        throw new Error("Location dropdown no encontrado");
      }
      dropdown.click();

      await new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
          const openMenu = document.querySelector(".dropdownBody.open");
          if (openMenu) {
            resolve(openMenu);
            return;
          }
          if (Date.now() - start > 3000) {
            reject(new Error("El menú de ubicación no se abrió"));
            return;
          }
          window.requestAnimationFrame(check);
        };
        check();
      });

      await new Promise((resolve) => setTimeout(resolve, 900));

      const items = Array.from(
        document.querySelectorAll(".dropdownItem"),
      ).filter((el) => el.textContent && el.textContent.trim().includes(city));
      const item = items.find((el) => el.offsetParent !== null) || items[0];
      if (!item) {
        throw new Error(`Ciudad no encontrada: ${city}`);
      }
      item.style.transition =
        "background-color 0.2s ease, box-shadow 0.2s ease";
      item.style.backgroundColor = "rgba(255, 235, 59, 0.75)";
      item.style.boxShadow = "0 0 0 4px rgba(255, 235, 59, 0.45)";
      await new Promise((resolve) => setTimeout(resolve, 600));
      item.click();
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return true;
    };

    window.selectCityRefactored = async (city) => {
      const allowedCities = [
        "TODAS LAS UBICACIONES",
        "El Alto",
        "La Paz",
        "Santa Cruz",
      ];
      const trimmedCity = city && city.toString().trim();
      if (!allowedCities.includes(trimmedCity)) {
        throw new Error(
          `Ciudad no permitida: ${city}. Solo se permiten: ${allowedCities.join(", ")}`,
        );
      }

      const dropdown = document.querySelector(
        "body > div.page-wrap-container > div.nav > div > div.bottom-nav_container > div > div > div.locationDropdown.undefined > div.navselectwrap.is-location.is-mobile",
      );
      if (!dropdown) {
        throw new Error("Location dropdown no encontrado");
      }
      dropdown.click();

      await new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
          const openMenu = document.querySelector(".dropdownBody.open");
          if (openMenu) {
            resolve(openMenu);
            return;
          }
          if (Date.now() - start > 3000) {
            reject(new Error("El menú de ubicación no se abrió"));
            return;
          }
          window.requestAnimationFrame(check);
        };
        check();
      });

      await new Promise((resolve) => setTimeout(resolve, 900));

      const dropdownItems = Array.from(
        document.querySelectorAll(".dropdownItem"),
      );
      let item = null;
      if (trimmedCity === "TODAS LAS UBICACIONES") {
        item = dropdownItems.find((el) =>
          /(todas|all|ubicaciones)/i.test(el.textContent || ""),
        );
      } else {
        item = dropdownItems.find(
          (el) => el.textContent && el.textContent.trim() === trimmedCity,
        );
      }

      if (!item) {
        const fallback = document.querySelector(".dropdownBody.open");
        if (!fallback) {
          throw new Error(`Ciudad no encontrada: ${city}`);
        }
        fallback.style.transition =
          "background-color 0.2s ease, box-shadow 0.2s ease";
        fallback.style.backgroundColor = "rgba(255, 235, 59, 0.45)";
        fallback.style.boxShadow = "0 0 0 4px rgba(255, 235, 59, 0.3)";
        await new Promise((resolve) => setTimeout(resolve, 800));
        return true;
      }

      item.style.transition =
        "background-color 0.2s ease, box-shadow 0.2s ease";
      item.style.backgroundColor = "rgba(255, 235, 59, 0.75)";
      item.style.boxShadow = "0 0 0 4px rgba(255, 235, 59, 0.45)";
      await new Promise((resolve) => setTimeout(resolve, 600));
      item.click();
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return true;
    };
  });
}
