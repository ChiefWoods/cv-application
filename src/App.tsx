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
import { FileUser, PencilRuler } from "lucide-react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Preview } from "./components/Preview";
import { Circle, Path, Rect, StyleSheet, Svg } from "@react-pdf/renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const styles = StyleSheet.create({
  icon: {
    width: 12,
    height: 12,
  },
});

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
      icon: (
        <Svg
          style={styles.icon}
          viewBox="0 0 24 24"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <Path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <Circle cx="12" cy="10" r="3" />
        </Svg>
      ),
      text: personal.address,
    },
    {
      icon: (
        <Svg
          style={styles.icon}
          viewBox="0 0 24 24"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </Svg>
      ),
      text: personal.phone,
    },
    {
      icon: (
        <Svg
          style={styles.icon}
          viewBox="0 0 24 24"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <Rect width="20" height="16" x="2" y="4" rx="2" />
          <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </Svg>
      ),
      text: personal.email,
    },
  ];

  const editor = (
    <section
      id="editor"
      className="sticky left-4 top-4 h-fit rounded-lg border sm:flex-1"
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
  );

  const preview = (
    <Preview
      personal={personal}
      educations={educations}
      experiences={experiences}
      organizations={organizations}
      awards={awards}
      skills={skills}
      headerInfo={headerInfo}
    />
  );

  return (
    <>
      <main className="relative flex flex-1 flex-col gap-4 p-4 sm:flex-row">
        {isDesktop ? (
          <>
            {editor}
            {preview}
          </>
        ) : (
          <Tabs
            defaultValue="editor"
            className="flex h-full flex-1 flex-col gap-y-2"
          >
            <TabsList className="flex w-full">
              <TabsTrigger
                value="editor"
                className="flex flex-1 items-center gap-2"
              >
                <PencilRuler size={16} />
                Editor
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex flex-1 items-center gap-2"
              >
                <FileUser size={16} />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor">{editor}</TabsContent>
            <TabsContent value="preview" className="flex h-full flex-1">
              {preview}
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </>
  );
}
