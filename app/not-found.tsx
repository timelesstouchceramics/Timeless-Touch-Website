import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-neutral-200">
      <div className="container section">
        <h1 className="title-hero">404</h1>
        <p className="text-body">Oops! Page not found</p>
        <Link href="/" className="text-primary-600">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

