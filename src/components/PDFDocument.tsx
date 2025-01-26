import {
  Award,
  Education,
  Experience,
  Organization,
  Personal,
  Skill,
} from "@/types/resume";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { GeneralDiv } from "./GeneralDiv";
import { Entry } from "./Entry";
import { formatMonthYear } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  personal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.75,
  },
  personalInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  personalInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  personalInfoText: {
    fontSize: 12,
  },
  skillList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 8,
  },
  skill: {
    fontSize: 12,
  },
});

export function PDFDocument({
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
    <Document>
      <Page style={styles.page}>
        {personal.name && (
          <View style={styles.personal}>
            <Text style={styles.header}>{personal.name}</Text>
            <View style={styles.personalInfoWrapper}>
              {headerInfo.map(({ icon, text }) => {
                return (
                  text && (
                    <View style={styles.personalInfo} key={text}>
                      {icon}
                      <Text style={styles.personalInfoText}>{text}</Text>
                    </View>
                  )
                );
              })}
            </View>
          </View>
        )}
        {Boolean(educations.length) && (
          <GeneralDiv title="Education">
            {educations.map(
              ({ id, school, title, startDate, endDate, description }) => {
                return (
                  <Entry
                    key={id}
                    header={school}
                    subtitle={title}
                    date={`${formatMonthYear(startDate)} - ${endDate ? formatMonthYear(endDate) : "Present"}`}
                    description={description}
                  />
                );
              },
            )}
          </GeneralDiv>
        )}
        {Boolean(experiences.length) && (
          <GeneralDiv title="Experience">
            {experiences.map(
              ({ id, title, company, startDate, endDate, description }) => {
                return (
                  <Entry
                    key={id}
                    header={title}
                    subtitle={company}
                    date={`${formatMonthYear(startDate)} - ${endDate ? formatMonthYear(endDate) : "Present"}`}
                    description={description}
                  />
                );
              },
            )}
          </GeneralDiv>
        )}
        {Boolean(organizations.length) && (
          <GeneralDiv title="Organizations">
            {organizations.map(
              ({ id, name, position, startDate, endDate, description }) => {
                return (
                  <Entry
                    key={id}
                    header={name}
                    subtitle={position}
                    date={`${formatMonthYear(startDate)} - ${endDate ? formatMonthYear(endDate) : "Present"}`}
                    description={description}
                  />
                );
              },
            )}
          </GeneralDiv>
        )}
        {Boolean(awards.length) && (
          <GeneralDiv title="Awards">
            {awards.map(({ id, name, organization, date, description }) => {
              return (
                <Entry
                  key={id}
                  header={name}
                  subtitle={organization}
                  date={formatMonthYear(date)}
                  description={description}
                />
              );
            })}
          </GeneralDiv>
        )}
        {Boolean(skills.length) && (
          <GeneralDiv title="Skills">
            <View style={styles.skillList}>
              {skills.map(({ id, name }) => {
                return (
                  <Text key={id} style={styles.skill}>
                    {name}
                  </Text>
                );
              })}
            </View>
          </GeneralDiv>
        )}
      </Page>
    </Document>
  );
}
