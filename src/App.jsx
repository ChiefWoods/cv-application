import { useEffect, useState } from "react";
import ActionTab from "./components/ActionTab";
import FormSection from "./components/FormSection";
import FormInput from "./components/FormInput";
import FormMonthInput from "./components/FormMonthInput";
import FormTextarea from "./components/FormTextarea";
import CVHeader from "./components/CVHeader";
import CVSection from "./components/CVSection";
import CVSectionEntry from "./components/CVSectionEntry";
import CVSkill from "./components/CVSkill";
import Footer from "./components/Footer";
import uniqid from "uniqid";
import ViewSection from "./components/ViewSection";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [experience, setExperience] = useState([
    {
      id: uniqid(),
      name: "Test name a",
      location: "Test location a",
      role: "Test role a",
      startEndDate: "Jan 2024 - Feb 2024",
      desc: "Test description a",
    },
    {
      id: uniqid(),
      name: "Test name b",
      location: "Test location b",
      role: "Test role b",
      startEndDate: "Mar 2024 - Apr 2024",
      desc: "Test description b",
    },
  ]);
  const [education, setEducation] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [skills, setSkills] = useState([]);
  const [openedViewSection, setOpenedViewSection] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  let preview;
  let ExperienceFormControls;

  function clearFields() {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setLinkedIn("");
    setExperience([]);
    setEducation([]);
    setLeadership([]);
    setSkills([]);
  }

  function downloadCV() {}

  function toggleViewSection(section) {
    setOpenedViewSection((openedSection) =>
      openedSection === section ? null : section,
    );
  }

  function setListEntry(list, setList, id, field, value) {
    setList((list) =>
      list.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  }

  function appendStandardListEntry(setList, id) {
    setList((list) => [
      ...list,
      { id, name: "", location: "", role: "", startEndDate: "", desc: "" },
    ]);
  }

  function StandardFormControls(id, list, setList) {
    const entry = list.find((entry) => entry.id === id);

    if (!entry) return null;

    const { name, location, role, startEndDate, desc } = entry;

    return (
      <>
        <FormInput
          field="Name"
          value={name}
          handleChange={(e) =>
            setListEntry(list, setList, id, "name", e.target.value)
          }
        />
        <FormInput
          field="Location"
          value={location}
          handleChange={(e) =>
            setListEntry(list, setList, id, "location", e.target.value)
          }
        />
        <FormInput
          field="Role"
          value={role}
          handleChange={(e) =>
            setListEntry(list, setList, id, "role", e.target.value)
          }
        />
        <FormMonthInput
          value={startEndDate}
          handleChange={(value) =>
            setListEntry(list, setList, id, "startEndDate", value)
          }
        />
        <FormTextarea
          field="Description"
          value={desc}
          handleChange={(e) =>
            setListEntry(list, setList, id, "desc", e.target.value)
          }
        />
      </>
    );
  }

  useEffect(() => {
    ExperienceFormControls = StandardFormControls(
      currentId,
      experience,
      setExperience,
    );
  }, [currentId]);

  return (
    <>
      <main className="flex min-h-0 w-full flex-1 justify-center gap-8 bg-slate-100 p-10">
        <section className="flex max-w-[550px] flex-1 flex-col gap-8 pr-8">
          <ActionTab clearFields={clearFields} downloadCV={downloadCV} />
          <div className="flex flex-col gap-y-8 overflow-y-auto scrollbar-none">
            <FormSection
              heading="Personal Details"
              path={
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              }
              open={openedViewSection === "personal"}
              setOpen={() => toggleViewSection("personal")}
            >
              <FormInput
                field="Full Name"
                value={name}
                handleChange={(e) => setName(e.target.value)}
              />
              <div className="flex w-full gap-x-4">
                <FormInput
                  field="Email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                  field="Phone"
                  value={phone}
                  handleChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <FormInput
                field="Address"
                value={address}
                handleChange={(e) => setAddress(e.target.value)}
              />
              <FormInput
                field="LinkedIn"
                value={linkedIn}
                handleChange={(e) => setLinkedIn(e.target.value)}
              />
            </FormSection>
            <FormSection
              heading="Experience"
              path={
                <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" />
              }
              open={openedViewSection === "experience"}
              setOpen={() => toggleViewSection("experience")}
            >
              <ViewSection
                FormControls={ExperienceFormControls}
                entries={experience}
                setCurrentId={setCurrentId}
                appendNewEntry={(id) =>
                  appendStandardListEntry(setExperience, id)
                }
              />
            </FormSection>
          </div>
        </section>
        <section
          className="aspect-[1/1.41] max-w-[650px] flex-1 overflow-y-auto bg-white p-12 shadow-2xl scrollbar-none"
          ref={preview}
        >
          <CVHeader
            name={name}
            email={email}
            phone={phone}
            address={address}
            linkedIn={linkedIn}
          />
          <CVSection heading="Experience">
            {experience.map((entry) => (
              <CVSectionEntry key={entry.id} entry={entry} />
            ))}
          </CVSection>
          <CVSection heading="Education">
            {education.map((entry) => (
              <CVSectionEntry key={entry.id} entry={entry} />
            ))}
          </CVSection>
          <CVSection heading="Leadership">
            {leadership.map((entry) => (
              <CVSectionEntry key={entry.id} entry={entry} />
            ))}
          </CVSection>
          <CVSection heading="Skills">
            {Object.entries(skills).map((skill, i) => (
              <CVSkill key={i} skill={skill} />
            ))}
          </CVSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
