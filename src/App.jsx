import { useState } from "react";
import ActionTab from "./components/ActionTab";
import FormSection from "./components/FormSection";
import FormInput from "./components/FormInput";
import FormMonthInput from "./components/FormMonthInput";
import FormTextarea from "./components/FormTextarea";
import CVHeader from "./components/CVHeader";
import CVCore from "./components/CVCore";
import CVCoreItem from "./components/CVCoreItem";
import CVSkill from "./components/CVSkill";
import Footer from "./components/Footer";
import ViewSection from "./components/ViewSection";
import Form from "./components/Form";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [skills, setSkills] = useState([]);
  const [openedViewSection, setOpenedViewSection] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const coreLists = [
    {
      heading: "Experience",
      Path: () => (
        <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" />
      ),
      list: experience,
      setList: setExperience,
    },
    {
      heading: "Education",
      Path: () => (
        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
      ),
      list: education,
      setList: setEducation,
    },
    {
      heading: "Leadership",
      Path: () => (
        <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
      ),
      list: leadership,
      setList: setLeadership,
    },
  ];

  const coreListFormat = {
    name: "",
    location: "",
    role: "",
    startEndDate: "",
    desc: "",
  };

  let preview;

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

    setIsEditing(false);
  }

  function updateList(e, setList) {
    e.preventDefault();

    setList((prev) => {
      const item = prev.find((item) => item.id === formData.id);

      if (item) {
        return prev.map((item) => {
          return item.id === formData.id ? formData : item;
        });
      } else {
        return [...prev, formData];
      }
    });

    setIsEditing(false);
  }

  function deleteItem(setList) {
    setList((prev) => {
      return prev.filter((item) => item.id !== currentId);
    });

    setIsEditing(false);
  }

  function handleCoreInputChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleMonthInputChange(value) {
    setFormData((prev) => ({
      ...prev,
      startEndDate: value,
    }));
  }

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
                controlName="name"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex w-full gap-x-4">
                <FormInput
                  field="Email"
                  value={email}
                  controlName={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                  field="Phone"
                  value={phone}
                  controlName={"phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <FormInput
                field="Address"
                value={address}
                controlName={"address"}
                onChange={(e) => setAddress(e.target.value)}
              />
              <FormInput
                field="LinkedIn"
                value={linkedIn}
                controlName={"linkedIn"}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </FormSection>
            {coreLists.map(({ heading, Path, list, setList }) => (
              <FormSection
                key={heading}
                heading={heading}
                path={<Path />}
                open={openedViewSection === heading}
                setOpen={() => toggleViewSection(heading)}
              >
                <ViewSection
                  entries={list}
                  setCurrentId={setCurrentId}
                  setFormData={setFormData}
                  list={list}
                  listFormat={coreListFormat}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                >
                  <Form
                    onSubmit={(e) => updateList(e, setList)}
                    onDelete={() => deleteItem(setList)}
                    onCancel={() => setIsEditing(false)}
                  >
                    <FormInput
                      field="Name"
                      value={formData.name}
                      controlName={"name"}
                      onChange={handleCoreInputChange}
                      required={true}
                    />
                    <FormInput
                      field="Location"
                      value={formData.location}
                      controlName={"location"}
                      onChange={handleCoreInputChange}
                    />
                    <FormInput
                      field="Role"
                      value={formData.role}
                      controlName={"role"}
                      onChange={handleCoreInputChange}
                    />
                    <FormTextarea
                      field="Description"
                      value={formData.desc}
                      controlName={"desc"}
                      onChange={handleCoreInputChange}
                    />
                    <FormMonthInput
                      value={formData.startEndDate}
                      onChange={handleMonthInputChange}
                    />
                  </Form>
                </ViewSection>
              </FormSection>
            ))}
          </div>
        </section>
        <section
          className="aspect-[1/1.41] max-w-[500px] flex-1 overflow-auto bg-white p-12 shadow-2xl scrollbar-none"
          ref={preview}
        >
          <CVHeader
            name={name}
            email={email}
            phone={phone}
            address={address}
            linkedIn={linkedIn}
          />
          <CVCore heading="Experience">
            {experience.map((entry) => (
              <CVCoreItem key={entry.id} entry={entry} />
            ))}
          </CVCore>
          <CVCore heading="Education">
            {education.map((entry) => (
              <CVCoreItem key={entry.id} entry={entry} />
            ))}
          </CVCore>
          <CVCore heading="Leadership">
            {leadership.map((entry) => (
              <CVCoreItem key={entry.id} entry={entry} />
            ))}
          </CVCore>
          <CVCore heading="Skills">
            {Object.entries(skills).map((skill, i) => (
              <CVSkill key={i} skill={skill} />
            ))}
          </CVCore>
        </section>
      </main>
      <Footer />
    </>
  );
}
