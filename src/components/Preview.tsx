import {
  Award,
  Education,
  Experience,
  Organization,
  Personal,
  Skill,
} from "@/types/resume";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { PDFDocument } from "./PDFDocument";
import { LoaderCircle } from "lucide-react";

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
  const pdf = (
    <PDFDocument
      personal={personal}
      educations={educations}
      experiences={experiences}
      organizations={organizations}
      awards={awards}
      skills={skills}
      headerInfo={headerInfo}
    />
  );
  const [instance] = usePDF({ document: pdf });
  const isResumeEmpty = !(
    personal.name ||
    educations.length ||
    experiences.length ||
    organizations.length ||
    awards.length ||
    skills.length
  );

  if (isResumeEmpty) return <p className="preview-text">Nothing to display</p>;

  if (instance.loading)
    return (
      <LoaderCircle
        size={32}
        className="m-auto flex-1 animate-spin text-muted-foreground"
      />
    );

  if (instance.error)
    return (
      <p className="preview-text">Something went wrong: {instance.error}</p>
    );

  return <PDFViewer className="w-full flex-1">{pdf}</PDFViewer>;
}
