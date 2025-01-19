import { useState } from "react";
import Footer from "./components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { PersonalSection } from "./components/PersonalSection";
import { Education, Personal } from "./types/resume";
import { EducationSection } from "./components/EducationSection";

export default function App() {
  const [personal, setPersonal] = useState<Personal>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [educations, setEducations] = useState<Education[]>([]);

  return (
    <>
      <main>
        <section id="editor">
          <Accordion type="single" collapsible>
            <div className="flex items-center justify-between gap-x-3 p-4">
              <h2>Personal</h2>
              <PersonalSection personal={personal} setPersonal={setPersonal} />
            </div>
            <AccordionItem value="education">
              <AccordionTrigger className="p-4">Education</AccordionTrigger>
              <AccordionContent>
                <EducationSection
                  educations={educations}
                  setEducations={setEducations}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section id="preview"></section>
      </main>
      <Footer />
    </>
  );
}
