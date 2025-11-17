import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CTA() {
  return (
    <section className="section">
      <div className="container">
        <Card>
          <CardContent>
            <div className="bg-primary-500 text-neutral-50 text-center p-12">
              <h2 className="title-section text-neutral-50">
                Ready to Start Your Project?
              </h2>
              <p className="text-body text-neutral-50/90">
                Let our experts help you choose the perfect materials for your
                space
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="secondary">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

