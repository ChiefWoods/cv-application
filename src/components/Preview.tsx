import {
  Award,
  Education,
  Experience,
  Organization,
  Personal,
  Skill,
} from "@/types/resume";
import { Separator } from "./ui/separator";
import { GeneralDiv } from "./GeneralDiv";
import { Entry } from "./Entry";
import { DateP } from "./DateP";
import { formatMonthYear } from "@/lib/utils";

export function Preview({
  personal,
  educations,
  experiences,
  organizations,
  awards,
  skills,
  headerInfo,
}: {
  personal: Personal;
  educations: Education[];
  experiences: Experience[];
  organizations: Organization[];
  awards: Award[];
  skills: Skill[];
  headerInfo: { icon: JSX.Element; text: string | undefined }[];
}) {
  return (
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
                <div className="flex flex-wrap justify-center gap-4">
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
                  ({ id, school, title, startDate, endDate, description }) => {
                    return (
                      <Entry
                        key={id}
                        header={school}
                        subtitle={title}
                        date={<DateP startDate={startDate} endDate={endDate} />}
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
                  ({ id, title, company, startDate, endDate, description }) => {
                    return (
                      <Entry
                        key={id}
                        header={title}
                        subtitle={company}
                        date={<DateP startDate={startDate} endDate={endDate} />}
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
                  ({ id, name, position, startDate, endDate, description }) => {
                    return (
                      <Entry
                        key={id}
                        header={name}
                        subtitle={position}
                        date={<DateP startDate={startDate} endDate={endDate} />}
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
                {awards.map(({ id, name, organization, date, description }) => {
                  return (
                    <Entry
                      key={id}
                      header={name}
                      subtitle={organization}
                      date={
                        <p className="font-semibold">{formatMonthYear(date)}</p>
                      }
                      description={description}
                    />
                  );
                })}
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
  );
}
