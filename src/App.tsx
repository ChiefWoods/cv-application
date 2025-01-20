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
import { getResume } from "./lib/storage";

export default function App() {
  const resume = getResume();
  const [personal, setPersonal] = useState<Personal>(resume.personal);
  const [educations, setEducations] = useState<Education[]>(resume.educations);
  const [experiences, setExperiences] = useState<Experience[]>(
    resume.experiences,
  );
  const [organizations, setOrganizations] = useState<Organization[]>(
    resume.organizations,
  );
  const [awards, setAwards] = useState<Award[]>(resume.awards);
  const [skills, setSkills] = useState<Skill[]>(resume.skills);

  return (
    <>
      <main>
        <section id="editor">
          <Accordion type="single" collapsible>
            <div className="flex items-center justify-between gap-x-3 p-4">
              <p>Personal</p>
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
