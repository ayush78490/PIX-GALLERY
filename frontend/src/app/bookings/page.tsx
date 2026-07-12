import Button from "@/components/Button";
import Container from "@/components/Container";
import Section from "@/components/Section";

export default function BookingsPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
              Inquiry
            </p>
            <h1 className="mt-2 text-4xl">Secure your date</h1>
            <p className="mt-4 max-w-2xl text-sm text-[#444748]">
              Editorial photography tailored to your brand. Select availability and
              share your event details.
            </p>
          </header>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#444748]">
                    Name
                  </label>
                  <input
                    className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#444748]">
                    Email
                  </label>
                  <input
                    className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#444748]">
                    Event type
                  </label>
                  <select className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none">
                    <option>Editorial shoot</option>
                    <option>Commercial campaign</option>
                    <option>Private gallery event</option>
                    <option>Portrait session</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#444748]">
                    Budget range
                  </label>
                  <input
                    className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                    placeholder="$2,500 - $5,000"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">
                  Message
                </label>
                <textarea
                  className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                  rows={4}
                  placeholder="Tell us about your creative vision..."
                />
              </div>
              <Button size="lg" type="submit">
                Request booking
              </Button>
            </form>
            <aside className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg">Availability</h2>
                <span className="text-xs uppercase tracking-widest text-[#747878]">
                  October 2024
                </span>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
                {"S M T W T F S".split(" ").map((day) => (
                  <span key={day} className="text-[#747878]">
                    {day}
                  </span>
                ))}
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    className="rounded-lg py-2 text-[#444748] hover:bg-[#eeeeec]"
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
