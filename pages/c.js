import Link from "next/link";

export default function PageC() {
  return (
    <div>
      <h1>C</h1>
      <ul>
        <li>
          <Link href="/a">
            <a>to A</a>
          </Link>
        </li>
        <li>
          <Link href="/b">
            <a>to B</a>
          </Link>
        </li>
        <li>
          <Link href="/c">
            <a>to C</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
