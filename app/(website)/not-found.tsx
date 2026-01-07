import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-neutral-50">
      <section className="section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="title-section mb-6">404</h1>
            <p className="text-body mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might
              have been moved or deleted.
            </p>
            <Button asChild size="lg">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

