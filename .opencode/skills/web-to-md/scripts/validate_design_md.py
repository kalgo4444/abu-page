#!/usr/bin/env python3
"""Lightweight structural validator for generated DESIGN.md files."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REQUIRED_TOP_LEVEL = (
    "name",
    "colors",
    "typography",
    "rounded",
    "spacing",
    "components",
)

REQUIRED_HEADINGS = (
    "Overview",
    "Colors",
    "Typography",
    "Layout",
    "Elevation & Depth",
    "Shapes",
    "Components",
    "Do's and Don'ts",
    "Responsive Behavior",
    "Accessibility",
    "Motion & Interaction",
    "AI Coding Agent Prompt",
)

KEY_RE = re.compile(r"^(?P<indent> *)(?P<key>[A-Za-z0-9][A-Za-z0-9_-]*):(?:\s*(?P<value>.*))?$")
REF_RE = re.compile(r"\{([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+)\}")
HEADING_RE = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)


def split_document(text: str) -> tuple[str, str]:
    if not text.startswith("---\n"):
        raise ValueError("document must start with YAML front matter (`---`)")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("closing YAML front matter delimiter (`---`) not found")
    return text[4:end], text[end + 5 :]


def collect_yaml_paths(frontmatter: str) -> tuple[set[str], dict[str, str], list[str]]:
    paths: set[str] = set()
    top_values: dict[str, str] = {}
    errors: list[str] = []
    stack: list[tuple[int, str]] = []

    for line_number, line in enumerate(frontmatter.splitlines(), start=2):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        match = KEY_RE.match(line)
        if not match:
            continue

        indent = len(match.group("indent"))
        key = match.group("key")
        value = (match.group("value") or "").strip()

        while stack and stack[-1][0] >= indent:
            stack.pop()
        path_parts = [item[1] for item in stack] + [key]
        path = ".".join(path_parts)
        paths.add(path)

        if indent == 0:
            if key in top_values:
                errors.append(f"duplicate top-level YAML key `{key}` at line {line_number}")
            top_values[key] = value

        if value == "":
            stack.append((indent, key))

    return paths, top_values, errors


def validate(path: Path) -> list[str]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")

    try:
        frontmatter, body = split_document(text)
    except ValueError as exc:
        return [str(exc)]

    paths, top_values, yaml_errors = collect_yaml_paths(frontmatter)
    errors.extend(yaml_errors)

    for key in REQUIRED_TOP_LEVEL:
        if key not in top_values:
            errors.append(f"missing top-level YAML key `{key}`")

    description = top_values.get("description")
    if description and not (
        description.startswith(('"', "'", "|", ">"))
        and (description.startswith(("|", ">")) or description[-1:] == description[:1])
    ):
        if ": " in description or " #" in description:
            errors.append(
                "plain YAML `description` contains risky punctuation; quote it or use `description: |`"
            )

    try:
        import yaml  # type: ignore
    except ImportError:
        yaml = None

    if yaml is not None:
        try:
            parsed = yaml.safe_load(frontmatter)
            if not isinstance(parsed, dict):
                errors.append("YAML front matter must parse to a mapping")
        except Exception as exc:  # pragma: no cover - depends on optional PyYAML
            errors.append(f"invalid YAML: {exc}")

    references = sorted(set(REF_RE.findall(frontmatter + "\n" + body)))
    for reference in references:
        if reference not in paths:
            errors.append(f"unresolved token reference `{{{reference}}}`")

    headings = HEADING_RE.findall(body)
    positions: list[int] = []
    for heading in REQUIRED_HEADINGS:
        if heading not in headings:
            errors.append(f"missing required heading `## {heading}`")
        else:
            positions.append(headings.index(heading))
    if positions != sorted(positions):
        errors.append("required `##` headings are out of order")

    placeholder_patterns = (
        r"<[A-Za-z][^>\n]{0,100}>",
        r"\bTODO\b",
        r"\bTBD\b",
    )
    for pattern in placeholder_patterns:
        if re.search(pattern, text, flags=re.IGNORECASE):
            errors.append(f"unresolved placeholder matching `{pattern}`")

    if "inspired" not in body.lower():
        errors.append("missing inspired-analysis disclaimer in Markdown body")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path, help="Path to a generated DESIGN.md")
    args = parser.parse_args()

    if not args.file.is_file():
        print(f"ERROR: file not found: {args.file}", file=sys.stderr)
        return 2

    errors = validate(args.file)
    if errors:
        print(f"FAIL: {args.file}")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"OK: {args.file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
