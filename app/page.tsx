import { CalendarExperience } from "@/components/calendar/calendar-experience";
import { CalendarExperienceMobile } from "@/components/calendar/calendar-experience-mobile";

export default function Page() {
  return (
    <>
      <div className="lg:hidden">
        <CalendarExperienceMobile />
      </div>

      <div className="hidden lg:block">
        <CalendarExperience />
      </div>
    </>
  );
}
