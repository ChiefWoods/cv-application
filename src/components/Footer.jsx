import github from "../assets/icons/github.svg";

export default function Footer() {
  return (
    <footer className="relative bottom-0 mt-auto grid w-full grid-cols-[1fr_auto_1fr] items-center gap-[10px] bg-[#0D1117] px-[max(12px,3%)] py-[12px]">
      <p className="footer-text col-start-2 col-end-3">{`Copyright @ ${new Date().getFullYear()} ChiefWoods`}</p>
      <a
        href="https://github.com/ChiefWoods/cv-application"
        target="_blank"
        className="footer-text col-start-3 col-end-4 inline-block justify-self-end no-underline"
      >
        <img src={github} alt="GitHub" className="aspect-square h-[25px]" />
      </a>
    </footer>
  );
}
