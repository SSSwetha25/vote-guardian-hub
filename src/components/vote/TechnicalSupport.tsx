
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function TechnicalSupport() {
  const { toast } = useToast();

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-100 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Support</h3>
      <p className="text-gray-600 mb-4">
        Having issues with the blockchain voting process or need help understanding how it works?
        Our blockchain specialists are here to assist you.
      </p>
      <Button variant="outline" onClick={() => toast({
        title: "Support Request Submitted",
        description: "A blockchain specialist will contact you shortly.",
      })} className="bg-white hover:bg-gray-50">
        Contact Support
      </Button>
    </div>
  );
}
