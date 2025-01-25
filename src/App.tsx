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
import { FileUser, Mail, MapPin, Phone } from "lucide-react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Button } from "./components/ui/button";
import { Preview } from "./components/Preview";

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
  const isDesktop = useMediaQuery();

  const headerInfo = [
    {
      icon: <MapPin className="header-info-icon" />,
      text: personal.address,
    },
    {
      icon: <Phone className="header-info-icon" />,
      text: personal.phone,
    },
    {
      icon: <Mail className="header-info-icon" />,
      text: personal.email,
    },
  ];

  return (
    <>
      <main className="relative flex flex-col gap-4 p-4 sm:flex-row">
        {!isDesktop && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-auto">
                <FileUser />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-screen max-w-none overflow-scroll">
              <Preview
                personal={personal}
                educations={educations}
                experiences={experiences}
                organizations={organizations}
                awards={awards}
                skills={skills}
                headerInfo={headerInfo}
              />
            </SheetContent>
          </Sheet>
        )}
        <section
          id="editor"
          className="sticky left-4 top-4 h-fit flex-1 rounded-lg border"
        >
          <Accordion type="single" collapsible>
            <div className="flex items-center justify-between gap-x-3 border-b p-4">
              <p className="accordion-title">Personal</p>
              <PersonalSection personal={personal} setPersonal={setPersonal} />
            </div>
            <AccordionItem value="education">
              <AccordionTrigger className="accordion-title p-4">
                Education
              </AccordionTrigger>
              <AccordionContent>
                <EducationSection
                  educations={educations}
                  setEducations={setEducations}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="experience">
              <AccordionTrigger className="accordion-title p-4">
                Experience
              </AccordionTrigger>
              <AccordionContent>
                <ExperienceSection
                  experiences={experiences}
                  setExperiences={setExperiences}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="organization">
              <AccordionTrigger className="accordion-title p-4">
                Organization
              </AccordionTrigger>
              <AccordionContent>
                <OrganizationSection
                  organizations={organizations}
                  setOrganizations={setOrganizations}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="award">
              <AccordionTrigger className="accordion-title p-4">
                Award
              </AccordionTrigger>
              <AccordionContent>
                <AwardSection awards={awards} setAwards={setAwards} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skill">
              <AccordionTrigger className="accordion-title p-4">
                Skill
              </AccordionTrigger>
              <AccordionContent>
                <SkillSection skills={skills} setSkills={setSkills} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        {isDesktop && (
          <Preview
            personal={personal}
            educations={educations}
            experiences={experiences}
            organizations={organizations}
            awards={awards}
            skills={skills}
            headerInfo={headerInfo}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
