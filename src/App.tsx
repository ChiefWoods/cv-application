import { useState } from "react";
import Footer from "./components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { PersonalSection } from "./components/PersonalSection";
import {
  Award,
  Education,
  Experience,
  Organization,
  Personal,
  Skill,
} from "./types/resume";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { OrganizationSection } from "./components/OrganizationSection";
import { AwardSection } from "./components/AwardSection";
import { SkillSection } from "./components/SkillSection";

export default function App() {
  const [personal, setPersonal] = useState<Personal>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

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
            <AccordionItem value="experience">
              <AccordionTrigger className="p-4">Experience</AccordionTrigger>
              <AccordionContent>
                <ExperienceSection
                  experiences={experiences}
                  setExperiences={setExperiences}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="organization">
              <AccordionTrigger className="p-4">Organization</AccordionTrigger>
              <AccordionContent>
                <OrganizationSection
                  organizations={organizations}
                  setOrganizations={setOrganizations}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="award">
              <AccordionTrigger className="p-4">Award</AccordionTrigger>
              <AccordionContent>
                <AwardSection awards={awards} setAwards={setAwards} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skill">
              <AccordionTrigger className="p-4">Skill</AccordionTrigger>
              <AccordionContent>
                <SkillSection skills={skills} setSkills={setSkills} />
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
