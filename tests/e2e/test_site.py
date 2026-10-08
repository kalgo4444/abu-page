"""End-to-end checks for the site. Needs a running server:

    astro dev --background
    .venv/bin/python tests/e2e/test_site.py

BASE_URL overrides the default http://localhost:4321.
"""

import os
import re
import sys
import traceback

from playwright.sync_api import expect, sync_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:4321").rstrip("/")
SHOTS = os.environ.get("SHOTS_DIR", "/tmp/abu-page-e2e")
NAME = "Abdulaziz Abdugafurov"
PAGES = {
    "/": (f"{NAME} · Software engineer", "Full-stack engineer building web, mobile, and AI-powered products."),
    "/about": (f"About · {NAME}", "Who is Abdulaziz?"),
    "/skills": (f"Skills · {NAME}", "Skills"),
    "/stack": (f"Stack · {NAME}", "Stack"),
    "/contact": (f"Contact · {NAME}", "Contact"),
}
LINKS = {
    "GitHub": "https://github.com/kalgo4444",
    "LinkedIn": "https://www.linkedin.com/in/abdulaziz-abdugafurov",
    "Telegram": "https://t.me/abdulaziz_abdugafurov",
    "Email": "mailto:abuxyziabd@gmail.com",
}

TESTS = []


def test(viewport="desktop"):
    def register(fn):
        TESTS.append((fn, viewport))
        return fn

    return register


def path_of(page):
    return page.url.removeprefix(BASE).rstrip("/") or "/"


def open_page(page, path):
    response = page.goto(BASE + path)
    page.wait_for_load_state("networkidle")
    return response


# --- every page -------------------------------------------------------------


@test()
def pages_render_with_title_heading_and_description(page):
    for path, (title, heading) in PAGES.items():
        response = open_page(page, path)
        assert response.status == 200, f"{path}: status {response.status}"
        expect(page).to_have_title(title)
        # The dev toolbar adds headings of its own outside <main>.
        expect(page.locator("main h1")).to_have_text(heading)
        assert page.locator('meta[name="description"]').get_attribute("content"), path
        assert page.locator("html").get_attribute("lang") == "en", path
        page.screenshot(path=f"{SHOTS}/desktop{path.replace('/', '-')}.png", full_page=True)


@test()
def pages_load_the_mono_font(page):
    open_page(page, "/")
    family = page.evaluate("getComputedStyle(document.body).fontFamily")
    assert "JetBrains Mono" in family, family
    assert page.evaluate("document.fonts.ready.then(() => document.fonts.check('16px \"JetBrains Mono\"'))")


@test()
def unknown_path_is_a_404(page):
    response = page.goto(BASE + "/no-such-page")
    assert response.status == 404, response.status


@test()
def projects_redirects_home_while_there_are_none(page):
    open_page(page, "/projects")
    page.wait_for_url(BASE + "/")
    expect(page.locator('a[href="/projects"]')).to_have_count(0)


# --- nav --------------------------------------------------------------------


@test()
def nav_links_navigate_and_mark_the_current_page(page):
    open_page(page, "/")
    bar = page.locator("nav.links")
    expect(bar.locator('[aria-current="page"]')).to_have_count(0)
    for label, path in [("About", "/about"), ("Skills", "/skills"), ("Stack", "/stack")]:
        bar.get_by_role("link", name=label, exact=True).click()
        page.wait_for_url(f"**{path}")
        expect(bar.locator('[aria-current="page"]')).to_have_text(label)
    page.locator("header").get_by_role("link", name="Contact", exact=True).click()
    page.wait_for_url("**/contact")
    expect(page.locator('header a.btn[aria-current="page"]')).to_have_text("Contact")
    page.locator("a.brand").click()
    page.wait_for_url(BASE + "/")


@test()
def desktop_nav_hides_the_menu(page):
    open_page(page, "/")
    expect(page.locator("nav.links")).to_be_visible()
    expect(page.locator("details.menu")).to_be_hidden()


@test("mobile")
def mobile_menu_opens_and_navigates(page):
    open_page(page, "/")
    expect(page.locator("nav.links")).to_be_hidden()
    menu = page.locator("details.menu")
    drawer = page.locator("nav.drawer")
    expect(drawer).to_be_hidden()
    menu.locator("summary").click()
    expect(drawer).to_be_visible()
    page.screenshot(path=f"{SHOTS}/mobile-menu.png")
    menu.locator("summary").click()
    expect(drawer).to_be_hidden()
    menu.locator("summary").click()
    drawer.get_by_role("link", name="Skills").click()
    page.wait_for_url("**/skills")
    expect(page.locator("h1")).to_have_text("Skills")
    expect(page.locator("nav.drawer")).to_be_hidden()


