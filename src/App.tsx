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
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { DateP } from "./components/DateP";
import { Entry } from "./components/Entry";
import { GeneralDiv } from "./components/GeneralDiv";
import { formatMonthYear } from "./lib/utils";

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
      <main className="flex flex-col gap-x-4 p-4 md:flex-row">
        <section id="editor" className="h-fit flex-1 rounded-lg border">
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
        <section id="preview" className="h-fit flex-1 border px-4">
          {!personal.name &&
          !educations.length &&
          !experiences.length &&
          !organizations.length &&
          !awards.length &&
          !skills.length ? (
            <p className="p-4 text-center">Start adding name and entries</p>
          ) : (
            <>
              {personal.name && (
                <>
                  <div className="flex flex-col items-center gap-y-2 py-4">
                    <h2 className="text-2xl font-semibold">{personal.name}</h2>
                    <div className="flex gap-4">
                      {headerInfo.map(({ icon, text }) => {
                        return (
                          text && (
                            <div className="flex items-center gap-2" key={text}>
                              {icon}
                              <p>{text}</p>
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>
                  <Separator />
                </>
              )}
              {Boolean(educations.length) && (
                <>
                  <GeneralDiv title="Education">
                    {educations.map(
                      ({
                        id,
                        school,
                        title,
                        startDate,
                        endDate,
                        description,
                      }) => {
                        return (
                          <Entry
                            key={id}
                            header={school}
                            subtitle={title}
                            date={
                              <DateP startDate={startDate} endDate={endDate} />
                            }
                            description={description}
                          />
                        );
                      },
                    )}
                  </GeneralDiv>
                  <Separator />
                </>
              )}
              {Boolean(experiences.length) && (
                <>
                  <GeneralDiv title="Experience">
                    {experiences.map(
                      ({
                        id,
                        title,
                        company,
                        startDate,
                        endDate,
                        description,
                      }) => {
                        return (
                          <Entry
                            key={id}
                            header={title}
                            subtitle={company}
                            date={
                              <DateP startDate={startDate} endDate={endDate} />
                            }
                            description={description}
                          />
                        );
                      },
                    )}
                  </GeneralDiv>
                  <Separator />
                </>
              )}
              {Boolean(organizations.length) && (
                <>
                  <GeneralDiv title="Organizations">
                    {organizations.map(
                      ({
                        id,
                        name,
                        position,
                        startDate,
                        endDate,
                        description,
                      }) => {
                        return (
                          <Entry
                            key={id}
                            header={name}
                            subtitle={position}
                            date={
                              <DateP startDate={startDate} endDate={endDate} />
                            }
                            description={description}
                          />
                        );
                      },
                    )}
                  </GeneralDiv>
                  <Separator />
                </>
              )}
              {Boolean(awards.length) && (
                <>
                  <GeneralDiv title="Awards">
                    {awards.map(
                      ({ id, name, organization, date, description }) => {
                        return (
                          <Entry
                            key={id}
                            header={name}
                            subtitle={organization}
                            date={
                              <p className="font-semibold">
                                {formatMonthYear(date)}
                              </p>
                            }
                            description={description}
                          />
                        );
                      },
                    )}
                  </GeneralDiv>
                  <Separator />
                </>
              )}
              {Boolean(skills.length) && (
                <GeneralDiv title="Skills">
                  <ul className="max-[repeat(5,1fr)] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
                    {skills.map(({ id, name }) => {
                      return (
                        <li key={id} className="font-semibold">
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                </GeneralDiv>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
