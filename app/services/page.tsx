import ServiceHero from "@/components/services/ServiceHero";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceCTA from "@/components/services/ServiceCTA";
import Blockquote from "@/components/Blockquote";
import { Showcase } from "@/components/Showcase";
import Breadcrumb from "@/components/Breadcrumb";

export default function Services() {
  return (
    <div className="bg-neutral-50">
      <div className="container pt-8">
        <Breadcrumb items={[{ label: "Services" }]} />
      </div>
      <ServiceHero />
      <ServiceFeatures />
      <ServiceProcess />
      <Showcase />
      <Blockquote />
      <ServiceCTA />
    </div>
  );
}