@test("mobile")
def mobile_menu_is_closed_after_going_back(page):
    open_page(page, "/")
    page.locator("details.menu summary").click()
    page.locator("nav.drawer").get_by_role("link", name="About").click()
    page.wait_for_url("**/about")
    page.go_back()
    page.wait_for_url(BASE + "/")
    expect(page.locator("nav.drawer")).to_be_hidden()


@test("mobile")
def mobile_pages_do_not_scroll_sideways(page):
    for path in PAGES:
        open_page(page, path)
        overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        assert overflow <= 0, f"{path}: page is {overflow}px wider than the viewport"
        page.screenshot(path=f"{SHOTS}/mobile{path.replace('/', '-')}.png", full_page=True)


# --- home -------------------------------------------------------------------


@test()
def home_hero_links_to_contact_and_github(page):
    open_page(page, "/")
    hero = page.locator(".hero")
    expect(hero.locator(".intro")).to_have_text(f"{NAME} · Software engineer · Tashkent, Uzbekistan")
    expect(page.locator("main a")).to_have_count(2)
    expect(hero.get_by_role("link", name="GitHub")).to_have_attribute("href", LINKS["GitHub"])
    hero.get_by_role("link", name="Contact me").click()
    page.wait_for_url("**/contact")


# --- content pages ----------------------------------------------------------


@test()
def about_introduces_the_author(page):
    open_page(page, "/about")
    prose = page.locator(".prose")
    expect(prose).to_contain_text(f"I'm {NAME}, a 19-year-old software engineer")
    expect(prose).to_contain_text("Tashkent, Uzbekistan")
    expect(prose).to_contain_text("NestJS with PostgreSQL behind them")


@test()
def skills_lists_every_skill(page):
    open_page(page, "/skills")
    rows = page.locator("li.row")
    expect(rows.locator("strong")).to_have_text(["Front-end UI", "REST API", "Back-end projects", "AI"])
    for index in range(4):
        expect(rows.nth(index).locator(".detail")).not_to_be_empty()


@test()
def stack_lists_every_group(page):
    open_page(page, "/stack")
    expect(page.locator("dl dt")).to_have_text(["Languages", "Front end", "Mobile", "Back end", "Databases"])
    expect(page.locator("dl dd")).to_have_text(
        ["JavaScript, TypeScript", "React, Next.js", "React Native", "NestJS, REST APIs", "PostgreSQL"]
    )


@test()
def contact_lists_every_link(page):
    open_page(page, "/contact")
    rows = page.locator("li.row")
    expect(rows.locator("strong")).to_have_text(list(LINKS))
    for index, href in enumerate(LINKS.values()):
        expect(rows.nth(index).locator("a")).to_have_attribute("href", href)


# --- runner -----------------------------------------------------------------

VIEWPORTS = {"desktop": {"width": 1280, "height": 800}, "mobile": {"width": 375, "height": 740}}


def main():
    os.makedirs(SHOTS, exist_ok=True)
    only = sys.argv[1:]
    ran = failed = 0
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for fn, viewport in TESTS:
            if only and not any(word in fn.__name__ for word in only):
                continue
            ran += 1
            context = browser.new_context(viewport=VIEWPORTS[viewport])
            context.set_default_timeout(5000)
            page = context.new_page()
            problems = []
            page.on("console", lambda m: problems.append(f"console {m.type}: {m.text}") if m.type == "error" else None)
            page.on("pageerror", lambda e: problems.append(f"page error: {e}"))
            page.on("requestfailed", lambda r: problems.append(f"request failed: {r.url}"))
            try:
                fn(page)
                # The 404 test expects its one failed document request.
                if fn is not unknown_path_is_a_404:
                    assert not problems, "; ".join(problems)
                print(f"ok    {fn.__name__} [{viewport}]")
            except Exception:
                failed += 1
                print(f"FAIL  {fn.__name__} [{viewport}]")
                traceback.print_exc()
                page.screenshot(path=f"{SHOTS}/FAIL-{fn.__name__}.png", full_page=True)
            finally:
                context.close()
        browser.close()
    print(f"\n{ran - failed} passed, {failed} failed")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    expect.set_options(timeout=5000)
    main()
