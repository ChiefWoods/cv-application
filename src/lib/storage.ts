import { Resume } from "@/types/resume";

const dateKeys = ["startDate", "endDate", "date"];

function deserialize(resume: string): Resume {
  const parsed = JSON.parse(resume) as Resume;

  Object.values(parsed).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((entry: Record<keyof Resume, Resume[keyof Resume]>) => {
        dateKeys.forEach((key) => {
          if (key in entry) {
            // @ts-expect-error - Resume is indexed by string
            entry[key] = new Date(entry[key] as string);
          }
        });
      });
    }
  });

  return parsed;
}

export function getResume() {
  const resume = localStorage.getItem("resume");

  return resume
    ? deserialize(resume)
    : {
        personal: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        educations: [],
        experiences: [],
        organizations: [],
        awards: [],
        skills: [],
      };
}

export function setResume<K extends keyof Resume>(key: K, value: Resume[K]) {
  const resume = getResume();
  resume[key] = value;
  localStorage.setItem("resume", JSON.stringify(resume));
}
