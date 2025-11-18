export default function Blockquote() {
  return (
    <section className="section">
      <div className="container px-12">
        <blockquote className="relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />
        
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-neutral-950 leading-tight mb-4">
            &ldquo;We bring beauty into every space through quality craftsmanship and uncompromising excellence.&rdquo;
          </p>
          <div className="mt-6">
            <cite>
              <span className="block font-serif text-base text-neutral-950">
                John Doe
              </span>
              <span className="block font-serif text-base text-neutral-500 mt-1">
                CEO at Timeless Beauty
              </span>
            </cite>
          </div>
        </blockquote>
      </div>
    </section>
  );
}

