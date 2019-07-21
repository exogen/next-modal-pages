import React from "react";
import Link from "next/link";
import useStackInfo from "../useStackInfo";

// Render nav with additional links for "pushing" and "replacing" modals on the
// stack.
export default function SiteNav() {
  const { thisLevel } = useStackInfo();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/a">
            <a>Page A</a>
          </Link>
          {thisLevel > 0 ? (
            <>
              {" • "}
              <Link
                href={{ pathname: "/a", query: { modal: thisLevel } }}
                as="/a"
              >
                <a>replace</a>
              </Link>
            </>
          ) : null}
          {" • "}
          <Link
            href={{ pathname: "/a", query: { modal: thisLevel + 1 } }}
            as="/a"
          >
            <a>push</a>
          </Link>
        </li>
        <li>
          <Link href="/b">
            <a>Page B</a>
          </Link>
          {thisLevel > 0 ? (
            <>
              {" • "}
              <Link
                href={{ pathname: "/b", query: { modal: thisLevel } }}
                as="/b"
              >
                <a>replace</a>
              </Link>
            </>
          ) : null}
          {" • "}
          <Link
            href={{ pathname: "/b", query: { modal: thisLevel + 1 } }}
            as="/b"
          >
            <a>push</a>
          </Link>
        </li>
        <li>
          <Link href="/c">
            <a>Page C</a>
          </Link>
          {thisLevel > 0 ? (
            <>
              {" • "}
              <Link
                href={{ pathname: "/c", query: { modal: thisLevel } }}
                as="/c"
              >
                <a>replace</a>
              </Link>
            </>
          ) : null}
          {" • "}
          <Link
            href={{ pathname: "/c", query: { modal: thisLevel + 1 } }}
            as="/c"
          >
            <a>push</a>
          </Link>
        </li>
      </ul>
      <p>
        ℹ️ The first link to each page is normal and will navigate the entire
        page.
      </p>
      <p>ℹ️ “Replace” will navigate within the current modal level.</p>
      <p>ℹ️ “Push” will add a modal to the stack.</p>
    </nav>
  );
}
