"""Full e2e suite for abu-page (Next.js App Router).

Run via webapp-testing helper (server lifecycle managed for you):
  python .agents/skills/webapp-testing/scripts/with_server.py \
    --server "bun dev --port 3000" --port 3000 -- python e2e/test_app.py

Exits 0 on all-pass, 1 on any failure.
"""

from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"

# Mirror of src/entities/profile/model/profile.ts + src/entities/skill/model/skills.ts
# (hardcoded on purpose: tests catch drift between content and rendering).
PROFILE = {
    "name": "Abdulaziz Abdugafurov",
    "role": "Software Engineer",
    "age": "19",
    "location": "Tashkent, Uzbekistan",
    "tagline": "Full-stack engineer and university student building web, mobile, and AI-powered products.",
    "github": "https://github.com/kalgo4444",
    "linkedin": "https://www.linkedin.com/in/abdulaziz-abdugafurov",
    "telegram": "https://t.me/abdulaziz_abdugafurov",
    "email": "mailto:abuxyziabd@gmail.com",
}
SKILL_GROUPS = [
    ("Languages", ["JavaScript", "TypeScript"]),
    ("Front end", ["React", "Next.js"]),
    ("Mobile", ["React Native"]),
    ("Back end", ["NestJS", "REST APIs"]),
    ("Databases", ["MongoDB", "PostgreSQL"]),
]
CAPABILITIES = ["Front-end UI", "REST API", "Back-end projects", "AI"]
SOCIALS = [
    ("GitHub", PROFILE["github"]),
    ("LinkedIn", PROFILE["linkedin"]),
    ("Telegram", PROFILE["telegram"]),
    ("Email", PROFILE["email"]),
]

passed = 0
failed = 0
failures: list[str] = []


def check(label: str, ok: bool, detail: str = "") -> None:
    global passed, failed
    if ok:
        passed += 1
        print(f"PASS {label}" + (f" ({detail})" if detail else ""))
    else:
        failed += 1
        failures.append(label)
        print(f"FAIL {label}" + (f" ({detail})" if detail else ""))


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})
    page_errors: list[str] = []
    page.on("pageerror", lambda e: page_errors.append(str(e)))

    # --- 1. Route status -------------------------------------------------
    for route in ["/", "/about", "/skills", "/social"]:
        resp = page.goto(BASE + route)
        page.wait_for_load_state("networkidle")
        main = page.locator("main").inner_text() if page.locator("main").count() else ""
        check(
            f"route {route} renders",
            resp is not None and resp.status == 200 and len(main.strip()) > 50,
            f"status={resp.status if resp else 'none'} len={len(main)}",
        )

    # /contact redirects to /social (src/app/contact/page.tsx)
    resp = page.goto(BASE + "/contact")
    page.wait_for_load_state("networkidle")
    check(
        "route /contact redirects to /social",
        page.url.rstrip("/") == f"{BASE}/social",
        f"landed={page.url}",
    )

    # Unknown route is a 404, not a crash
    resp = page.goto(BASE + "/does-not-exist-xyz")
    page.wait_for_load_state("networkidle")
    check(
        "unknown route is 404",
        resp is not None and resp.status == 404,
        f"status={resp.status if resp else 'none'}",
    )

    # --- 2. Home content -------------------------------------------------
    page.goto(BASE + "/")
    page.wait_for_load_state("networkidle")
    body = page.locator("main").inner_text()
    check("home shows name", PROFILE["name"] in body)
    check("home shows role/location/age", all(s in body for s in [PROFILE["role"], PROFILE["location"], "Age 19"]))
    check("home shows tagline", PROFILE["tagline"] in body)
    check("home TUI mockup", "abu@engineer:~ (tui)" in body and "[status: available]" in body)

    # --- 3. About content ------------------------------------------------
    page.goto(BASE + "/about")
    page.wait_for_load_state("networkidle")
    body = page.locator("main").inner_text()
    check("about shows name", PROFILE["name"] in body)
    check("about spec block", "[DEVELOPER SPECIFICATION]" in body)
    check(
        "about spec fields",
        all(s in body for s in [PROFILE["role"], PROFILE["location"], "University student"]),
    )
    check("about shows tagline", PROFILE["tagline"] in body)

    # --- 4. Skills content -----------------------------------------------
    page.goto(BASE + "/skills")
    page.wait_for_load_state("networkidle")
    body = page.locator("main").inner_text()
    for cap in CAPABILITIES:
        check(f"skills capability {cap}", cap in body)
    for title, items in SKILL_GROUPS:
        check(f"skills group {title}", title in body)
        for item in items:
            check(f"skills item {item}", item in body)

    # --- 5. Social content -----------------------------------------------
    page.goto(BASE + "/social")
    page.wait_for_load_state("networkidle")
    body = page.locator("main").inner_text()
    for label, href in SOCIALS:
        check(f"social row {label}", label in body)
        link = page.locator(f'main a[href="{href}"]')
        check(f"social href {label}", link.count() >= 1, f"href={href}")
    ext = page.locator(f'main a[href="{PROFILE["github"]}"]')
    check("social external opens new tab", ext.get_attribute("target") == "_blank")
    check("social external rel", ext.get_attribute("rel") == "noreferrer")
    mail = page.locator(f'main a[href="{PROFILE["email"]}"]')
    check("social email has no target", mail.get_attribute("target") is None)

    # --- 6. Header desktop navigation ------------------------------------
    page.goto(BASE + "/")
    page.wait_for_load_state("networkidle")
    for label in ["Home", "About", "Skills", "Social"]:
        check(f"header nav {label}", page.get_by_role("link", name=label, exact=True).count() >= 1)
    check("header logo ABU", page.get_by_role("link", name="ABU").count() >= 1)
    for label, route in [("About", "/about"), ("Skills", "/skills"), ("Social", "/social"), ("Home", "/")]:
        page.get_by_role("link", name=label, exact=True).first.click()
        page.wait_for_url(f"**{route}" if route != "/" else f"{BASE}/", timeout=10000)
        page.wait_for_load_state("networkidle")
        expected = BASE + route if route != "/" else BASE + "/"
        check(f"nav click {label}", page.url == expected, f"url={page.url}")

    # Contact button points at mailto
    contact = page.locator(f'header a[href="{PROFILE["email"]}"]').first
    check("header contact mailto", contact.count() >= 1)

    # --- 7. Mobile drawer -------------------------------------------------
    mob = browser.new_page(viewport={"width": 390, "height": 844})
    mob.goto(BASE + "/")
    mob.wait_for_load_state("networkidle")
    menu_btn = mob.get_by_role("button", name="Toggle navigation menu")
    check("mobile menu button visible", menu_btn.is_visible())
    menu_btn.click()
    check("mobile drawer opens", mob.get_by_text("[close]", exact=True).count() >= 1)
    mob.locator("header a:visible", has_text="About").first.click()
    mob.wait_for_url("**/about", timeout=10000)
    mob.wait_for_load_state("networkidle")
    check("mobile drawer navigates", mob.url.endswith("/about"), f"url={mob.url}")
    mob.close()

    # --- 8. No JS page errors ---------------------------------------------
    check("no page errors", len(page_errors) == 0, f"errors={page_errors[:2]}")

    browser.close()

print(f"\nRESULT: {passed} passed, {failed} failed")
if failures:
    print("FAILURES:", failures)
exit(1 if failed else 0)
